const Request = require('../models/Request');
const Book = require('../models/Book');

class RequestController {
  async createRequest(req, res) {
    try {
      const { bookId, userId, priority = 1 } = req.body;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      const request = new Request({
        book: bookId,
        user: userId,
        status: book.availableCount > 0 ? 'APPROVED' : 'PENDING',
        priority
      });

      if (request.status === 'APPROVED') {
        book.availableCount--;
        await book.save();
      }

      await request.save();

      res.status(201).json({
        message: 'Request created successfully',
        request,
        status: request.status
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Request creation failed',
        error: error.message 
      });
    }
  }
  async getUserRequests(req, res) {
    try {
      const requests = await Request.find({ user: req.user.userId })
        .populate('book')
        .sort({ createdAt: -1 });
      
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        message: 'Failed to retrieve requests',
        error: error.message 
      });
    }
  }

  async updateRequestStatus(req, res) {
    try {
      const { requestId } = req.params;
      const { status } = req.body;

      const request = await Request.findByIdAndUpdate(
        requestId, 
        { status }, 
        { new: true }
      ).populate('book');

      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      if (status === 'APPROVED') {
        const book = request.book;
        book.availableCount--;
        await book.save();
      }

      res.json({
        message: 'Request status updated',
        request
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Failed to update request status',
        error: error.message 
      });
    }
  }
  async processPendingRequests(req, res) {
    try {
      const pendingRequests = await Request.find({ status: 'PENDING' })
        .populate('book')
        .sort({ priority: -1, createdAt: 1 });

      const processedRequests = [];

      for (let request of pendingRequests) {
        const book = request.book;
        
        if (book.availableCount > 0) {
          book.availableCount--;
          await book.save();

          request.status = 'APPROVED';
          await request.save();

          processedRequests.push(request);
        }
      }

      res.json({
        message: 'Pending requests processed',
        processedRequests
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Failed to process pending requests',
        error: error.message 
      });
    }
  }
}

module.exports = new RequestController();
