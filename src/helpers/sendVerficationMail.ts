import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (to: string, token: string) => {
  const verificationLink = `http://localhost:3300/api/users/verify?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Verify Your Email",
    html: `<p>Please click the link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;

