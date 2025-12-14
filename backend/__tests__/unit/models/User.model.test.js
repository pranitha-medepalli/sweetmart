import { describe, it, expect, beforeEach } from '@jest/globals';
import User from '../../../models/User.model.js';

describe('User Model', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('User Creation', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = await User.create(userData);

      expect(user).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // Should be hashed
      expect(user.role).toBe('user'); // Default role
    });

    it('should hash password before saving', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = await User.create(userData);
      expect(user.password).not.toBe('password123');
      expect(user.password.length).toBeGreaterThan(20); // Bcrypt hash length
    });

    it('should not return password in JSON by default', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = await User.create(userData);
      const userJSON = user.toJSON();

      expect(userJSON.password).toBeUndefined();
    });
  });

  describe('User Validation', () => {
    it('should require name field', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should require email field', async () => {
      const userData = {
        name: 'Test User',
        password: 'password123',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should require password field', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should validate email format', async () => {
      const userData = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123',
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should enforce unique email', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await User.create(userData);

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should enforce minimum password length', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '12345', // Less than 6 characters
      };

      await expect(User.create(userData)).rejects.toThrow();
    });
  });

  describe('comparePassword', () => {
    it('should return true for correct password', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = await User.create(userData);
      const isValid = await user.comparePassword('password123');

      expect(isValid).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = await User.create(userData);
      const isValid = await user.comparePassword('wrongpassword');

      expect(isValid).toBe(false);
    });
  });
});

