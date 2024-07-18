// Import custom error classes
const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");

// Export all custom error classes
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
