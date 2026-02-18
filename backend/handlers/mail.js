const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        // Create transporter with Gmail SMTP
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        // Send email
        await transport.sendMail({
            from: `"ShopNest" <${process.env.EMAIL}>`,
            to: email,
            subject: subject || "ShopNest Notification",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #333;">ShopNest</h2>
                    <p>${message || "Thank you for shopping with us!"}</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;" />
                    <p style="color: #666; font-size: 12px;">
                        This is an automated message from ShopNest. Please do not reply.
                    </p>
                </div>
            `
        });

        res.json(["Success", "Email sent successfully"]);
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json(["Error", "Failed to send email"]);
    }
};

module.exports = sendMail;
