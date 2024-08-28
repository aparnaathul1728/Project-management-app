const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, dateOfBirth, gender, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Login user
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
      // Generate JWT
      const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Logout user (invalidate the token)
  exports.logout = (req, res) => {
    // Invalidate the token by simply not including it in further requests
    res.status(200).json({ message: 'Logout successful' });
  };
  
  // Get all users with optional filters
  exports.getAllUsers = async (req, res) => {
    try {
      const filters = req.query;
      const users = await User.findAll({ where: filters, include: Project });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get user by ID
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, { include: Project });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Update user by ID
  exports.updateUser = async (req, res) => {
    try {
      const { firstName, lastName, dateOfBirth, gender, email, password } = req.body;
      const user = await User.findByPk(req.params.id);
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // If updating password, hash the new password
      const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
  
      // Update user fields
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.gender = gender || user.gender;
      user.email = email || user.email;
      user.password = hashedPassword;
  
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete user by ID
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Delete the user and related timesheets (handled by cascading in the database)
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };