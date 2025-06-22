import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual Gemini API key
  const API_KEY = 'AIzaSyDxCXr_6nooDo82WtpgE4kQOF0E3wj2YCI'; 
 

  const generateInsights = async () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setLoading(true);
    setError(null);
    setInsights('');

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Provide interesting insights about the name "${name}". 
      Include meaning, origin, famous people with this name, and any cultural significance. 
      Keep it concise but informative (about 150 words).`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setInsights(text);
    } catch (err) {
      setError('Failed to fetch insights. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateInsights();
  };

  return (
    <div className="app">
      <h1>Name Insights Generator</h1>
      <h1>Made by Gaurav Dotiyal Using Gemini API</h1>
      <p>Discover interesting facts about any name!</p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Get Insights'}
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Loading insights...</div>}

      {insights && (
        <div className="insights">
          <h2>Insights about {name}</h2>
          <p>{insights}</p>
        </div>
      )}
    </div>
  );
}

export default App;