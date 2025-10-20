// controller/IncidentController.js
const Incident = require('../model/IncidentModel');
const mongoose = require('mongoose');

// Create report
exports.createIncident = async (req, res) => {
  try {
  const { title, description, location, date, status: incomingStatus, category } = req.body;

    if (!title || !description || !location || !date || !category) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    let photoEvidence = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      photoEvidence = req.files.map(file => ({
        filename: file.filename,
        path: file.path
      }));
    }

  const tokenUser = req.user || null;
  const userEmail = tokenUser?.email || tokenUser?.Email || req.body.UserEmail || req.body.userEmail || null;
  const username = req.body.Username || req.body.username || (userEmail ? userEmail.split('@')[0] : (tokenUser?.id || 'Anonymous'));

  const finalStatus = incomingStatus || 'Submitted';

    const newIncident = await Incident.create({
      Username: username,
      UserEmail: userEmail,
      title,
      description,
      location,
      date,
      status: finalStatus,
      category,
      photoEvidence
    });

    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      reportNumber: newIncident.reportnumber,
      id: newIncident._id
    });
  } catch (error) {
    console.error('Create incident error:', error);
    // Show detailed validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all incidents
exports.getUserIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    console.error('Fetch incidents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};