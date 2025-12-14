import { body, param } from 'express-validator';

/**
 * Validation rules for creating a sweet
 */
export const createSweetValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Sweet name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Sweet name must be between 2 and 100 characters'),
  
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Mithai',
      'Barfi',
      'Laddoo',
      'Halwa',
      'Gulab Jamun',
      'Rasgulla',
      'Jalebi',
      'Kaju Katli',
      'Other',
    ])
    .withMessage('Invalid category'),
  
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  
  body('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
];

/**
 * Validation rules for updating a sweet
 */
export const updateSweetValidator = [
  param('id')
    .notEmpty()
    .withMessage('Sweet ID is required')
    .isMongoId()
    .withMessage('Invalid sweet ID'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Sweet name must be between 2 and 100 characters'),
  
  body('category')
    .optional()
    .trim()
    .isIn([
      'Mithai',
      'Barfi',
      'Laddoo',
      'Halwa',
      'Gulab Jamun',
      'Rasgulla',
      'Jalebi',
      'Kaju Katli',
      'Other',
    ])
    .withMessage('Invalid category'),
  
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  
  body('image')
    .optional()
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
];

/**
 * Validation rules for purchase
 */
export const purchaseValidator = [
  param('id')
    .notEmpty()
    .withMessage('Sweet ID is required')
    .isMongoId()
    .withMessage('Invalid sweet ID'),
  
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
];

/**
 * Validation rules for restock
 */
export const restockValidator = [
  param('id')
    .notEmpty()
    .withMessage('Sweet ID is required')
    .isMongoId()
    .withMessage('Invalid sweet ID'),
  
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Restock quantity must be a positive integer'),
];

/**
 * Validation rules for ID parameter
 */
export const idValidator = [
  param('id')
    .notEmpty()
    .withMessage('Sweet ID is required')
    .isMongoId()
    .withMessage('Invalid sweet ID'),
];

