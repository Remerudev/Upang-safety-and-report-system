const User = require("../model/Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";

//signup user
exports.signupUser = async (req, res) => {
  try {
    const { StudentID, email, password, name, year, phone, department, course } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({StudentID, email, password: hashedPassword, name, year, phone, department, course});
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Username or Password is incorrect" });

    const token = jwt.sign(
      { id: user._id, Email: user.Email },
      SECRET_KEY || "mysecretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      message: "Login successful", 
      token,
      user: { email: user.email, id: user._id, name: user.name }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log(`UserController.getAllUsers invoked - requested by ${req.ip} origin=${req.headers.origin}`);
    const users = await User.find().select("-password");
    res.json(users);

  } catch (err) {
    console.error('Error in getAllUsers:', err);
    res.status(500).json({ error: err.message });
  }
};

//get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Logout user
exports.logoutUser = async (_req, res) => {
  try {
    res.status(200).json({ message: "Logout successful."});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

