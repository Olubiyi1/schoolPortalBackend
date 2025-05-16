import emailTransporter from "../helpers/emailTransporter"

export const sendVerificationEmail = async (to: string, token: string) => {
  const verificationLink = `http://localhost:3300/api/users/verify-email?token=${token}`;
  const subject = "Verify Your Email Address";
  const html = `
    <h3>Email Verification</h3>
    <p>Thanks for registering. Please verify your email by clicking the link below to complete your registration:</p>
    <a href="${verificationLink}">${verificationLink}</a>
    <p>This link will expire in 24 hours.</p>
  `;

  await emailTransporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};


export const sendForgotPasswordEmail = async (to: string, token: string) => {
  const resetLink = `http://localhost:3300/api/users/reset-password?token=${token}`;
  const subject = "Reset Your Password";
  const html = `
    <h3>Reset Your Password</h3>
    <p>Click the link below to reset your password. This link is valid for 15 minutes:</p>
    <a href="${resetLink}">${resetLink}</a>
  `;

  await emailTransporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};


export const sendResetPasswordSuccessEmail = async (to: string) => {
  const subject = "Your Password Has Been Reset";
  const html = `
    <h3>Password Reset Successful</h3>
    <p>Your password has been successfully reset. If you did not initiate this change, please contact support immediately.</p>
  `;

  await emailTransporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};



