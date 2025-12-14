import { useState, useEffect } from 'react';
import { sweetAPI } from '../services/api';
import SweetCard from './SweetCard';
import SearchFilters from './SearchFilters';
import { FiLoader } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, sweets]);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await sweetAPI.getAll();
      const sweetsData = response.data.data || response.data;
      setSweets(sweetsData);
      setFilteredSweets(sweetsData);
    } catch (err) {
      setError('Failed to load sweets. Please try again later.');
      console.error('Error fetching sweets:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...sweets];

    // Search by name
    if (filters.search) {
      filtered = filtered.filter((sweet) =>
        sweet.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((sweet) => sweet.category === filters.category);
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter((sweet) => sweet.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((sweet) => sweet.price <= parseFloat(filters.maxPrice));
    }

    setFilteredSweets(filtered);
  };

  const handlePurchase = async (sweetId, quantity) => {
    try {
      await sweetAPI.purchase(sweetId, quantity);
      // Refresh sweets list
      await fetchSweets();
      return { success: true, message: 'Purchase successful!' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Purchase failed. Please try again.',
      };
    }
  };

  const categories = [...new Set(sweets.map((sweet) => sweet.category))];

  if (loading) {
    return (
      <div className="loading">
        <FiLoader className="spinner" />
        <span>Loading sweets...</span>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>🍬 Indian Sweets Collection</h1>
          <p>Discover our delicious range of traditional Indian sweets</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <SearchFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />

        {filteredSweets.length === 0 ? (
          <div className="no-results">
            <p>No sweets found matching your criteria.</p>
          </div>
        ) : (
          <div className="sweets-grid grid grid-3">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet._id || sweet.id}
                sweet={sweet}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

