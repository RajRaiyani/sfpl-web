/* eslint-disable import/no-anonymous-default-export */

export default {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  env: process.env.NEXT_PUBLIC_ENV || "dev",
  primarySalesEmail: process.env.NEXT_PRIMARY_SALES_EMAIL || "sales@specificfire.com",
  developerEmail: process.env.NEXT_DEVELOPER_EMAIL || "rraiyani62@gmail.com",
  serverProxyUrl:
    process.env.NEXT_PUBLIC_SERVER_PROXY_URL || "http://localhost:3007",
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",

  smtp: {
    host: process.env.NEXT_SMTP_HOST,
    port: process.env.NEXT_SMTP_PORT,
    user: process.env.NEXT_SMTP_USER,
    pass: process.env.NEXT_SMTP_PASSWORD,
  },
};
