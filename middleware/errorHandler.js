/**
 * Global error handler middleware
 * This should be registered last in the middleware chain
 * to catch any errors passed via next(error)
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', err);

  // If response was already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle specific error types
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message || 'Invalid input data'
    });
  }

  if (err.name === 'blank id' || err.name === 'no such id') {
    return res.status(404).json({
      error: 'Not Found',
      message: err.message || 'Resource not found'
    });
  }

  // Default to 500 server error
  res.status(err.status || 500).json({
    error: 'Server Error',
    message: err.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
