const Incident = require('../model/IncidentModel');

//USER: Create report
exports.createIncident = async (req, res) => {
  try {
    const { title, description, location, date, category, priority, userEmail, userName } = req.body;

    //required fields validation
    if (!title || !description || !location || !date || !category || !userEmail || !userName) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields: title, description, location, date, category, userEmail, userName' 
      });
    }

    //for photo evidence
    let photoEvidence = [];
    if (req.files && req.files.length > 0) {
      photoEvidence = req.files.map(file => ({
        filename: file.filename,
        path: file.path
      }));
    }

    // Create new incident report
    const newIncident = await Incident.create({
      userEmail,
      userName,
      title,
      description,
      location,
      date,
      status: 'Pending',
      category,
      priority: priority || 'low',
      photoEvidence,
      notifications: [{
        status: 'Pending',
        message: 'Your report has been submitted successfully'
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully. Admins will review it shortly.',
      data: newIncident
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating report',
      error: error.message 
    });
  }
};

//USER: Get their own reports
exports.getUserIncidents = async (req, res) => {
  try {
    const { userEmail } = req.params;
    
    if (!userEmail) {
      return res.status(400).json({ 
        success: false,
        message: 'User email is required' 
      });
    }

    const incidents = await Incident.find({ userEmail }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching reports',
      error: error.message 
    });
  }
};

//USER: Get their own report by ID
exports.getUserIncidentById = async (req, res) => {
  try {
    const { id, userEmail } = req.params;
    
    const incident = await Incident.findOne({ _id: id, userEmail });
    
    if (!incident) {
      return res.status(404).json({ 
        success: false,
        message: 'Report not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: incident
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching report',
      error: error.message 
    });
  }
};

//ADMIN: Get all reports
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching reports',
      error: error.message 
    });
  }
};

//ADMIN: get all pending reports
exports.getAllPendingIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ status: 'Pending' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending reports',
      error: error.message
    });
  }
};

//ADMIN: Get reports by status (Pending, Under Review, Resolved)
exports.getIncidentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    const validStatuses = ['Pending', 'Under Review', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status.' 
      });
    }

    const incidents = await Incident.find({ status }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      status,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching reports',
      error: error.message 
    });
  }
};

//ADMIN: Get report by ID
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ 
        success: false,
        message: 'Report not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: incident
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching report',
      error: error.message 
    });
  }
};

//ADMIN: Update report status and notify user
exports.updateIncident = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const validStatuses = ['Pending', 'Under Review', 'Resolved'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status.' 
      });
    }

    // Build notification message based on status
    let notificationMessage = '';
    if (status === 'Under Review') {
      notificationMessage = 'Your report is now under review.';
    } else if (status === 'Resolved') {
      notificationMessage = 'Your report has been resolved.';
    }

    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { 
        status: status || req.body.status,
        adminNotes: adminNotes || '',
        updatedAt: Date.now(),
        notified: true,
        $push: {
          notifications: {
            status: status || 'Updated',
            message: notificationMessage || adminNotes || 'Report updated'
          }
        }
      },
      { new: true, runValidators: true }
    );
    
    if (!incident) {
      return res.status(404).json({ 
        success: false,
        message: 'Report not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Report status updated to "${status}" and user has been notified`,
      data: incident
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating report',
      error: error.message 
    });
  }
};

//ADMIN: Delete report
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ 
        success: false,
        message: 'Report not found' 
      });
    }
    res.status(200).json({
      success: true,
      message: 'Report deleted successfully',
      data: incident
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting report',
      error: error.message 
    });
  }
};
