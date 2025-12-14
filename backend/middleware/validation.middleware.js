import { validationResult } from 'express-validator';

/**
 * Validation middleware
 * Checks for validation errors and returns formatted error response
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.path || error.param,
        message: error.msg,
      })),
    });
  }

  next();
};

