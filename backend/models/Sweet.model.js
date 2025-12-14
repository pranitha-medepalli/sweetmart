import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sweet name is required'],
      trim: true,
      minlength: [2, 'Sweet name must be at least 2 characters'],
      maxlength: [100, 'Sweet name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: [
        'Mithai',
        'Barfi',
        'Laddoo',
        'Halwa',
        'Gulab Jamun',
        'Rasgulla',
        'Jalebi',
        'Kaju Katli',
        'Other',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  }
);

// Indexes for faster queries
sweetSchema.index({ name: 'text' }); // Text search index
sweetSchema.index({ category: 1 });
sweetSchema.index({ price: 1 });

const Sweet = mongoose.model('Sweet', sweetSchema);

export default Sweet;

