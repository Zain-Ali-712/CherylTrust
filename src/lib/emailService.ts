import nodemailer from "nodemailer";

// Use Ethereal Email or just log to server console if SMTP is not provided
type EmailType =
    | "membership_added"
    | "membership_cancelled"
    | "client_added"
    | "client_cancelled"
    | "booking_created"
    | "booking_cancelled"
    | "booking_moved"
    | "gift_card"
    | "review_request"
    | "admin_alert";

interface EmailParams {
    to: string;
    type: EmailType;
    subject: string;
    variables: Record<string, string>;
}

export const sendTemplatedEmail = async ({ to, type, subject, variables }: EmailParams) => {
    // Validate credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error("[EmailService] Missing EMAIL_USER or EMAIL_PASSWORD environment variables");
        throw new Error("Email configuration missing");
    }

    // Important: Encode the password properly for special characters
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    console.log(`[EmailService] Attempting auth for: ${emailUser}`);

    // Initialize transporter with proper auth mechanism
    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    // Verify connection before sending
    try {
        await transporter.verify();
        console.log("[EmailService] SMTP connection verified successfully");
    } catch (verifyError) {
        console.error("[EmailService] SMTP verification failed:", verifyError);
        // Don't throw here, try sending anyway
        console.log("[EmailService] Continuing to try sending despite verification failure...");
    }

    // Generate HTML based on email type (same as before)
    let html = `
        <div style="font-family: sans-serif; color: #1c2b36; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 20px;">
            <h1 style="font-family: serif; color: #121e28; border-bottom: 2px solid #cfd0bb; padding-bottom: 10px;">${subject}</h1>
    `;

    if (type === "booking_created") {
        html += `
            <p>Hi ${variables.firstName},</p>
            <p>Thank you for booking a visit to the <strong>Canine Adventure Park</strong>!</p>
            <p>Your session is confirmed for: <strong>${variables.date}</strong></p>
            
            <div style="background-color: #fcfaf8; border: 1px solid #cfd0bb; padding: 25px; border-radius: 15px; margin: 25px 0; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #1c2b3680; font-weight: bold;">Security Entry Code</p>
                <h2 style="margin: 0; font-size: 38px; color: #1c2b36; letter-spacing: 8px; font-family: monospace;">${variables.gateCode}</h2>
                <p style="margin: 15px 0 0 0; font-size: 13px; color: #1c2b3660; line-height: 1.5;">This 4-digit code is for your booking only. Please take it with you to unlock the second gate and access the park.</p>
            </div>

            <div style="margin: 25px 0; padding: 20px; border-radius: 15px; border: 1px solid #eee; background-color: #fff;">
                <h3 style="margin-top: 0; font-size: 16px; color: #121e28;">Essential Checklist</h3>
                <ul style="padding-left: 20px; color: #1c2b36; font-size: 14px; line-height: 1.8;">
                    <li><strong>Read Guidelines:</strong> Ensure you are familiar with the Canine Adventure Park Experience and Guidelines.</li>
                    <li><strong>Set an Alarm:</strong> You have booked for 40-45 minutes of park time. Set an alarm on your phone to keep strictly to the timetable.</li>
                    <li><strong>Rubbish:</strong> Remember to remove all rubbish and poo bags from the site.</li>
                    <li><strong>Secure the Gate:</strong> Ensure the gate is securely padlocked as you leave.</li>
                </ul>
            </div>

            <h3 style="color: #121e28; font-size: 16px;">How to Find Us</h3>
            <p style="font-size: 14px; line-height: 1.6; color: #1c2b36;">Our residential home is <strong>566 Coast Road, Wainuiomata, Wellington</strong>. The park is 200 metres further south (up the road) on the <strong>right-hand side</strong>. Look for the "Canine Adventure Park" sign at the gate.</p>
            
            <div style="text-align: center; margin: 20px 0;">
                <a href="https://www.google.com/maps/search/?api=1&query=Canine+Adventure+Park+Wainuiomata" style="display: inline-block; padding: 10px 20px; background-color: #121e28; color: #fff; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">Google Maps Location</a>
            </div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; font-size: 13px; color: #1c2b3680;">
                <p><strong>Rescheduling:</strong> If you need to reschedule, this can be completed with no charges up to <strong>2 hours</strong> prior to your session via your dashboard.</p>
                <p>Enjoy your visit! We'd love to see any fun photos of your adventures on our Facebook page.</p>
                <p style="margin-top: 20px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
            </div>
        `;
    } else if (type === "membership_added") {
        html += `
            <p>Hi ${variables.firstName},</p>
            <p>Welcome to the <strong>Canine Country Club</strong>! We are so happy to have you as part of our community.</p>
            <p>This membership now gives you access to the Canine Adventure Park and lots of fun adventures for you and your dog.</p>
            
            <div style="background-color: #fcfaf8; border: 1px solid #cfd0bb; padding: 20px; border-radius: 15px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #121e28;">Getting Started</h3>
                <p>Booking for the facilities is easy on our website: <a href="https://cheryltrust.com/adventure-park#book-now" style="color: #cfd0bb; font-weight: bold;">Book Here</a></p>
                <p><strong>Note:</strong> When you make a booking, you will receive a confirmation email containing a unique 4-digit padlock code. You will need this code to unlock the gate and access the Adventure Park.</p>
            </div>

            <h3 style="color: #121e28;">How to Find Us</h3>
            <p>Our facility site address is 200 metres south of our property entrance.</p>
            <p>Our residential home is at <strong>566 Coast Road, Wainuiomata, Wellington</strong>. Keep driving south past our entrance and you will see the signage on the right-hand side, marked <strong>"Canine Adventure Park"</strong>.</p>
            
            <div style="text-align: center; margin: 25px 0;">
                <a href="https://www.google.com/maps/search/?api=1&query=Canine+Adventure+Park+Wainuiomata" style="display: inline-block; padding: 12px 24px; background-color: #121e28; color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px;">View Location Map</a>
            </div>

            <p>We hope you enjoy visiting the facilities at the Canine Adventure Park and being part of the Canine Country Club.</p>
            
            <p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
        `;
    } else if (type === "gift_card") {
        html += `
            <p>Hi ${variables.firstName},</p>
            <p>We are excited to share some joy with you! We would like to <strong>gift you a free visit</strong> to our Canine Adventure Park.</p>
            <p>Please use this to enjoy our facilities and have a safe, private, and fun experience with your dog/s.</p>
            
            <div style="background-color: #fcfaf8; border: 1px solid #cfd0bb; padding: 25px; border-radius: 15px; margin: 25px 0; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #1c2b3680; font-weight: bold;">Gift Card Benefit</p>
                <h2 style="margin: 0; font-size: 24px; color: #121e28;">1 x Free Adventure Park Session</h2>
                <p style="margin: 15px 0 20px 0; font-size: 14px; color: #1c2b36; font-family: serif; italic;">Expires in 6 months</p>
                
                <a href="https://cheryltrust.com/adventure-park" style="display: inline-block; padding: 12px 24px; background-color: #121e28; color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px;">Redeem & Book Now</a>
            </div>

            <div style="margin: 25px 0; padding: 20px; border-radius: 15px; border: 1px solid #eee; background-color: #fff; font-size: 13px; color: #1c2b3680;">
                <p style="margin-top: 0;"><strong>Terms & Conditions:</strong></p>
                <ul style="padding-left: 20px; line-height: 1.6;">
                    <li>This gift is non-refundable and non-transferable to another person or dog.</li>
                    <li>It is for your personal use only.</li>
                    <li>It must be redeemed via our website within 6 months of this email date.</li>
                </ul>
            </div>

            <p>Enjoy, and if you have any fun photos of your adventures we would love to see them on our Facebook page @caninecountryclub!</p>
            
            <p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
        `;
    } else if (type === "membership_cancelled") {
        html += `
            <p>Hi ${variables.firstName},</p>
            <p>We're sorry to see you go. Your <strong>${variables.type}</strong> membership has been cancelled as requested.</p>
            <p>If you change your mind or have any feedback, please don't hesitate to reach out to us.</p>
            <p>You're always welcome to rejoin the Canine Country Club in the future.</p>
            <p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
        `;
    } else if (type === "client_added") {
        html += `
            <p>Hi ${variables.firstName} ${variables.lastName},</p>
            <p>Welcome to Cheryl Trust! We're delighted to have you as part of our community.</p>
            <p>You can now book sessions at the Canine Adventure Park and enjoy all the benefits of being a member.</p>
            <p>Visit our website to get started with your first booking!</p>
            <p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
        `;
    } else if (type === "client_cancelled") {
        html += `
            <p>Hi ${variables.firstName} ${variables.lastName},</p>
            <p>Your account has been cancelled as requested.</p>
            <p>All future bookings have been cancelled. If you have any questions or concerns, please contact us.</p>
            <p>We hope to welcome you back in the future!</p>
            <p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
        `;
    } else if (type === "booking_cancelled") {
        html += `
            <p>Hi ${variables.firstName},</p>
            <p>Your booking for <strong>${variables.date}</strong> has been cancelled.</p>
            <p>If you need to reschedule, please book a new session through our website.</p>
            <p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
        `;
    } else if (type === "booking_moved") {
        html += `
            <p>Hi ${variables.firstName},</p>
            <p>Your booking has been rescheduled from <strong>${variables.oldDate}</strong> to <strong>${variables.newDate}</strong>.</p>
            <p>If this wasn't requested by you, please contact us immediately.</p>
            <p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
        `;
    } else if (type === "review_request") {
        html += `
            <p>Hi ${variables.firstName},</p>
            <p>Thank you for visiting the Canine Adventure Park! We'd love to hear about your experience.</p>
            <p>Please take a moment to leave us a review and share your feedback.</p>
            <div style="text-align: center; margin: 25px 0;">
                <a href="${variables.reviewLink}" style="display: inline-block; padding: 12px 24px; background-color: #121e28; color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px;">Leave a Review</a>
            </div>
            <p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>
        `;
    } else if (type === "admin_alert") {
        html += `
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 15px; border: 1px solid #dee2e6;">
                <h2 style="color: #121e28; margin-top: 0;">Admin Alert: ${variables.action}</h2>
                <p style="font-size: 16px; line-height: 1.6;">${variables.message}</p>
                <hr style="border: 0; border-top: 1px solid #dee2e6; margin: 20px 0;" />
                <p style="font-size: 12px; color: #6c757d;">This is an automated notification from the Cheryl Trust system.</p>
            </div>
        `;
    } else {

        // Fallback for other email types
        for (const [key, value] of Object.entries(variables)) {
            html += `<p style="margin-bottom: 8px;"><strong>${key}:</strong> ${value}</p>`;
        }
        html += `<p style="margin-top: 30px;">Warmest Regards,<br /><strong>Cheryl and Craig</strong></p>`;
    }

    html += `
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                <p>Cheryl Trust & Canine Adventure Park</p>
                <p>Private & Secure Dog Enrichment</p>
            </div>
        </div>
    `;

    const mailOptions = {
        from: `"Cheryl Trust App" <${emailUser}>`,
        to,
        subject,
        html,
    };

    console.log(`[EmailService] Attempting to send ${type} to ${to}`);
    console.log(`[EmailService] EMAIL_USER present: ${!!emailUser}`);
    console.log(`[EmailService] NODE_ENV: ${process.env.NODE_ENV}`);

    if (process.env.NODE_ENV !== "production" && !emailUser) {
        console.log(`[Email Mock] Sending ${type} to ${to}:`, variables);
        return true;
    } else {
        try {
            console.log(`[EmailService] Using transporter to send mail...`);
            const info = await transporter.sendMail(mailOptions);
            console.log("[EmailService] Message sent: %s", info.messageId);
            return true;
        } catch (error) {
            console.error("[EmailService] Error sending email:", error);
            // Don't throw - just log the error so booking can still complete
            console.log("[EmailService] Email failed but continuing with booking...");
            return false;
        }
    }
};