const Incident = require('../model/IncidentModel');
const mongoose = require('mongoose');

//Create report
exports.createIncident = async (req, res) => {
    try{
        const{ title, description, location, date, status } = req.body;

        //required fields
        if(!title || !description || !location || !date){
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }
        //for photo evidence
    let photoEvidence = [];
    if (req.files && req.files.length > 0) {
      photoEvidence = req.files.map(file => ({
        filename: file.filename,
        path: file.path
      }));
    }
    const Incident = await Incident.create({
        Username: req.user.Username,
        title,
        description,
        location,
        date,
        status,
        photoEvidence
    });
    res.status(201).json({
        success: true,
        message: 'Report created successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};