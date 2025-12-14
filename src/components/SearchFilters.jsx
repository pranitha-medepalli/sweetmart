import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import './SearchFilters.css';

const SearchFilters = ({ filters, setFilters, categories }) => {
  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.minPrice || filters.maxPrice;

  return (
    <div className="search-filters">
      <div className="filters-header">
        <h2>
          <FiFilter /> Search & Filter
        </h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="btn-clear">
            <FiX /> Clear Filters
          </button>
        )}
      </div>

      <div className="filters-grid">
        <div className="filter-item search-item">
          <label>
            <FiSearch /> Search by Name
          </label>
          <input
            type="text"
            placeholder="Search sweets..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-item">
          <label>Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="filter-input"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Min Price (₹)</label>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="filter-input"
            min="0"
            step="0.01"
          />
        </div>

        <div className="filter-item">
          <label>Max Price (₹)</label>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="filter-input"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;

