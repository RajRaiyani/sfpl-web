import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import env from "@/config/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone_number, message, form_type } = body;

    const isEnquiry = form_type === "enquiry";

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (isEnquiry && !phone_number) {
      return NextResponse.json(
        { error: "Phone number is required for enquiries" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: Number(env.smtp.port),
      secure: Number(env.smtp.port) === 465, // true for 465, false for other ports
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });

    // Email content
    const subject = isEnquiry
      ? `New Enquiry For SFPL connect`
      : `New Contact Form Submission from ${name}`;

    const formHeading = isEnquiry
      ? "New Enquiry Form Submission"
      : "New Contact Form Submission";

    const formTypeLine = isEnquiry ? "This is enquiry." : "This is contact form.";

    const formFooterLine = isEnquiry
      ? "This email was sent from the SFPL website enquiry form."
      : "This email was sent from the SFPL website contact form.";

    const mailOptions = {
      from: env.smtp.user,
      to: env.env === "dev" ? env.developerEmail : env.primarySalesEmail,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            ${formHeading}
          </h2>
          <div style="margin-top: 10px;">
            <p style="color: #666; margin: 0 0 10px 0;"><strong>${formTypeLine}</strong></p>
          </div>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone_number ? `<p><strong>Phone Number:</strong> ${phone_number}</p>` : ""}
            <p><strong>Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>${formFooterLine}</p>
          </div>
        </div>
      `,
      text: `
        ${formHeading}
        
        Name: ${name}
        Email: ${email}
        ${phone_number ? `Phone Number: ${phone_number}` : ""}
        
        ${formTypeLine}
        
        Message:
        ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

