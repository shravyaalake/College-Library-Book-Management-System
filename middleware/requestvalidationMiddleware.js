const { body, param, validationResult } = require('express-validator');

const validateBookRequest = [
  body('bookId')
    .notEmpty()
    .withMessage('Book ID is required')
    .isMongoId()
    .withMessage('Invalid Book ID'),
  
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid User ID'),
  
  body('priority')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Priority must be between 1 and 5'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array(),
        message: 'Validation failed' 
      });
    }
    next();
  }
];

const validateRequestStatusUpdate = [
  param('requestId')
    .notEmpty()
    .withMessage('Request ID is required')
    .isMongoId()
    .withMessage('Invalid Request ID'),
  
  body('status')
    .isIn(['PENDING', 'APPROVED', 'REJECTED'])
    .withMessage('Invalid request status'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array(),
        message: 'Validation failed' 
      });
    }
    next();
  }
];

module.exports = {
  validateBookRequest,
  validateRequestStatusUpdate
};
