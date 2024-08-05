const SalesOrder = require('../models/so');

// Create Sales Order
exports.createSO = async (req, res) => {
  try {
    const { customerName, customerAddress, poDate, poNumber, soNumber, items, discount, downPayment, vat, paymentSchedule } = req.body;
    const subTotal = items.reduce((sum, item) => sum + item.total, 0);
    const grandTotal = subTotal - discount + downPayment + vat;

    const newSO = new SalesOrder({
      customerName,
      customerAddress,
      poDate,
      poNumber,
      soNumber,
      items,
      subTotal,
      discount,
      downPayment,
      vat,
      grandTotal,
      paymentSchedule,
    });

    await newSO.save();
    res.status(201).json(newSO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other CRUD operations can be added here...
