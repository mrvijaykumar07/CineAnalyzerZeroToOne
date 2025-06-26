'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('http://localhost:5000/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      if (!data.sentiment) throw new Error('No sentiment found in response');

      setResult(data);
    } catch (err) {
      setError(' Something went wrong. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl p-8 rounded-2xl">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-purple-400 tracking-widest">
          🎬 Movie Sentiment Analyzer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            rows="6"
            className="w-full p-4 bg-black/30 text-white border border-purple-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
            placeholder="✨ Drop your movie review here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full hover:from-pink-600 hover:to-purple-500 transition-all duration-300 ease-in-out disabled:opacity-50"
          >
            {loading ? '🎥 Analyzing...' : '🔍 Analyze Now'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center font-medium">{error}</div>
        )}

        {result && (
          <div className="mt-8 p-4 border-t border-purple-500">
            <h2 className="text-xl font-bold text-green-400">🎯 Sentiment: {result.sentiment}</h2>
            <p className="mt-2 text-gray-200 italic">{result.explanation}</p>
          </div>
        )}
      </div>
    </main>
  );
}
