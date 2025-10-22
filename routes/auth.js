const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../model/Usermodel.js");

const router = express.Router();
const resetTokens = {}; // temporary store

// === FORGOT PASSWORD ===
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not registered." });

    const token = crypto.randomBytes(32).toString("hex");
    resetTokens[token] = { email, expires: Date.now() + 2 * 60 * 1000 };

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Green PHINMA-themed email design
    const mailOptions = {
      from: `"PHINMA Report System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your PHINMA account password",
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); overflow: hidden;">
            
            <div style="background-color: #16a34a; color: #ffffff; text-align: center; padding: 20px;">
              <h1 style="margin: 0; font-size: 22px;">PHINMA Safety & Report System</h1>
            </div>
            
            <div style="padding: 30px 40px; color: #333;">
              <p style="font-size: 16px; margin-bottom: 10px;">Hello, <strong>${user.name}</strong></p>
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                We received a request to reset your PHINMA account password.
                Click the button below to create a new one:
              </p>

              <div style="text-align: center; margin-bottom: 30px;">
                <a href="${resetLink}" 
                  style="display: inline-block; background-color: #16a34a; color: #fff; padding: 12px 28px; border-radius: 8px;
                         font-weight: 600; text-decoration: none; box-shadow: 0 3px 8px rgba(22,163,74,0.3);">
                  Reset Password
                </a>
              </div>

              <p style="font-size: 14px; color: #555;">
                This link will expire in <b>2 minutes</b>. If you didn’t request this reset, you can safely ignore this email.
              </p>
            </div>

            <div style="background-color: #f3f4f6; text-align: center; padding: 15px; color: #888; font-size: 12px;">
              © ${new Date().getFullYear()} PHINMA University | Safety & Report System
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent: ${info.response}`); // log the Gmail response

    res.json({ message: "Reset link sent! Check your PHINMA email inbox." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// === RESET PASSWORD ===
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    const data = resetTokens[token];

    if (!data || Date.now() > data.expires) {
      return res.status(400).json({ message: "Reset link expired or invalid." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email: data.email }, { password: hashedPassword });
    delete resetTokens[token];

    res.json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
