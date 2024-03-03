export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  db: process.env.DB_URI,
  attachment: {
    expirationInterval: process.env.ATTACHMENT_LIVE_TIME || '15m',
  },
  requestTimeout: 30 * 1000
})
