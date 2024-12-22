const Book = require('../models/Book');
const BinarySearchTree = require('../utils/bookSearch');

const bst = new BinarySearchTree(); 
exports.addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    
    const savedBook = await newBook.save();
    
    bst.insert(savedBook);
    
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    books.sort((a, b) => b.popularity - a.popularity || b.availableCount - a.availableCount);

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookPopularity = async (req, res) => {
   try {
     const updatedBook = await Book.findByIdAndUpdate(
       req.params.id,
       { $inc: { popularity: 1 } }, 
       { new: true }
     );

     if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

 
     bst.delete(updatedBook.title); 
     bst.insert(updatedBook); 

     res.json(updatedBook);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
};

exports.updateBook = async (req, res) => {
   try {
     const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
     
     if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
     bst.delete(updatedBook.title); 
     bst.insert(updatedBook); 

     res.json(updatedBook);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
};

exports.deleteBook = async (req, res) => {
   try {
     const deletedBook = await Book.findByIdAndDelete(req.params.id);

     if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

     bst.delete(deletedBook.title); 

     res.json({ message: 'Book deleted successfully' });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};
