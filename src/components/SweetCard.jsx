import { useState } from 'react';
import { FiShoppingCart, FiPackage, FiRupee } from 'react-icons/fi';
import './SweetCard.css';

const SweetCard = ({ sweet, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePurchase = async () => {
    if (quantity < 1 || quantity > sweet.quantity) {
      setMessage({ type: 'error', text: 'Invalid quantity' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await onPurchase(sweet._id || sweet.id, quantity);
    setLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setQuantity(1);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } else {
      setMessage({ type: 'error', text: result.message });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className={`sweet-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="sweet-image-container">
        <img
          src={sweet.image || `https://via.placeholder.com/300x200/FFD700/000000?text=${encodeURIComponent(sweet.name)}`}
          alt={sweet.name}
          className="sweet-image"
          onError={(e) => {
            // Fallback to a colorful placeholder if image fails to load
            e.target.src = `https://via.placeholder.com/300x200/FFD700/000000?text=${encodeURIComponent(sweet.name)}`;
            e.target.onerror = null; // Prevent infinite loop
          }}
          loading="lazy"
        />
        {isOutOfStock && <div className="stock-badge">Out of Stock</div>}
      </div>

      <div className="sweet-info">
        <h3 className="sweet-name">{sweet.name}</h3>
        <div className="sweet-meta">
          <span className="sweet-category">{sweet.category}</span>
          <span className="sweet-price">
            <FiRupee /> {sweet.price.toFixed(2)}
          </span>
        </div>

        <div className="sweet-quantity">
          <FiPackage /> Available: {sweet.quantity} {sweet.quantity === 1 ? 'piece' : 'pieces'}
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="purchase-section">
          {!isOutOfStock && (
            <div className="quantity-selector">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                max={sweet.quantity}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuantity(Math.min(Math.max(1, val), sweet.quantity));
                }}
                className="quantity-input"
              />
            </div>
          )}

          <button
            className="btn btn-primary purchase-btn"
            onClick={handlePurchase}
            disabled={isOutOfStock || loading}
          >
            <FiShoppingCart />
            {loading ? 'Processing...' : isOutOfStock ? 'Out of Stock' : 'Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SweetCard;

