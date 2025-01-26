import React from 'react';
import './ItemForm.css';

const ItemForm = ({ item, onChange, onSubmit }) => {
  return (
    <div className="form-container">
      <h3>{item._id ? 'Edit Item' : 'Add New Item'}</h3>

      <div className="form-group">
        {/* Input for Item Name */}
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={onChange}
          placeholder="Item Name"
          className="form-input"
          required
        />

        {/* Input for Category */}
        <select
          name="category"
          value={item.category}
          onChange={onChange}
          className="form-input"
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Groceries">Groceries</option>
          <option value="Clothing">Clothing</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Books">Books</option>
          <option value="Tools">Tools</option>
          <option value="Appliances">Appliances</option>
          <option value="Stationery">Stationery</option>
          <option value="Stationery">Office Equipment</option>
          <option value="Office Decor">Office Decor</option>

        </select>

        {/* Input for Quantity */}
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={onChange}
          placeholder="Quantity"
          className="form-input"
          min="0"
          required
        />
      </div>

      {/* Submit Button */}
      <button className="submit-btn" onClick={onSubmit}>
        {item._id ? 'Save Changes' : 'Add Item'}
      </button>
    </div>
  );
};

export default ItemForm;
