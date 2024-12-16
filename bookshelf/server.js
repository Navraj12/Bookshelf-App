import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bookshelf')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Schema and Model
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    publishedYear: Number,
});

const Book = mongoose.model('Book', bookSchema);

// CRUD Routes
// Create
app.post('/api/books', async(req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read
app.get('/api/books', async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update
app.put('/api/books/:id', async(req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete
app.delete('/api/books/:id', async(req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));