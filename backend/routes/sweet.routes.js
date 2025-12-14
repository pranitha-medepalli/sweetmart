import express from 'express';
import {
  getAllSweets,
  getSweetById,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from '../controllers/sweet.controller.js';
import {
  createSweetValidator,
  updateSweetValidator,
  purchaseValidator,
  restockValidator,
  idValidator,
} from '../validators/sweet.validator.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/sweets
 * @desc    Get all sweets (with optional filters)
 * @access  Public (but authenticated users get better experience)
 * @query   name, category, minPrice, maxPrice
 */
router.get('/', getAllSweets);

/**
 * @route   GET /api/sweets/:id
 * @desc    Get a single sweet by ID
 * @access  Public
 */
router.get('/:id', idValidator, validate, getSweetById);

/**
 * @route   POST /api/sweets
 * @desc    Create a new sweet
 * @access  Private/Admin
 */
router.post(
  '/',
  authenticate,
  authorize('admin'),
  createSweetValidator,
  validate,
  createSweet
);

/**
 * @route   PUT /api/sweets/:id
 * @desc    Update a sweet
 * @access  Private/Admin
 */
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  updateSweetValidator,
  validate,
  updateSweet
);

/**
 * @route   DELETE /api/sweets/:id
 * @desc    Delete a sweet
 * @access  Private/Admin
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  idValidator,
  validate,
  deleteSweet
);

/**
 * @route   POST /api/sweets/:id/purchase
 * @desc    Purchase a sweet (decreases quantity)
 * @access  Private
 */
router.post(
  '/:id/purchase',
  authenticate,
  purchaseValidator,
  validate,
  purchaseSweet
);

/**
 * @route   POST /api/sweets/:id/restock
 * @desc    Restock a sweet (increases quantity)
 * @access  Private/Admin
 */
router.post(
  '/:id/restock',
  authenticate,
  authorize('admin'),
  restockValidator,
  validate,
  restockSweet
);

export default router;

