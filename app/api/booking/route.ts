import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { 
      name, 
      email, 
      phone, 
      packageId, 
      date,
      locationType,
      location, 
      additionalOptions, 
      additionalInfo 
    } = formData;

    // Format the date
    const formattedDate = date ? format(new Date(date), 'MMMM d, yyyy') : 'Not specified';

    // Get location type label
    const locationTypeLabels = {
      studio: "Studio Session",
      outdoor: "Outdoor Session",
      home: "Home Service Studio Setup"
    };

    // Get location label
    const locationLabels = {
      mainland: "Mainland",
      "ikoyi-lekki": "Ikoyi/Lekki",
      "lekki2-ajah": "Lekki 2/Ajah",
      "vi-ikoyi": "VI/Ikoyi",
      "lekki-lekki2": "Lekki/Lekki 2"
    };

    const { data, error } = await resend.emails.send({
      from: 'Sheyilor Photography <onboarding@resend.dev>',
      to: 'sheyilorphotography@gmail.com',
      subject: `New Booking Request from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Booking Request</title>
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
              <h1>New Booking Request</h1>
            </div>
            
            <div class="content">
              <div class="section">
                <h2 style="margin-top: 0; color: #1a1a1a;">Client Information</h2>
                <p><span class="label">Name:</span> <span class="highlight">${name}</span></p>
                <p><span class="label">Email:</span> <span class="highlight">${email}</span></p>
                <p><span class="label">Phone:</span> <span class="highlight">${phone}</span></p>
              </div>

              <div class="section">
                <h2 style="margin-top: 0; color: #1a1a1a;">Booking Details</h2>
                <p><span class="label">Package:</span> <span class="highlight">${packageId}</span></p>
                <p><span class="label">Date:</span> <span class="highlight">${formattedDate}</span></p>
                ${locationType ? `<p><span class="label">Location Type:</span> <span class="highlight">${locationTypeLabels[locationType as keyof typeof locationTypeLabels] || locationType}</span></p>` : ''}
                ${location ? `<p><span class="label">Location:</span> <span class="highlight">${locationLabels[location as keyof typeof locationLabels] || location}</span></p>` : ''}
                ${additionalOptions?.length ? `
                  <p><span class="label">Additional Options:</span></p>
                  <ul style="margin-top: 5px; margin-left: 20px;">
                    ${additionalOptions.map((option: string) => `<li>${option}</li>`).join('')}
                  </ul>
                ` : ''}
                ${additionalInfo ? `
                  <p><span class="label">Additional Info:</span></p>
                  <p style="margin-left: 20px; font-style: italic;">${additionalInfo}</p>
                ` : ''}
              </div>

              <div class="footer">
                <p>This is an automated message from Sheyilor Photography's booking system.</p>
                <p>Please respond to this request within 24 hours.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
} 