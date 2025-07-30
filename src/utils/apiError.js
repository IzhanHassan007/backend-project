// Custom Error Class jo Express ya API mein use hogi
class ApiError extends Error {

// Constructor mein sab properties set karo
  constructor(
    statusCode,                 // HTTP status code jaise 400, 404, 500
    message = "Something went wrong", // Default error message
    errors = [],                // Additional errors array agar ho
    stack = ""                  // Custom stack trace agar dena ho
  ) {
// Parent Error class ko call karo
    super(message);

// Apni properties set karo
    this.statusCode = statusCode;
    this.data = null;           // Usually null rehta hai errors mein
    this.message = message;
    this.success = false;       // Success hamesha false rahega
    this.errors = errors;       

// Stack trace set karo (custom ya default)
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError}
