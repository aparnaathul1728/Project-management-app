const express = require('express');
const router = express.Router();
const timesheetController = require('../controllers/timesheetController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, timesheetController.createTimesheet);
router.get('/:id', authMiddleware, timesheetController.getTimesheetById);
router.get('/', authMiddleware, timesheetController.getAllTimesheets);
router.put('/:id', authMiddleware, timesheetController.updateTimesheet);
router.delete('/:id', authMiddleware, timesheetController.deleteTimesheet);

module.exports = router;
