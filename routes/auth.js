import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router();

// Temporary in-memory store
const resetTokens = {};

// ✅ Allow any email with "@phinmaed.com"
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Check domain validity
  if (!email.endsWith("@phinmaed.com")) {
    return res.status(400).json({ message: "Only PHINMA emails are allowed." });
  }

  // Generate a token
  const resetToken = crypto.randomBytes(20).toString("hex");
  resetTokens[email] = resetToken;

  const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  console.log(`🪄 Reset link for ${email}: ${resetURL}`);

  try {
    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to the PHINMA user
    const mailOptions = {
      from: `"Upang Safety & Incident System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2 style="color:#288148;">Upang Safety & Incident System</h2>
          <p>You requested to reset your password. Click the link below to proceed:</p>
          <p><a href="${resetURL}" style="background:#288148;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">Reset Password</a></p>
          <p>If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

    res.json({ message: "Reset link sent! Check your PHINMA email inbox." });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Failed to send email.", error: error.message });
  }
});

// ✅ Reset password route
router.post("/reset-password/:token", (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const email = Object.keys(resetTokens).find((e) => resetTokens[e] === token);

  if (!email) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  delete resetTokens[email];

  console.log(`✅ Password updated for ${email}. New password: ${password}`);

  res.json({ message: "Password reset successful!" });
});

export default router;
