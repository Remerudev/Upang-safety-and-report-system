const Incident = require('../model/IncidentModel');
const mongoose = require('mongoose');

// Create report
exports.createIncident = async (req, res) => {
  try {
    const { title, description, location, date, status: incomingStatus, category, priority } = req.body;

    if (!title || !description || !location || !date || !category) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const validPriorities = ['low', 'medium', 'high'];
    let normalizedPriority = 'low';

    if (priority) {
      const lowerPriority = priority.toLowerCase().trim();
      if (validPriorities.includes(lowerPriority)) {
        normalizedPriority = lowerPriority;
      } else {
        return res.status(400).json({ message: 'Invalid priority value. Must be low, medium, or high.' });
      }
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
      priority: normalizedPriority,
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
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ message: 'userEmail is required' });
    }

    const incidents = await Incident.find({ 
      UserEmail: userEmail 
    }).sort({ createdAt: -1 });

    res.status(200).json(incidents);
  } catch (error) {
    console.error('Fetch user incidents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get ALL incidents (for admin)
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    console.error('Fetch all incidents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update incident status and details for admin and user
exports.updateIncident = async (req, res) => {
  try {
    const updated = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Incident not found' });
    res.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete incident (for admin)
exports.deleteIncident = async (req, res) => {
  try {
     const deleted = await Incident.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ success: true, message: 'Report deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};