const express = require('express');
const router = express.Router();
const IncidentController = require('../controller/IncidentController');


// User creates a report
router.post("/user/report", IncidentController.createIncident);
// User gets their own reports
router.get("/user/:userEmail", IncidentController.getUserIncidents);
// User gets specific report with notification history
router.get("/user/:userEmail/:id", IncidentController.getUserIncidentById);
// Admin gets all reports
router.get("/admin/all", IncidentController.getAllIncidents);
// Admin gets reports by status (Pending, Under Review, Resolved)
router.get("/admin/status/:status", IncidentController.getIncidentsByStatus);
//admiin get all pending reports
router.get("/admin/pending", IncidentController.getAllPendingIncidents);
// Admin gets specific report details
router.get("/admin/:id", IncidentController.getIncidentById);
// Admin updates report status and notifies user
router.put("/admin/:id", IncidentController.updateIncident);
// Admin deletes report
router.delete("/admin/:id", IncidentController.deleteIncident);

module.exports = router;