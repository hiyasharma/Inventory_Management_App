import React from 'react';
import './InventoryList.css';

const InventoryList = ({ items, onEdit, onDelete }) => {
  return (
    <div>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item._id}
              className={
                item.quantity < 10
                  ? 'low-stock'
                  : item.quantity > 10
                  ? 'high-stock'
                  : 'sufficient-stock'
              }
            >
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(item._id)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Color Legend Section */}
      <div className="stock-legend">
        <h4>Stock Levels Legend</h4>
        <div className="legend-item">
          <span className="color-box low-stock"></span>
          <span>Low Stock (Less than 10)</span>
        </div>
        <div className="legend-item">
          <span className="color-box sufficient-stock"></span>
          <span>Sufficient Stock (Equal to 10)</span>
        </div>
        <div className="legend-item">
          <span className="color-box high-stock"></span>
          <span>High Stock (Greater than 10)</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
