import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { generateToken, verifyToken, extractToken } from '../../../utils/jwt.util.js';

describe('JWT Utilities', () => {
  const originalSecret = process.env.JWT_SECRET;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret-key';
  });

  afterEach(() => {
    process.env.JWT_SECRET = originalSecret;
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const payload = { id: '123', role: 'user' };
      const token = generateToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    it('should generate different tokens for different payloads', () => {
      const token1 = generateToken({ id: '123' });
      const token2 = generateToken({ id: '456' });

      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const payload = { id: '123', role: 'user' };
      const token = generateToken(payload);
      const decoded = verifyToken(token);

      expect(decoded.id).toBe('123');
      expect(decoded.role).toBe('user');
    });

    it('should throw error for invalid token', () => {
      expect(() => {
        verifyToken('invalid-token');
      }).toThrow();
    });

    it('should throw error for expired token', () => {
      // Create a token with very short expiry
      process.env.JWT_EXPIRE = '1ms';
      const payload = { id: '123' };
      const token = generateToken(payload);

      // Wait for token to expire
      setTimeout(() => {
        expect(() => {
          verifyToken(token);
        }).toThrow();
      }, 10);
    });
  });

  describe('extractToken', () => {
    it('should extract token from Bearer header', () => {
      const header = 'Bearer test-token-123';
      const token = extractToken(header);

      expect(token).toBe('test-token-123');
    });

    it('should return null for invalid header format', () => {
      expect(extractToken('Invalid token')).toBeNull();
      expect(extractToken('')).toBeNull();
      expect(extractToken(null)).toBeNull();
    });

    it('should return null for missing header', () => {
      expect(extractToken(undefined)).toBeNull();
    });
  });
});

