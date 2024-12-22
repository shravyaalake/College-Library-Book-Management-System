const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { 
  adminMiddleware, 
  studentMiddleware 
} = require('../middleware/authMiddleware');
const { 
  validateBookRequest, 
  validateRequestStatusUpdate 
} = require('../middleware/requestvalidationMiddleware');

router.post(
  '/create', 
  studentMiddleware,  
  validateBookRequest,  
  requestController.createRequest
);

router.get(
  '/my-requests', 
  studentMiddleware,  
  requestController.getUserRequests
);

router.put(
  '/:requestId/status', 
  adminMiddleware,  
  validateRequestStatusUpdate,  
  requestController.updateRequestStatus
);

router.post(
  '/process-pending', 
  adminMiddleware, 
  requestController.processPendingRequests
);

module.exports = router;
