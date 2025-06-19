import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { format } from 'date-fns';
import { getPackages } from '@/lib/packages';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const packages = await getPackages();
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
      additionalInfo,
      numberOfOutfits,
      couponCode,
      discountPercentage
    } = formData;

    // Calculate total price
    const selectedPackage = packages.find(p => p.id === packageId);
    const basePrice = selectedPackage ? selectedPackage.price * numberOfOutfits : 0;
    
    const getLogisticsFee = (location: string) => {
      switch (location) {
        case "mainland": return 25000;
        case "ikoyi-lekki": return 35000;
        case "lekki2-ajah": return 40000;
        default: return 0;
      }
    };

    const getHomeServiceFee = (location: string) => {
      switch (location) {
        case "mainland": return 55000;
        case "vi-ikoyi": return 85000;
        case "lekki-lekki2": return 105000;
        default: return 0;
      }
    };

    const getAdditionalOptionPrice = (option: string): { label: string; price: number } => {
      if (option.includes("express")) return { label: "Express Service", price: 20000 }
      if (option.includes("extra-selections")) return { label: "Extra Selections", price: 10000 }
      if (option.includes("photobook-30")) return { label: "Photobook 30 pages", price: 150000 }
      if (option.includes("photobook-40")) return { label: "Photobook 40 pages", price: 180000 }
      if (option.includes("frame")) return { label: "Large Frame", price: 35000 }
      if (option.includes("flash-drive")) return { label: "Extra Flash Drive", price: 10000 }
      if (option.includes("drone")) return { label: "Drone Coverage", price: 100000 }
      return { label: option, price: 0 }
    }

    const calculateAdditionalOptionsCost = (options: string[]) => {
      return options.map(option => getAdditionalOptionPrice(option))
    }

    const additionalOptionsDetails = calculateAdditionalOptionsCost(additionalOptions || [])
    const additionalCost = additionalOptionsDetails.reduce((sum, option) => sum + option.price, 0)

    const locationFee = locationType === "outdoor" 
      ? getLogisticsFee(location)
      : locationType === "home"
      ? getHomeServiceFee(location)
      : 0;
    
    const subtotal = basePrice + locationFee + additionalCost;
    const discountAmount = discountPercentage ? (subtotal * discountPercentage) / 100 : 0;
    const totalPrice = subtotal - discountAmount;

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
                <div class="section">
                  <h3>Booking Details</h3>
                  <p><span class="label">Package:</span> ${packageLabels[packageId as keyof typeof packageLabels] || packageId}</p>
                  <p><span class="label">Date:</span> ${formattedDate}</p>
                  <p><span class="label">Time:</span> ${formattedTime}</p>
                  ${numberOfOutfits ? `<p><span class="label">Number of Outfits:</span> ${numberOfOutfits}</p>` : ''}
                  <p><span class="label">Location Type:</span> ${locationTypeLabels[locationType as keyof typeof locationTypeLabels] || locationType}</p>
                  ${location ? `<p><span class="label">Location:</span> ${locationLabels[location as keyof typeof locationLabels] || location}</p>` : ''}
                  ${address ? `<p><span class="label">Address:</span> ${address}</p>` : ''}
                </div>

                <div class="section">
                  <h3>Price Breakdown</h3>
                  <p><span class="label">Base Price:</span> ₦${basePrice.toLocaleString()}</p>
                  ${locationFee > 0 ? `<p><span class="label">${locationType === "outdoor" ? "Logistics Fee" : "Home Service Fee"}:</span> ₦${locationFee.toLocaleString()}</p>` : ''}
                  ${additionalOptionsDetails.length > 0 ? `
                    <p><span class="label">Additional Options:</span></p>
                    <div style="margin-left: 20px;">
                      ${additionalOptionsDetails.map(option => `
                        <p>${option.label}: ₦${option.price.toLocaleString()}</p>
                      `).join('')}
                    </div>
                  ` : ''}
                  <p><span class="label">Subtotal:</span> ₦${subtotal.toLocaleString()}</p>
                  ${discountPercentage ? `
                    <p><span class="label" style="color: #059669;">Discount (${discountPercentage}%):</span> <span style="color: #059669; font-weight: bold;">-₦${discountAmount.toLocaleString()}</span></p>
                    <p><span class="label" style="color: #059669;">Coupon Code:</span> <span style="color: #059669; font-weight: bold;">${couponCode}</span></p>
                  ` : ''}
                  <p><span class="label highlight">Total Cost:</span> ₦${totalPrice.toLocaleString()}</p>
                </div>
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
      from: 'Sheyilor Photography <bookings@sheyilorphotography.com>',
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
              .discount {
                background-color: #f0fdf4;
                border: 1px solid #bbf7d0;
                border-radius: 6px;
                padding: 15px;
                margin: 20px 0;
              }
              .discount h3 {
                color: #059669;
                margin-top: 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${isWedding ? 'Wedding Consultation Request Received' : 'Booking Request Received'}</h1>
            </div>
            
            <div class="content">
              <p>Dear ${name},</p>
              
              ${discountPercentage ? `
                <div class="discount">
                  <h3>🎉 Discount Applied!</h3>
                  <p>Great news! Your coupon code <strong>${couponCode}</strong> has been applied successfully.</p>
                  <p>You've saved <strong>₦${discountAmount.toLocaleString()}</strong> (${discountPercentage}% off) on your booking!</p>
                  <p><strong>Final Total: ₦${totalPrice.toLocaleString()}</strong></p>
                </div>
              ` : ''}
              
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