const express = require('express');
const router = express.Router();
const IncidentController = require('../controller/IncidentController');

router.post('/incidents', IncidentController.createIncident);
