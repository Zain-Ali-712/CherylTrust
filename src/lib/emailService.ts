import nodemailer from "nodemailer";

// Use Ethereal Email or just log to server console if SMTP is not provided
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    auth: {
        user: process.env.SMTP_USER || "test_user",
        pass: process.env.SMTP_PASS || "test_pass",
    },
});

type EmailType = 
  | "membership_added"
  | "membership_cancelled"
  | "client_added"
  | "client_cancelled"
  | "booking_created"
  | "booking_cancelled"
  | "booking_moved"
  | "review_request";

interface EmailParams {
    to: string;
    type: EmailType;
    subject: string;
    variables: Record<string, string>;
}

export const sendTemplatedEmail = async ({ to, type, subject, variables }: EmailParams) => {
    // Generate HTML based on email type
    let html = `<div><h1>${subject}</h1>`;
    
    // Add variables nicely formatted
    for (const [key, value] of Object.entries(variables)) {
        html += `<p><strong>${key}:</strong> ${value}</p>`;
    }
    html += `</div>`;

    const mailOptions = {
        from: process.env.EMAIL_FROM || '"Cheryl Trust App" <no-reply@cheryltrust.com>',
        to,
        subject,
        html,
    };

    if (process.env.NODE_ENV !== "production") {
        console.log(`[Email Mock] Sending ${type} to ${to}:`, variables);
        // Returning true instead of trying to send without real credentials
        return true; 
    } else {
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
            return true;
        } catch (error) {
            console.error("Error sending email:", error);
            return false;
        }
    }
};
