import React, { useState, useEffect } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import InventoryList from './components/InventoryList';
import Filters from './components/Filters';

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');
  const [newItem, setNewItem] = useState({ _id: null, name: '', category: '', quantity: 0 });

  // Fetch items from the backend when the app loads
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://localhost:5000/api/items');
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  const handleAddItem = () => {
    const newItemWithId = { ...newItem, _id: Date.now() }; // Generate unique id for new items

    fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(data => {
        setItems((prevItems) => [...prevItems, data]);
        setNewItem({ _id: null, name: '', category: '', quantity: 0 }); // Reset form after adding
      })
      .catch(error => {
        console.error("Error adding item:", error);
      });
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item._id === id);
    if (itemToEdit) {
      setNewItem({ ...itemToEdit });
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  };
  

  const handleSaveItem = () => {
    if (newItem._id) {
      // Update existing item
      fetch(`http://localhost:5000/api/items/${newItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
        .then((response) => response.json())
        .then((updatedItem) => {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item._id === updatedItem._id ? updatedItem : item
            )
          );
          setNewItem({ _id: null, name: '', category: '', quantity: 0 }); // Reset form after saving
        })
        .catch((error) => console.error('Error updating item:', error));
    } else {
      handleAddItem();
    }
  };

  const handleDeleteItem = (id) => {
    fetch(`http://localhost:5000/api/items/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const handleCategoryFilter = (category) => {
    setFilteredCategory(category);
  };

  const handleSortByQuantity = () => {
    setItems([...items].sort((a, b) => a.quantity - b.quantity));
  };

  const filteredItems = items.filter(item =>
    filteredCategory === '' || item.category === filteredCategory
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  return (
    <div className="app-container">
      <h1>Inventory Management</h1>

     
<p class="tagline">From chaos to clarity—inventory management simplified</p>


      {/* Filters Component */}
      <Filters onCategoryFilter={handleCategoryFilter} onSortByQuantity={handleSortByQuantity} />

      {/* Item Form Component */}
      <ItemForm
        item={newItem}
        onChange={handleChange}
        onSubmit={handleSaveItem} // Calls save function on form submit
      />
     

      {/* Inventory List Component */}
      <InventoryList items={filteredItems} onEdit={handleEditItem} onDelete={handleDeleteItem} />
    </div>
  );
};

export default App;
