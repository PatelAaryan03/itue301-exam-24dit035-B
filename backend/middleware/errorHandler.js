function errorHandler(error, request, response, next) {
  console.error(error.message);
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ success: false, message: "Request body must contain valid JSON" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ success: false, message: "Validation failed", errors: Object.values(error.errors).map((item) => item.message) });
  }
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || "field";
    return response.status(409).json({ success: false, message: `${field} must be unique` });
  }
  return response.status(error.statusCode || 500).json({ success: false, message: error.statusCode ? error.message : "Internal Server Error" });
}

module.exports = errorHandler;
