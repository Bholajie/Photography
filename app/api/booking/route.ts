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
      time,
      locationType,
      location, 
      address,
      additionalOptions, 
      additionalInfo 
    } = formData;

    // Format the date
    const formattedDate = date ? format(new Date(date), 'MMMM d, yyyy') : 'Not specified';
    const formattedTime = time ? format(new Date(`2000-01-01T${time}`), 'h:mm a') : 'Not specified';

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

    // Get package label
    const packageLabels = {
      portrait: "Portrait Session",
      "family-portrait": "Family/Group Portrait",
      "fashion-collection": "Fashion Collection Shoot",
      convocation: "Convocation Session",
      "event-quarter": "Quarter Day Event",
      "event-half": "Half Day Event",
      "event-full": "Full Day Event",
      "event-video-basic": "Basic Photo + Video",
      "event-video-classic": "Classic Photo + Video",
      "event-video-deluxe": "Deluxe Photo + Video",
      wedding: "Wedding Photography",
      "training-full": "6 Weeks Full Photography Training",
      "training-intensive": "4 Weeks Intensive Training",
      "training-editing": "2-Day Editing Masterclass",
      "training-lighting": "2-Day Lighting Masterclass"
    };

    const isWedding = packageId === "wedding";
    const subject = isWedding 
      ? `New Wedding Photography Consultation Request from ${name}`
      : `New Booking Request from ${name}`;

    const { data, error } = await resend.emails.send({
      from: 'Sheyilor Photography <onboarding@resend.dev>',
      to: 'sheyilorphotography@gmail.com',
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${isWedding ? 'New Wedding Consultation Request' : 'New Booking Request'}</title>
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
              .important {
                color: #dc2626;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${isWedding ? 'New Wedding Consultation Request' : 'New Booking Request'}</h1>
            </div>
            
            <div class="content">
              <div class="section">
                <h2 style="margin-top: 0; color: #1a1a1a;">Client Information</h2>
                <p><span class="label">Name:</span> <span class="highlight">${name}</span></p>
                <p><span class="label">Email:</span> <span class="highlight">${email}</span></p>
                <p><span class="label">Phone:</span> <span class="highlight">${phone}</span></p>
              </div>

              <div class="section">
                <h2 style="margin-top: 0; color: #1a1a1a;">${isWedding ? 'Wedding Consultation Details' : 'Booking Details'}</h2>
                <p><span class="label">Package:</span> <span class="highlight">${packageLabels[packageId as keyof typeof packageLabels] || packageId}</span></p>
                ${!isWedding ? `
                  <p><span class="label">Date:</span> <span class="highlight">${formattedDate}</span></p>
                  <p><span class="label">Time:</span> <span class="highlight">${formattedTime}</span></p>
                ` : ''}
                ${locationType ? `<p><span class="label">Location Type:</span> <span class="highlight">${locationTypeLabels[locationType as keyof typeof locationTypeLabels] || locationType}</span></p>` : ''}
                ${location ? `<p><span class="label">Location:</span> <span class="highlight">${locationLabels[location as keyof typeof locationLabels] || location}</span></p>` : ''}
                ${address ? `
                  <p><span class="label">Exact Address:</span></p>
                  <p style="margin-left: 20px; font-style: italic;">${address}</p>
                ` : ''}
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
                ${isWedding ? 
                  '<p class="important">Please schedule a consultation call with our lead photographer within 24 hours.</p>' :
                  '<p>Please respond to this request within 24 hours.</p>'
                }
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      throw error;
    }

    // Send confirmation email to client
    const clientEmail = await resend.emails.send({
      from: 'Sheyilor Photography <onboarding@resend.dev>',
      to: email,
      subject: isWedding ? 'Wedding Photography Consultation Request Received' : 'Booking Request Received',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${isWedding ? 'Wedding Consultation Request Confirmation' : 'Booking Request Confirmation'}</title>
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
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                color: #666;
                font-size: 0.9em;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${isWedding ? 'Wedding Consultation Request Received' : 'Booking Request Received'}</h1>
            </div>
            
            <div class="content">
              <p>Dear ${name},</p>
              
              ${isWedding ? 
                `<p>Thank you for your interest in our wedding photography services! We're excited to help document your special day.</p>
                <p>Our lead photographer will contact you within 24 hours to schedule a consultation call where we can discuss your wedding photography needs in detail.</p>
                <p>During the consultation, we'll cover:</p>
                <ul>
                  <li>Your wedding timeline and key moments</li>
                  <li>Photography style preferences</li>
                  <li>Package options and customization</li>
                  <li>Location details and logistics</li>
                  <li>Any specific requirements or concerns</li>
                </ul>` :
                `<p>Thank you for choosing Sheyilor Photography! We've received your booking request for ${packageLabels[packageId as keyof typeof packageLabels] || packageId}.</p>
                <p>Your session is scheduled for ${formattedDate} at ${formattedTime}.</p>
                <p>We'll review your request and get back to you within 24 hours to confirm your booking and discuss the next steps.</p>`
              }
              
              <div class="footer">
                <p>Best regards,</p>
                <p>The Sheyilor Photography Team</p>
                <p>Phone: +234 XXX XXX XXXX</p>
                <p>Email: sheyilorphotography@gmail.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (clientEmail.error) {
      console.error('Error sending client confirmation email:', clientEmail.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
} 