import Sweet from '../models/Sweet.model.js';

/**
 * Get all sweets with optional filtering
 */
export const getAllSweets = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    // Build query
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single sweet by ID
 */
export const getSweetById = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      data: sweet,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new sweet (Admin only)
 */
export const createSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Sweet created successfully',
      data: sweet,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a sweet (Admin only)
 */
export const updateSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sweet updated successfully',
      data: sweet,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a sweet (Admin only)
 */
export const deleteSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sweet deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Purchase a sweet (decreases quantity)
 */
export const purchaseSweet = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${sweet.quantity}, Requested: ${quantity}`,
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json({
      success: true,
      message: 'Purchase successful',
      data: sweet,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Restock a sweet (increases quantity) - Admin only
 */
export const restockSweet = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json({
      success: true,
      message: 'Restocked successfully',
      data: sweet,
    });
  } catch (error) {
    next(error);
  }
};

