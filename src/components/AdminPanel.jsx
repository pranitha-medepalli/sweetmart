import { useState, useEffect } from 'react';
import { sweetAPI } from '../services/api';
import AdminSweetForm from './AdminSweetForm';
import AdminSweetList from './AdminSweetList';
import { FiPlus, FiLoader } from 'react-icons/fi';
import './AdminPanel.css';

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await sweetAPI.getAll();
      const sweetsData = response.data.data || response.data;
      setSweets(sweetsData);
    } catch (err) {
      setError('Failed to load sweets. Please try again later.');
      console.error('Error fetching sweets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSweet(null);
    setShowForm(true);
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await sweetAPI.delete(id);
      await fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete sweet');
    }
  };

  const handleRestock = async (id, quantity) => {
    try {
      await sweetAPI.restock(id, quantity);
      await fetchSweets();
      return { success: true, message: 'Restocked successfully!' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Restock failed. Please try again.',
      };
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSweet(null);
  };

  const handleFormSubmit = async () => {
    await fetchSweets();
    handleFormClose();
  };

  if (loading) {
    return (
      <div className="loading">
        <FiLoader className="spinner" />
        <span>Loading admin panel...</span>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>🛠️ Admin Panel</h1>
            <p>Manage your sweet inventory</p>
          </div>
          <button onClick={handleAdd} className="btn btn-primary">
            <FiPlus /> Add New Sweet
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {showForm && (
          <AdminSweetForm
            sweet={editingSweet}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        )}

        <AdminSweetList
          sweets={sweets}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRestock={handleRestock}
        />
      </div>
    </div>
  );
};

export default AdminPanel;

