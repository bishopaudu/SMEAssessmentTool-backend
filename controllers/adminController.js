/*const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new admin
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin username already exists
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    console.log(`created admin account ${res.statusCode}`)

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    //res.status(201).json({ token });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error)
  }
};

// Login as admin
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
*/

const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new admin
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin username already exists
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login as admin
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
