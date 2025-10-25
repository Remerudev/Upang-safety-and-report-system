const express = require('express');
const router = express.Router();
const multer = require('multer');
const IncidentController = require('../controller/IncidentController');

const upload = multer({ dest: 'uploads/' });
router.post('/', upload.array('files'), IncidentController.createIncident);
router.get('/', IncidentController.getUserIncidents);
router.put("/:id", IncidentController.updateIncident);
router.get('/admin/all', IncidentController.getAllIncidents);
router.delete("/admin/:id", IncidentController.deleteIncident);
/*
router.get("/user/:userEmail/:id", IncidentController.getUserIncidentById);
router.get("/admin/pending", IncidentController.getAllPendingIncidents);
router.get("/admin/under-review", IncidentController.getAllUnderReviewIncidents);
router.get("/admin/resolved", IncidentController.getAllResolvedIncidents);
router.get("/admin/:id", IncidentController.getIncidentById);
*/

module.exports = router;