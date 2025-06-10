import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// This would connect to MongoDB in a real implementation
// The schema below is just for validation

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = result.data;
    
    const { data, error } = await resend.emails.send({
      from: 'Sheyilor Photography <onboarding@resend.dev>',
      to: 'sheyilorphotography@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #1a1a1a;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background-color: #ffffff;
                padding: 30px;
                border: 1px solid #e0e0e0;
                border-radius: 0 0 8px 8px;
              }
              .section {
                margin-bottom: 20px;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 6px;
              }
              .label {
                font-weight: bold;
                color: #1a1a1a;
                display: inline-block;
                width: 150px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                color: #666;
                font-size: 0.9em;
              }
              .highlight {
                color: #1a1a1a;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            
            <div class="content">
              <div class="section">
                <h2 style="margin-top: 0; color: #1a1a1a;">Contact Information</h2>
                <p><span class="label">Name:</span> <span class="highlight">${name}</span></p>
                <p><span class="label">Email:</span> <span class="highlight">${email}</span></p>
                ${phone ? `<p><span class="label">Phone:</span> <span class="highlight">${phone}</span></p>` : ''}
              </div>

              <div class="section">
                <h2 style="margin-top: 0; color: #1a1a1a;">Message Details</h2>
                <p><span class="label">Subject:</span> <span class="highlight">${subject}</span></p>
                <p><span class="label">Message:</span></p>
                <p style="margin-left: 20px; font-style: italic;">${message}</p>
              </div>

              <div class="footer">
                <p>This is an automated message from Sheyilor Photography's contact form.</p>
                <p>Please respond to this inquiry within 24 hours.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      throw error;
    }
    
    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process contact submission' },
      { status: 500 }
    );
  }
}