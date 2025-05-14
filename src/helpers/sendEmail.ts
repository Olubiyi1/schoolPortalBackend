import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (to: string, subject: string, html:string) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };
 
  await transporter.sendMail(mailOptions);
};

const sendPasswordReset = async ()=>{
  
}

export default sendVerificationEmail;

