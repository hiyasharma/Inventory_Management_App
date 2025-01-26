// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 5000; // Change port if needed

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON bodies

// MongoDB Connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/inventory', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Create a Mongoose schema for inventory items
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
});

// Create a Mongoose model for the inventory items
const Item = mongoose.model('Item', itemSchema);

// Routes

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(400).send('Error fetching items: ' + err);
  }
});

// Add a new item
app.post('/api/items', async (req, res) => {
  const { name, category, quantity } = req.body;
  try {
    const newItem = new Item({ name, category, quantity });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(400).send('Error adding item: ' + err);
  }
});

// Update an item
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, {
      new: true, // Returns the updated document
    });

    if (!updatedItem) {
      return res.status(404).send('Item not found');
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).send('Error updating item: ' + err);
  }
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).send('Item not found');
    }

    res.json(deletedItem);
  } catch (err) {
    res.status(400).send('Error deleting item: ' + err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
