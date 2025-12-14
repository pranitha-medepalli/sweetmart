import { useState } from 'react';
import { FiEdit, FiTrash2, FiPackage, FiRupee } from 'react-icons/fi';
import './AdminSweetList.css';

const AdminSweetList = ({ sweets, onEdit, onDelete, onRestock }) => {
  const [restockData, setRestockData] = useState({});
  const [restockLoading, setRestockLoading] = useState({});
  const [restockMessage, setRestockMessage] = useState({});

  const handleRestock = async (sweetId) => {
    const quantity = parseInt(restockData[sweetId] || 0);
    if (quantity <= 0) {
      setRestockMessage({ ...restockMessage, [sweetId]: { type: 'error', text: 'Please enter a valid quantity' } });
      setTimeout(() => {
        setRestockMessage({ ...restockMessage, [sweetId]: null });
      }, 3000);
      return;
    }

    setRestockLoading({ ...restockLoading, [sweetId]: true });
    const result = await onRestock(sweetId, quantity);
    setRestockLoading({ ...restockLoading, [sweetId]: false });

    if (result.success) {
      setRestockMessage({ ...restockMessage, [sweetId]: { type: 'success', text: result.message } });
      setRestockData({ ...restockData, [sweetId]: '' });
      setTimeout(() => {
        setRestockMessage({ ...restockMessage, [sweetId]: null });
      }, 3000);
    } else {
      setRestockMessage({ ...restockMessage, [sweetId]: { type: 'error', text: result.message } });
      setTimeout(() => {
        setRestockMessage({ ...restockMessage, [sweetId]: null });
      }, 3000);
    }
  };

  if (sweets.length === 0) {
    return (
      <div className="no-sweets">
        <p>No sweets found. Add your first sweet to get started!</p>
      </div>
    );
  }

  return (
    <div className="admin-sweet-list">
      <div className="sweets-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Restock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map((sweet) => (
              <tr key={sweet._id || sweet.id}>
                <td>
                  <img
                    src={sweet.image || `https://via.placeholder.com/60x60?text=${encodeURIComponent(sweet.name)}`}
                    alt={sweet.name}
                    className="table-image"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/60x60/FFD700/000000?text=${encodeURIComponent(sweet.name)}`;
                    }}
                  />
                </td>
                <td className="sweet-name-cell">{sweet.name}</td>
                <td>{sweet.category}</td>
                <td>
                  <FiRupee /> {sweet.price.toFixed(2)}
                </td>
                <td>
                  <span className={`stock-badge ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}>
                    {sweet.quantity}
                  </span>
                </td>
                <td>
                  <div className="restock-controls">
                    <input
                      type="number"
                      min="1"
                      value={restockData[sweet._id || sweet.id] || ''}
                      onChange={(e) =>
                        setRestockData({ ...restockData, [sweet._id || sweet.id]: e.target.value })
                      }
                      placeholder="Qty"
                      className="restock-input"
                    />
                    <button
                      onClick={() => handleRestock(sweet._id || sweet.id)}
                      className="btn btn-success btn-sm"
                      disabled={restockLoading[sweet._id || sweet.id]}
                    >
                      <FiPackage />
                      {restockLoading[sweet._id || sweet.id] ? '...' : 'Add'}
                    </button>
                  </div>
                  {restockMessage[sweet._id || sweet.id] && (
                    <div className={`restock-message alert-${restockMessage[sweet._id || sweet.id].type}`}>
                      {restockMessage[sweet._id || sweet.id].text}
                    </div>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(sweet)}
                      className="btn btn-secondary btn-sm"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => onDelete(sweet._id || sweet.id)}
                      className="btn btn-danger btn-sm"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSweetList;

