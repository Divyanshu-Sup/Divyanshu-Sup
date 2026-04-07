const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// ADD book
router.post('/books', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: "Book Added" });
});

// SEARCH book
router.get('/books/search', async (req, res) => {
    const q = req.query.q;

    const books = await Book.find({
        title: { $regex: q, $options: 'i' }
    });

    res.json(books);
});

module.exports = router;

const Issue = require('../models/Issue');

// Issue book
router.post('/issue', async (req, res) => {
    const issue = new Issue({
        user: req.body.userId,
        book: req.body.bookId
    });
    await issue.save();
    res.send("Book Issued");
});

// Return book
router.post('/return', async (req, res) => {
    await Issue.findByIdAndUpdate(req.body.issueId, {
        returned: true
    });
    res.send("Book Returned");
});

// Get issued books
router.get('/issued/:userId', async (req, res) => {
    const data = await Issue.find({ user: req.params.userId })
        .populate('book');
    res.json(data);
});