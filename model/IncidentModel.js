const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    reportnumber: {type: String, unique: true},
    title: {type: String, required: [true, 'Please select a category'], enum: [ 'property damage', ' missing equipment', 'equipment malfunction', '']},
    description:{type: String, required: true},
    location: {type: String, required: [true, 'Please provide a location'], enum:['PTC Building', 'CHS Building', 'BASIC ED Building', 'Student Plaza',
      'Gym', 'Phinma Garden', 'CMA Building', 'FVR Building', 'MBA Building', 'River Side Building', 'NH Building', 'parking lot', 'others']},
    priority:{type: String, required: [true] , enum: ['low', 'medium', 'high'], default: 'low'},
     photoEvidence: [{  filename: String, path: String}],
    status:{type: String, default: 'Pending', enum: ['Pending', 'Under Review', 'Resolved']},
    createdAt: {type: Date, default: Date.now},
    date: {type: Date, required: true},
    assignedTeam: {type: String, enum: ['Maintenance','IClean']}
});


// Auto-generate report number
IncidentSchema.pre('save', async function (next) {
  if (!this.reportnumber) {
    const count = await mongoose.model('Incident').countDocuments();
    this.reportnumber = `RPT-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Incident', IncidentSchema);