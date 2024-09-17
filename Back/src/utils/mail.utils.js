import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const smtpTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    },
    secure: false,
    tls: {
        ciphers:'SSLv3'
    }
})