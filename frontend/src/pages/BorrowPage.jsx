import React, { useState } from 'react';

const BorrowPage = () => {
  // Controlled Input States using useState
  const [memberName, setMemberName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Form submission feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Format date helper for live summary preview
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not selected';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle Form Submission (POST /api/v1/borrowings)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      setFeedback({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback(null);

      const response = await fetch('/api/v1/borrowings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memberName,
          bookTitle,
          borrowDate,
          returnDate
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFeedback({
          type: 'success',
          message: `Success! Borrowing record created for "${bookTitle}".`
        });
        // Reset form
        setMemberName('');
        setBookTitle('');
        setBorrowDate('');
        setReturnDate('');
      } else {
        throw new Error(result.message || 'Failed to create borrowing record');
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Server error occurred while creating record'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="borrow-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Borrow a Book</h1>
        <p>Complete the form below to register a book borrowing transaction.</p>
      </div>

      {/* Feedback Alerts */}
      {feedback && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {feedback.message}
        </div>
      )}

      <div className="borrow-layout">
        {/* Borrow Form Column */}
        <div className="form-card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Borrowing Request Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="memberName">Member Name *</label>
              <input
                type="text"
                id="memberName"
                className="form-control"
                placeholder="e.g. Riddhi Odedra"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bookTitle">Book Title *</label>
              <input
                type="text"
                id="bookTitle"
                className="form-control"
                placeholder="e.g. Database System Concepts"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="borrowDate">Borrow Date *</label>
              <input
                type="date"
                id="borrowDate"
                className="form-control"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="returnDate">Return Date *</label>
              <input
                type="date"
                id="returnDate"
                className="form-control"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Record...' : 'Confirm Borrowing'}
            </button>
          </form>
        </div>

        {/* Live State Borrow Summary Column */}
        <div className="summary-card">
          <h2 className="summary-title">Borrow Summary</h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
            Real-time preview powered by React controlled state (<code>useState</code>).
          </p>

          <div className="summary-item">
            <label>Member Name</label>
            <value>{memberName || 'Not entered yet'}</value>
          </div>

          <div className="summary-item">
            <label>Book Title</label>
            <value>{bookTitle || 'Not entered yet'}</value>
          </div>

          <div className="summary-item">
            <label>Borrow Date</label>
            <value>{formatDate(borrowDate)}</value>
          </div>

          <div className="summary-item">
            <label>Return Date</label>
            <value>{formatDate(returnDate)}</value>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowPage;
