function requestLogger(request, response, next) {
  console.log(`[${request.method}] ${request.path} [${new Date().toISOString()}]`);
  next();
}

module.exports = requestLogger;