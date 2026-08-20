import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">Digital Catalog</span>
          <h1 className="hero-title">A smarter way to manage your library.</h1>
          <p className="hero-text">
            Explore books, check availability, and manage borrowing records through a simple digital library system.
          </p>
          <div className="hero-actions">
            <Link to="/books" className="btn btn-primary">
              Explore Books
            </Link>
            <Link to="/borrow" className="btn btn-secondary">
              Borrow a Book
            </Link>
          </div>
        </div>

        {/* Minimal Academic Graphic */}
        <div className="hero-illustration">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8V9zm0-3h8v2h-8V6zm0 6h5v2h-5v-2z"/>
          </svg>
        </div>
      </section>

      {/* Information / Feature Section */}
      <section className="features-section">
        <h2 className="section-title">System Overview</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3>Browse Books</h3>
            <p>Explore available books, categories, and author details in the digital catalog.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3>Easy Borrowing</h3>
            <p>Enter member and borrowing information through a simple, live-preview form.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3>Clear Availability</h3>
            <p>Quickly understand which books are currently available or borrowed.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
