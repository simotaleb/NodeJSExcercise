// Custom error classes
class ExternalApiError extends Error {}
class ValidationError extends Error {}
class NotFoundError extends Error {}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof ExternalApiError) {
    res.status(502).send('Error interacting with external API');
  } else if (err instanceof ValidationError) {
    res.status(400).send(err.message);
  } else if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
  } else {
    res.status(500).send('Internal server error');
  }
};

module.exports = { errorHandler, ExternalApiError, ValidationError, NotFoundError };
