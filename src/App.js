import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="container-app">
      <nav className="app-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <span className="brand-icon">🏢</span>
            <span className="brand-text">منصة الحجز</span>
          </div>
          <div className="nav-buttons">
            <button 
              className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              📊 لوحة التحكم
            </button>
            <button 
              className={`nav-btn ${currentPage === 'tables' ? 'active' : ''}`}
              onClick={() => setCurrentPage('tables')}
            >
              📋 الجداول
            </button>
          </div>
        </div>
      </nav>

      <div className="page-content">
        {currentPage === 'dashboard' ? <Dashboard /> : <DataTable />}
      </div>
    </div>
  );
}

export default App;
