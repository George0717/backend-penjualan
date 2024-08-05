const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sales_orders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the Sales Order schema and model
const salesOrderSchema = new mongoose.Schema({
  customerName: String,
  customerAddress: String,
  poDate: String,
  poNumber: String,
  soNumber: String,
  items: [
    {
      quantity: Number,
      jenis: String,
      name: String,
      price: Number,
    },
  ],
  discount: Number,
  discountType: String,
  downPayment: Number,
  tax: Number,
  paymentType: String,
  paymentDate: String,
});

const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

// Routes
app.get('/api/sales-orders', async (req, res) => {
  try {
    const salesOrders = await SalesOrder.find();
    res.json(salesOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/sales-orders', async (req, res) => {
  const salesOrder = new SalesOrder(req.body);
  try {
    const newSalesOrder = await salesOrder.save();
    res.status(201).json(newSalesOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/sales-orders/:id', async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findById(req.params.id);
    if (salesOrder == null) {
      return res.status(404).json({ message: 'Cannot find sales order' });
    }
    res.json(salesOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/sales-orders/:id', async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (salesOrder == null) {
      return res.status(404).json({ message: 'Cannot find sales order' });
    }
    res.json(salesOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/sales-orders/:id', async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findByIdAndDelete(req.params.id);
    if (salesOrder == null) {
      return res.status(404).json({ message: 'Cannot find sales order' });
    }
    res.json({ message: 'Deleted sales order' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
