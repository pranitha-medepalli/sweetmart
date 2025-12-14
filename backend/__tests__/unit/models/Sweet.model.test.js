import { describe, it, expect, beforeEach } from '@jest/globals';
import Sweet from '../../../models/Sweet.model.js';

describe('Sweet Model', () => {
  beforeEach(async () => {
    await Sweet.deleteMany({});
  });

  describe('Sweet Creation', () => {
    it('should create a new sweet with valid data', async () => {
      const sweetData = {
        name: 'Kaju Katli',
        category: 'Kaju Katli',
        price: 450.00,
        quantity: 50,
      };

      const sweet = await Sweet.create(sweetData);

      expect(sweet).toBeDefined();
      expect(sweet.name).toBe(sweetData.name);
      expect(sweet.category).toBe(sweetData.category);
      expect(sweet.price).toBe(sweetData.price);
      expect(sweet.quantity).toBe(sweetData.quantity);
    });

    it('should set default quantity to 0 if not provided', async () => {
      const sweetData = {
        name: 'Gulab Jamun',
        category: 'Gulab Jamun',
        price: 300.00,
      };

      const sweet = await Sweet.create(sweetData);

      expect(sweet.quantity).toBe(0);
    });
  });

  describe('Sweet Validation', () => {
    it('should require name field', async () => {
      const sweetData = {
        category: 'Barfi',
        price: 400.00,
        quantity: 30,
      };

      await expect(Sweet.create(sweetData)).rejects.toThrow();
    });

    it('should require category field', async () => {
      const sweetData = {
        name: 'Rasgulla',
        price: 250.00,
        quantity: 40,
      };

      await expect(Sweet.create(sweetData)).rejects.toThrow();
    });

    it('should require price field', async () => {
      const sweetData = {
        name: 'Jalebi',
        category: 'Jalebi',
        quantity: 60,
      };

      await expect(Sweet.create(sweetData)).rejects.toThrow();
    });

    it('should validate category enum', async () => {
      const sweetData = {
        name: 'Test Sweet',
        category: 'InvalidCategory',
        price: 200.00,
        quantity: 20,
      };

      await expect(Sweet.create(sweetData)).rejects.toThrow();
    });

    it('should not allow negative price', async () => {
      const sweetData = {
        name: 'Test Sweet',
        category: 'Barfi',
        price: -100,
        quantity: 20,
      };

      await expect(Sweet.create(sweetData)).rejects.toThrow();
    });

    it('should not allow negative quantity', async () => {
      const sweetData = {
        name: 'Test Sweet',
        category: 'Barfi',
        price: 200.00,
        quantity: -10,
      };

      await expect(Sweet.create(sweetData)).rejects.toThrow();
    });

    it('should validate name length', async () => {
      const sweetData = {
        name: 'A', // Too short
        category: 'Barfi',
        price: 200.00,
        quantity: 20,
      };

      await expect(Sweet.create(sweetData)).rejects.toThrow();
    });
  });
});

