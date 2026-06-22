import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long.")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Retrieve client IP address from Vercel/Nginx proxy headers
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Rate-limiting check: Count submissions from the same IP in the last 1 hour
    let isRateLimited = false;
    try {
      const sql = getDb();
      if (sql) {
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);

        const results = await sql`
          SELECT COUNT(*)::int as count 
          FROM contact_messages 
          WHERE ip_address = ${ip} 
          AND created_at > ${oneHourAgo.toISOString()}
        `;
        
        const count = results[0]?.count || 0;
        if (count >= 5) {
          isRateLimited = true;
        }
      }
    } catch (dbErr) {
      console.warn("Database connection failed during rate limit check:", dbErr);
    }

    if (isRateLimited) {
      return NextResponse.json(
        { success: false, error: "Too many submission attempts. Please try again in 1 hour." },
        { status: 429 }
      );
    }

    // Try to insert contact message into Neon Database
    let dbSuccess = false;
    try {
      const sql = getDb();
      if (sql) {
        await sql`
          INSERT INTO contact_messages (name, email, message, ip_address, status)
          VALUES (${name}, ${email}, ${message}, ${ip}, 'unread')
        `;
        dbSuccess = true;
      }
    } catch (dbErr) {
      console.error("Database connection failed during message insertion:", dbErr);
    }

    // Route email alert via Resend (only if configured)
    let emailSuccess = false;
    if (process.env.RESEND_API_KEY && process.env.CONTACT_RECIPIENT_EMAIL) {
      try {
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: process.env.CONTACT_RECIPIENT_EMAIL,
          subject: `Portfolio message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSender IP: ${ip}`
        });
        emailSuccess = true;
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }
    }

    // Return success if message was recorded in database, sent via email, or logged in fallback
    if (dbSuccess || emailSuccess) {
      return NextResponse.json({ success: true, message: "Inquiry sent successfully." });
    }

    // Fallback: log to Vercel/console logs to prevent breaking the experience for recruiters
    console.warn("Fallback log: Contact submission received via console fallback:", { name, email, message, ip });
    return NextResponse.json({ 
      success: true, 
      message: "Message received. (Logged in console fallback due to disabled database)." 
    });
  } catch (err) {
    console.error("Contact API handler error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
