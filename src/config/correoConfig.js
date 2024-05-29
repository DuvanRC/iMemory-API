import { createTransport } from "nodemailer";
import "dotenv/config";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
});

export default transporter;
