import { useState, useEffect } from 'react';
import { sweetAPI } from '../services/api';
import { FiX, FiSave } from 'react-icons/fi';
import './AdminSweetForm.css';

const AdminSweetForm = ({ sweet, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name || '',
        category: sweet.category || '',
        price: sweet.price || '',
        quantity: sweet.quantity || '',
        image: sweet.image || '',
        description: sweet.description || '',
      });
    }
  }, [sweet]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      };

      if (sweet) {
        await sweetAPI.update(sweet._id || sweet.id, data);
      } else {
        await sweetAPI.create(data);
      }

      onSubmit();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save sweet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Mithai',
    'Barfi',
    'Laddoo',
    'Halwa',
    'Gulab Jamun',
    'Rasgulla',
    'Jalebi',
    'Kaju Katli',
    'Other',
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{sweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
          <button onClick={onClose} className="btn-close">
            <FiX />
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="input-group">
              <label>Sweet Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Kaju Katli"
              />
            </div>

            <div className="input-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="input-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Sweet description..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FiSave />
              {loading ? 'Saving...' : sweet ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSweetForm;

