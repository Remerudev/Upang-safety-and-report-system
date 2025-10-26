const express = require('express');
const router = express.Router();
const IncidentController = require('../controller/IncidentController');
const upload = require('../utils/upload');

// User routes
router.post("/user/report", upload.array('PhotoEvidence', 3), IncidentController.createIncident); //user create report
router.get("/user/:userEmail/:id", IncidentController.getUserIncidentById); //user get their report by ID
router.get("/user/:userEmail", IncidentController.getUserIncidents); //user get their reports

// Admin routes - SPECIFIC routes BEFORE generic routes with :id
router.get("/admin/all", IncidentController.getAllIncidents); //admin get all reports
router.get("/admin/pending", IncidentController.getAllPendingIncidents); //admin get all pending reports
router.get("/admin/under-review", IncidentController.getAllUnderReviewIncidents); //admin get all under review reports
router.get("/admin/resolved", IncidentController.getAllResolvedIncidents); //admin get all resolved reports
router.get("/admin/low-priority", IncidentController.getAllLowPriorityIncidents); //admin get all low priority reports
router.get("/admin/medium-priority", IncidentController.getAllMediumPriorityIncidents); //admin get all medium priority reports
router.get("/admin/high-priority", IncidentController.getAllHighPriorityIncidents); //admin get all high priority reports

// Generic admin routes AFTER specific ones
router.get("/admin/:id", IncidentController.getIncidentById); //admin get report by ID
router.put("/admin/:id/assignedTeam", IncidentController.updateIncident); //admin update report status & notify user
router.delete("/admin/:id", IncidentController.deleteIncident); //admin delete report


module.exports = router;