import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  // Task 4: Explicit State Management (data, loading, error)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from API on component mount using useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/v1/books');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch books (Status ${response.status})`);
        }

        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          throw new Error(result.message || 'Malformed API response');
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message || 'Unable to connect to backend server');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="books-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Explore the Collection</h1>
        <p>Browse books currently registered in the college library.</p>
        {!loading && !error && (
          <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: '600', marginTop: '0.25rem', display: 'inline-block' }}>
            Showing {data.length} registered {data.length === 1 ? 'book' : 'books'}
          </span>
        )}
      </div>

      {/* 1. Loading State */}
      {loading && (
        <div className="state-box">
          <div className="spinner"></div>
          <h3>Opening the library...</h3>
          <p>Fetching book catalog from server...</p>
        </div>
      )}

      {/* 2. Error State */}
      {!loading && error && (
        <div className="state-box">
          <div style={{ color: 'var(--error-red)', fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h3 style={{ color: 'var(--error-red)' }}>Unable to load books</h3>
          <p style={{ marginTop: '0.5rem' }}>
            Please check whether the backend server is running on <code>http://localhost:5000</code> and try again.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Error details: {error}
          </p>
          <button 
            className="btn btn-primary" 
            style={{ marginTop: '1.25rem' }}
            onClick={() => window.location.reload()}
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* 3. Empty State */}
      {!loading && !error && data.length === 0 && (
        <div className="state-box">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📚</div>
          <h3>No books found</h3>
          <p>The library catalog is currently empty.</p>
        </div>
      )}

      {/* 4. Data Display State */}
      {!loading && !error && data.length > 0 && (
        <div className="books-grid">
          {data.map((book, index) => (
            <BookCard
              key={book._id || book.isbn || index}
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
