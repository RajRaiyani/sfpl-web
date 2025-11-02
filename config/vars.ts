export default {
  smtp: {
    host: process.env.NEXT_SMTP_HOST,
    port: process.env.NEXT_SMTP_PORT,
    user: process.env.NEXT_SMTP_USER,
    pass: process.env.NEXT_SMTP_PASSWORD,
  }
};