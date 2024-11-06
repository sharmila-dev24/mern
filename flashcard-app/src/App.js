import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then(res => setFlashcards(res.data))
      .catch(err => console.error(err));
  }, []);

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="App">
      <h1>Flashcard Quiz App</h1>

      {flashcards.length > 0 && (
        <div className="flashcard">
          <h2>{flashcards[currentCardIndex].question}</h2>
          {showAnswer && <p>{flashcards[currentCardIndex].answer}</p>}
          <button onClick={toggleAnswer}>
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          <br />
          <button onClick={nextCard}>Next Card</button>
        </div>
      )}
    </div>
  );
}

export default App;
