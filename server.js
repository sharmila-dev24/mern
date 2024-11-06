const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/flashcards')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Flashcard Schema and Model
const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// API Routes
app.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.post('/flashcards', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newFlashcard = new Flashcard({ question, answer });
    await newFlashcard.save();
    res.status(201).send('Flashcard created');
  } catch (err) {
    res.status(500).send('Error creating flashcard');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
