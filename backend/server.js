const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const requestLogger = require('./middleware/requestLogger');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// 1. APPLY REQUEST LOGGER MIDDLEWARE GLOBALLY
app.use(requestLogger);

// Sample In-Memory Seed Data (Used for MongoDB initial seeding & fallback)
const sampleBooks = [
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Technology',
    isbn: '978-0132350884',
    available: true
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    category: 'Software Engineering',
    isbn: '978-0201616224',
    available: true
  },
  {
    title: 'Database System Concepts',
    author: 'Abraham Silberschatz',
    category: 'Database Management',
    isbn: '978-0073523323',
    available: false
  },
  {
    title: 'Computer Networks',
    author: 'Andrew S. Tanenbaum',
    category: 'Networking',
    isbn: '978-0132126953',
    available: true
  },
  {
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell & Peter Norvig',
    category: 'Artificial Intelligence',
    isbn: '978-0134610993',
    available: true
  },
  {
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz',
    category: 'Operating Systems',
    isbn: '978-1118063330',
    available: false
  }
];

let inMemoryBorrowings = [
  {
    _id: 'b1',
    memberName: 'Riddhi Patel',
    bookTitle: 'Database System Concepts',
    borrowDate: '2026-08-15',
    returnDate: '2026-08-22',
    status: 'borrowed'
  },
  {
    _id: 'b2',
    memberName: 'Aarav Sharma',
    bookTitle: 'Operating System Concepts',
    borrowDate: '2026-08-10',
    returnDate: '2026-08-17',
    status: 'borrowed'
  }
];

let isDbConnected = false;

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/shelfspace';

mongoose
  .connect(mongoUri)
  .then(async () => {
    isDbConnected = true;
    console.log('✅ Connected successfully to MongoDB:', mongoUri);
    
    // Seed initial books if database collection is empty
    try {
      const count = await Book.countDocuments();
      if (count === 0) {
        await Book.insertMany(sampleBooks);
        console.log('🌱 Initial sample books seeded into MongoDB');
      }
    } catch (seedErr) {
      console.error('Error seeding initial books:', seedErr.message);
    }
  })
  .catch((err) => {
    isDbConnected = false;
    console.log('⚠️ MongoDB connection warning:', err.message);
    console.log('ℹ️ Running in hybrid mode: Serving initial sample data while MongoDB is offline.');
  });

// API ROUTES

/**
 * GET /api/v1/books
 * Purpose: Return all books
 * Status: 200
 */
app.get('/api/v1/books', async (req, res, next) => {
  try {
    if (isDbConnected) {
      const books = await Book.find({});
      return res.status(200).json({
        success: true,
        count: books.length,
        data: books
      });
    }

    // Fallback if DB not connected
    return res.status(200).json({
      success: true,
      count: sampleBooks.length,
      data: sampleBooks
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/borrowings
 * Purpose: Return all borrowing records
 * Status: 200
 */
app.get('/api/v1/borrowings', async (req, res, next) => {
  try {
    if (isDbConnected) {
      const borrowings = await Borrowing.find()
        .populate('memberId', 'name email department')
        .populate('bookId', 'title author category');
      return res.status(200).json({
        success: true,
        count: borrowings.length,
        data: borrowings
      });
    }

    // Fallback if DB not connected
    return res.status(200).json({
      success: true,
      count: inMemoryBorrowings.length,
      data: inMemoryBorrowings
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/borrowings
 * Purpose: Create a new borrowing record
 * Status: 201
 */
app.post('/api/v1/borrowings', async (req, res, next) => {
  try {
    const { memberName, bookTitle, borrowDate, returnDate, memberEmail, department } = req.body;

    // Validate essential fields
    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      const err = new Error('Please provide memberName, bookTitle, borrowDate, and returnDate');
      err.statusCode = 400;
      return next(err);
    }

    if (isDbConnected) {
      // Find or create Member
      let member = await Member.findOne({ name: memberName });
      if (!member) {
        member = await Member.create({
          name: memberName,
          email: memberEmail || `${memberName.toLowerCase().replace(/\s+/g, '.')}@college.edu`,
          department: department || 'Computer Science'
        });
      }

      // Find Book
      let book = await Book.findOne({ title: new RegExp(`^${bookTitle}$`, 'i') });
      if (!book) {
        // If book doesn't exist, create a temporary record for demo
        book = await Book.create({
          title: bookTitle,
          author: 'Unknown Author',
          category: 'General Library',
          isbn: `ISBN-${Date.now()}`,
          available: false
        });
      }

      // Create Borrowing record in MongoDB using Mongoose schema validation
      const borrowing = await Borrowing.create({
        memberId: member._id,
        bookId: book._id,
        borrowDate: new Date(borrowDate),
        returnDate: new Date(returnDate),
        status: 'borrowed'
      });

      return res.status(201).json({
        success: true,
        message: 'Borrowing record created successfully',
        data: {
          _id: borrowing._id,
          memberName: member.name,
          bookTitle: book.title,
          borrowDate,
          returnDate,
          status: borrowing.status
        }
      });
    }

    // In-memory addition
    const newRecord = {
      _id: `b${Date.now()}`,
      memberName,
      bookTitle,
      borrowDate,
      returnDate,
      status: 'borrowed'
    };
    inMemoryBorrowings.unshift(newRecord);

    return res.status(201).json({
      success: true,
      message: 'Borrowing record created successfully',
      data: newRecord
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/test-validation
 * Purpose: Demonstrate Mongoose Schema Validation failure for Viva
 * For example sending status: 'pending' (which fails because enum requires 'borrowed', 'returned', or 'overdue')
 */
app.post('/api/v1/test-validation', async (req, res, next) => {
  try {
    const { status, testField } = req.body;

    // Intentionally run Mongoose document validation
    const testDoc = new Borrowing({
      memberId: new mongoose.Types.ObjectId(),
      bookId: new mongoose.Types.ObjectId(),
      borrowDate: new Date(),
      returnDate: new Date(),
      status: status || 'pending' // 'pending' will trigger validation error!
    });

    await testDoc.validate();

    res.status(200).json({
      success: true,
      message: 'Validation passed successfully',
      data: testDoc
    });
  } catch (error) {
    next(error);
  }
});

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ShelfSpace College Library API',
    endpoints: {
      books: 'GET /api/v1/books',
      borrowings: 'GET /api/v1/borrowings',
      createBorrowing: 'POST /api/v1/borrowings',
      testValidation: 'POST /api/v1/test-validation'
    }
  });
});

// 2. GLOBAL ERROR HANDLING MIDDLEWARE (MUST BE LAST)
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Handle Mongoose Validation Errors gracefully
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((el) => el.message);
    message = `Validation Failed: ${errors.join(', ')}`;
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered (Unique constraint failure)';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field: ${err.path}`;
  }

  // Return clean, structured JSON without exposing internal stack trace
  res.status(statusCode).json({
    success: false,
    message: message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ShelfSpace Server running on http://localhost:${PORT}`);
});
