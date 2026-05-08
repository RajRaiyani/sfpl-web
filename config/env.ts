/* eslint-disable import/no-anonymous-default-export */

export default {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  env: process.env.NEXT_PUBLIC_ENV || "dev",
  primarySalesEmail: process.env.NEXT_PRIMARY_SALES_EMAIL || "sales@specificfire.com",
  developerEmail: process.env.NEXT_DEVELOPER_EMAIL || "rraiyani62@gmail.com",

  smtp: {
    host: process.env.NEXT_SMTP_HOST,
    port: process.env.NEXT_SMTP_PORT,
    user: process.env.NEXT_SMTP_USER,
    pass: process.env.NEXT_SMTP_PASSWORD,
  }
};