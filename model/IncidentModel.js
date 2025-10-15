const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    reportnumber: {type: String, required: true, unique: true},
    Username: {type: String, required: true},
    title: {type: String, required: true},
    description:{type: String, required: true},
    category:{type: String, required: [true, 'Please select a category'], enum: ['harrasment', 'environment', 'safety', 'security issues', 
        'property damage', 'equipment malfunction', 'others']},
    location: {type: String, required: true},
    priority:{type: String, required: [true] , enum: ['low', 'medium', 'high'], default: 'low'},
    Photoevidence: {type: [String]},
    status:{type: String, default: 'Pending', enum: ['Pending', 'In progress', 'Resolved']},
    createdAt: {type: Date, default: Date.now},
});
//auto generate report number and update timestamp
incidentSchema.pre('save', async function(next) {
  if (!this.reportNumber) {
    const count = await mongoose.model('Incident').countDocuments();
    this.reportNumber = `RPT-${Date.now()}-${count + 1}`;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Incident', IncidentSchema);