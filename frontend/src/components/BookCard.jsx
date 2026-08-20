import React from 'react';

/**
 * Reusable BookCard component
 * @param {Object} props
 * @param {string} props.title - Book Title
 * @param {string} props.author - Author Name
 * @param {string} props.category - Book Category
 * @param {boolean} props.available - Availability Status
 */
const BookCard = ({ title, author, category, available }) => {
  return (
    <div className="book-card">
      <div>
        <div className="book-header">
          <h3 className="book-title">{title}</h3>
        </div>
        <p className="book-author">by {author}</p>
      </div>

      <div className="book-meta">
        <span className="book-category">{category}</span>
        
        {/* Visual Badge for Availability */}
        <span className={`badge ${available ? 'badge-available' : 'badge-unavailable'}`}>
          <span className="dot">•</span> {available ? 'Available' : 'Not Available'}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
