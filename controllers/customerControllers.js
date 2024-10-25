const Lead = require('../models/Lead');
const axios = require('axios');

// Get customers and store them in the database
exports.getCustomers = async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/users');
    const customers = response.data;
    await Lead.insertMany(customers);
    res.json({ message: 'Customers stored in MongoDB', customers });
  } catch (error) {
    res.status(500).send('Error fetching customer data');
  }
};

// Add a new customer
exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = new Lead(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).send('Error adding customer');
  }
};

// Update customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).send('Customer not found');
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).send('Error updating customer');
  }
};

// Delete customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).send('Customer not found');
    }
    res.json({ message: 'Customer deleted', deletedCustomer });
  } catch (error) {
    res.status(400).send('Error deleting customer');
  }
};
