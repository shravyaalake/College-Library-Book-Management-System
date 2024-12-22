const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); 
const { authMiddleware, adminMiddleware, studentMiddleware } = require('../middleware/authMiddleware'); 

router.post('/add', adminMiddleware, bookController.addBook); 

router.get('/', bookController.getAllBooks); 

router.get('/:id', bookController.getBookById); 

router.put('/:id', adminMiddleware, bookController.updateBook); 

router.delete('/:id', adminMiddleware, bookController.deleteBook); 

module.exports = router;
