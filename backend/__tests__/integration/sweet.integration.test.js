import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../../server.js';
import User from '../../models/User.model.js';
import Sweet from '../../models/Sweet.model.js';
import { generateToken } from '../../utils/jwt.util.js';

describe('Sweet API Integration Tests', () => {
  let userToken;
  let adminToken;
  let user;
  let admin;

  beforeEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Create regular user
    user = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
    });
    userToken = generateToken({ id: user._id, role: user.role });

    // Create admin user
    admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });
    adminToken = generateToken({ id: admin._id, role: admin.role });
  });

  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      await Sweet.create([
        {
          name: 'Kaju Katli',
          category: 'Kaju Katli',
          price: 450.00,
          quantity: 50,
        },
        {
          name: 'Gulab Jamun',
          category: 'Gulab Jamun',
          price: 300.00,
          quantity: 30,
        },
      ]);
    });

    it('should get all sweets', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data).toHaveLength(2);
    });

    it('should filter sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets?name=kaju')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Kaju Katli');
    });

    it('should filter sweets by category', async () => {
      const response = await request(app)
        .get('/api/sweets?category=Gulab Jamun')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('Gulab Jamun');
    });

    it('should filter sweets by price range', async () => {
      const response = await request(app)
        .get('/api/sweets?minPrice=350&maxPrice=500')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Kaju Katli');
    });
  });

  describe('GET /api/sweets/:id', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Rasgulla',
        category: 'Rasgulla',
        price: 250.00,
        quantity: 40,
      });
    });

    it('should get a sweet by ID', async () => {
      const response = await request(app)
        .get(`/api/sweets/${sweet._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Rasgulla');
    });

    it('should return 404 for non-existent sweet', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/sweets/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets', () => {
    it('should create a sweet as admin', async () => {
      const sweetData = {
        name: 'Jalebi',
        category: 'Jalebi',
        price: 200.00,
        quantity: 60,
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(sweetData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(sweetData.name);
    });

    it('should return 403 for non-admin user', async () => {
      const sweetData = {
        name: 'Jalebi',
        category: 'Jalebi',
        price: 200.00,
        quantity: 60,
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send(sweetData)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .send({})
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Barfi',
        category: 'Barfi',
        price: 350.00,
        quantity: 45,
      });
    });

    it('should update a sweet as admin', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 400.00 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.price).toBe(400.00);
    });

    it('should return 403 for non-admin user', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ price: 400.00 })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Laddoo',
        category: 'Laddoo',
        price: 280.00,
        quantity: 35,
      });
    });

    it('should delete a sweet as admin', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify sweet is deleted
      const deletedSweet = await Sweet.findById(sweet._id);
      expect(deletedSweet).toBeNull();
    });

    it('should return 403 for non-admin user', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Kaju Katli',
        category: 'Kaju Katli',
        price: 450.00,
        quantity: 50,
      });
    });

    it('should purchase a sweet and decrease quantity', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 5 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(45);

      // Verify in database
      const updatedSweet = await Sweet.findById(sweet._id);
      expect(updatedSweet.quantity).toBe(45);
    });

    it('should return 400 for insufficient stock', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 100 })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Insufficient stock');
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .send({ quantity: 5 })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Gulab Jamun',
        category: 'Gulab Jamun',
        price: 300.00,
        quantity: 30,
      });
    });

    it('should restock a sweet as admin', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 20 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(50);

      // Verify in database
      const updatedSweet = await Sweet.findById(sweet._id);
      expect(updatedSweet.quantity).toBe(50);
    });

    it('should return 403 for non-admin user', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 20 })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});

