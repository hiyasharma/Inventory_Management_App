import React from 'react';
import './Filters.css';

const Filters = ({ onCategoryFilter, onSortByQuantity }) => {

  
  return (
    <div className="filters-container">
      <button className="filter-btn" onClick={() => onCategoryFilter('')}>All</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Electronics')}>Electronics</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Furniture')}>Furniture</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Groceries')}>Groceries</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Clothing')}>Clothing</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Office Supplies')}>Office Supplies</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Books')}>Books</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Tools')}>Tools</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Appliances')}>Appliances</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Stationery')}>Stationery</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Office Equipment')}>Office Equipment</button>
      <button className="filter-btn" onClick={() => onCategoryFilter('Office Decor')}>Office Decor</button>

      <button className="sort-btn" onClick={onSortByQuantity}>Sort by Quantity</button>
    </div>
  );
};

export default Filters;
