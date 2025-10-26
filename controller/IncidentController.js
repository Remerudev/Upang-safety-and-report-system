const Incident = require('../model/IncidentModel');
const path = require('path');
const fs = require('fs');

//USER: Create report
exports.createIncident = async (req, res) => {
  try {
    const { title, description, location, date, priority, userEmail, userName } = req.body;

    //required fields validation
    if (!title || !description || !location || !date  || !userEmail || !userName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    //for photo evidence
    let photoEvidence = null;
    if (req.file) { 
      const uploadDir = path.join(__dirname, '..', 'uploads', 'incidents');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      
      
      const uploadPath = path.join(uploadDir, 'incident-' + Date.now() + "-" + req.file.originalname);
      fs.writeFileSync(uploadPath, req.file.buffer);
      photoEvidence = uploadPath; 
    }
    const newIncident = await Incident.create({
      userEmail,
      userName,
      title,
      description,
      location,
      date,
      status: 'Pending',
      priority: priority || 'low',
      photoEvidence, // FIXED: Now defined
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
//ADMIN: get all under review reports
exports.getAllUnderReviewIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ status: 'Under Review' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching under review reports',
      error: error.message
    });
  }
};

//admin: get all resolved reports
exports.getAllResolvedIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ status: 'Resolved' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resolved reports',
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


// ADMIN: Update report status, assign team/staff, and notify user
exports.updateIncident = async (req, res) => {
  try {
    const { status, assignedTeam, assignedStaff, adminNotes } = req.body;
    
    // ✅ Initialize variables
    const updateData = {};
    const notificationMessages = [];

    // ✅ Validate status
    const validStatuses = ['Pending', 'Under Review', 'Resolved'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status.' 
      });
    }

    // ✅ Validate team
    const validTeams = [ 'Maintenance',  'IClean', 'Unassigned'];
    if (assignedTeam && !validTeams.includes(assignedTeam)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid team assignment.' 
      });
    }

    // ✅ Assign team if provided
    if (assignedTeam) {
      updateData.assignedTeam = assignedTeam;
      if (assignedTeam !== 'Unassigned') {
        notificationMessages.push(`Your report has been assigned to ${assignedTeam}.`);
      }
    }

    // ✅ Add status updates
    if (status) {
      updateData.status = status;
    }

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    updateData.updatedAt = Date.now();
    updateData.notified = true;

    // Build notification message
    let notificationMessage = '';
    if (status === 'Under Review') {
      notificationMessage = 'Your report is now under review.';
    } else if (status === 'Resolved') {
      notificationMessage = 'Your report has been resolved.';
    }

    //heto para ma execute yung update
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { 
        ...updateData,
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
      message: `Report status updated and user has been notified.`,
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

//ADMIN: get all low priority reports
exports.getAllLowPriorityIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ priority: 'low' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching low priority reports',
      error: error.message
    });
  }
    };
    
//ADMIN: get all medium priority reports
exports.getAllMediumPriorityIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ priority: 'medium' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medium priority reports',
      error: error.message
    });
  }
  };

//ADMIN: get all high priority reports
exports.getAllHighPriorityIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ priority: 'high' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching high priority reports',
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
