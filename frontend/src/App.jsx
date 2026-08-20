import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BorrowPage from './pages/BorrowPage';

function App() {
  return (
    <div className="app-container">
      {/* Reusable Navigation Header */}
      <Navbar />

      {/* Main Content Area Routing */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/borrow" element={<BorrowPage />} />
        </Routes>
      </main>

      {/* Academic Footer */}
      <footer className="footer">
        <p> ~ Riddhi Odedra</p>
      </footer>
    </div>
  );
}

export default App;
