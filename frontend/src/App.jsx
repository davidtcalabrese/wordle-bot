import React, { useState, useMemo } from 'react';
import './App.css';

const LetterTile = ({ letter, status, onClick }) => {
    const statusClass = status || 'empty';
    return (
        <button
            type="button"
            onClick={onClick}
            className={`letter-tile ${statusClass}`}
        >
            {letter}
        </button>
    );
};

const Suggestions = ({ suggestions, isLoading, error }) => {
    if (error) {
        return <div className="error-message">{error}</div>;
    }
    if (isLoading) {
        return <div className="loading-message">Loading suggestions...</div>;
    }
    if (suggestions.length === 0) {
        return (
            <div className="suggestions-container">
                No matches in word list.
            </div>
        )
    }
    return (
        <div className="suggestions-container">
            <h2 className="suggestions-title">Top Suggestions:</h2>
            <div className="suggestions-grid">
                {suggestions.slice(0, 10).map((word, index) => (
                    <div key={index} className="suggestion-item">
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function App() {
    const [word, setWord] = useState('');
    const [statuses, setStatuses] = useState(Array(5).fill('incorrect'));
    const [absentLetters, setAbsentLetters] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const letters = useMemo(() => {
        return word.toUpperCase().padEnd(5, ' ').split('');
    }, [word]);

    const handleStatusClick = (index) => {
        const nextStatus = {
            incorrect: 'valid',
            valid: 'correct',
            correct: 'incorrect',
        };
        const newStatuses = [...statuses];
        newStatuses[index] = nextStatus[newStatuses[index]];
        setStatuses(newStatuses);
    };

    const handleWordChange = (e) => {
        const newWord = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 5);
        setWord(newWord);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (word.length !== 5) {
            setError('Please enter a 5-letter word.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuggestions([]);

        const payload = {
            guessedWord: word.toLowerCase(),
            letterStatuses: statuses,
            absentLetters: absentLetters.toLowerCase().split(''),
        };

        try {
            const response = await fetch('http://localhost:5001/api/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errData = await response.json();
                console.error(errData.error || `HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setSuggestions(data);
        } catch (err) {
            console.error("Failed to fetch suggestions:", err);
            setError(err.message || "Failed to connect to the backend. Is it running?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <div className="header">
                    <h1 className="title">Wordle Solver</h1>
                    <p className="subtitle">Enter your guess and tap the letters to set their status.</p>
                </div>

                <form onSubmit={handleSubmit} className="form-section-large-margin">
                    <div className="form-section">
                        <label htmlFor="word-input" className="label">Guessed Word</label>
                        <input
                            id="word-input"
                            type="text"
                            value={word}
                            onChange={handleWordChange}
                            className="word-input"
                            placeholder="e.g. CRANE"
                            maxLength="5"
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="absent-letters-input" className="label">Absent Letters (Gray)</label>
                        <input
                            id="absent-letters-input"
                            type="text"
                            value={absentLetters}
                            onChange={(e) => setAbsentLetters(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                            className="absent-letters-input"
                            placeholder="e.g., qwy"
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-section">
                        <label className="label">Letter Status (Tap to change)</label>
                        <div className="letter-tiles-container">
                            {letters.map((letter, index) => (
                                <LetterTile
                                    key={index}
                                    letter={letter}
                                    status={word.length === 5 ? statuses[index] : 'empty'}
                                    onClick={() => word.length === 5 && handleStatusClick(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-section-large-margin">
                        <button
                            type="submit"
                            disabled={isLoading || word.length !== 5}
                            className="submit-button"
                        >
                            {isLoading ? 'Analyzing...' : 'Get Suggestions'}
                        </button>
                    </div>
                </form>

                <Suggestions suggestions={suggestions} isLoading={isLoading} error={error} />
            </main>
        </div>
    );
}
