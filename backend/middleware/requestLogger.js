/**
 * Custom Request Logger Middleware
 * Logs incoming HTTP requests in format: [METHOD] /path [ISO-Timestamp]
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.originalUrl || req.url} [${timestamp}]`);
  next();
};

module.exports = requestLogger;
