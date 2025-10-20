const express = require('express');
const router = express.Router();
const multer = require('multer');
const IncidentController = require('../controller/IncidentController');

const upload = multer({ dest: 'uploads/' });
// Creating incidents supports optional auth: controller will use req.user when present
router.post('/', upload.array('files'), IncidentController.createIncident);
router.get('/', IncidentController.getUserIncidents);

/*
router.get("/user/:userEmail/:id", IncidentController.getUserIncidentById);
router.get("/admin/all", IncidentController.getAllIncidents);
router.get("/admin/pending", IncidentController.getAllPendingIncidents);
router.get("/admin/under-review", IncidentController.getAllUnderReviewIncidents);
router.get("/admin/resolved", IncidentController.getAllResolvedIncidents);
router.get("/admin/:id", IncidentController.getIncidentById);
router.put("/admin/:id", IncidentController.updateIncident);
router.delete("/admin/:id", IncidentController.deleteIncident);
*/

module.exports = router;