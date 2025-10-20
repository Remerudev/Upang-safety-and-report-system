const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  reportnumber: { type: String, required: false, unique: true },
  Username: { type: String, required: false },
  UserEmail: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: [true, 'Please select a category'], 
    enum: ['harassment', 'environment', 'safety', 'security issues', 
      'property damage', 'equipment malfunction', 'others']
  },
  location: { type: String, required: [true, 'Please provide a location'], enum: ['PTC Building', 'CHS Building', 'BASIC ED Building',
    'Student Plaza', 'Gymnasium', 'Phinma Garden', 'CMA Building', 'FVR Building', 'MBA Building', 'River Side Building', 'Parking Lot', 'Others']
  },
  priority: { 
    type: String, 
    required: [true], 
    enum: ['low', 'medium', 'high'], 
    default: 'low' 
  },
  Photoevidence: { type: [String] },
  status: { 
    type: String, 
    default: 'Submitted', 
    enum: ['Submitted', 'Pending', 'In progress', 'Resolved'] 
  },
  createdAt: { type: Date, default: Date.now },
});

IncidentSchema.pre('save', async function(next) {
  if (!this.reportnumber) {
    const count = await mongoose.model('Incident').countDocuments();
    this.reportnumber = `RPT-${Date.now()}-${count + 1}`;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Incident', IncidentSchema);