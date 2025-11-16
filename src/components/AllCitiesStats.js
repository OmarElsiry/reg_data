import React, { useState } from 'react';
import './AllCitiesStats.css';
import { citiesWithDetails, totalStats } from '../data/allCitiesData';

const AllCitiesStats = () => {
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('city');

  const filteredCities = citiesWithDetails.filter(city =>
    city.city.toLowerCase().includes(searchText.toLowerCase()) ||
    city.projects.some(p => p.toLowerCase().includes(searchText.toLowerCase()))
  );

  const sortedCities = [...filteredCities].sort((a, b) => {
    switch(sortBy) {
      case 'units':
        return b.units - a.units;
      case 'buildings':
        return b.buildings - a.buildings;
      case 'price':
        return b.pricePerMeter - a.pricePerMeter;
      default:
        return a.city.localeCompare(b.city, 'ar');
    }
  });

  return (
    <div className="all-cities-wrapper">
      <div className="stats-header">
        <div className="total-stats">
          <div className="stat-box">
            <span className="stat-label">إجمالي المدن</span>
            <span className="stat-value">{totalStats.totalCities}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">إجمالي المشاريع</span>
            <span className="stat-value">{totalStats.totalProjects}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">إجمالي العمارات</span>
            <span className="stat-value">{totalStats.totalBuildings}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">إجمالي الوحدات</span>
            <span className="stat-value">{totalStats.totalUnits.toLocaleString('ar-EG')}</span>
          </div>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="ابحث عن مدينة أو مشروع..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="city">ترتيب: المدينة</option>
          <option value="units">ترتيب: عدد الوحدات</option>
          <option value="buildings">ترتيب: عدد العمارات</option>
          <option value="price">ترتيب: سعر المتر</option>
        </select>
      </div>

      <div className="cities-table-wrapper">
        <table className="cities-table">
          <thead>
            <tr>
              <th>المدينة</th>
              <th>المشاريع</th>
              <th>عدد الوحدات</th>
              <th>عدد العمارات</th>
              <th>سعر المتر (ج.م)</th>
              <th>جدية الحجز (ج.م)</th>
            </tr>
          </thead>
          <tbody>
            {sortedCities.map((city, idx) => (
              <tr key={idx}>
                <td className="city-name">{city.city}</td>
                <td>{city.projects.join(', ')}</td>
                <td>{city.units.toLocaleString('ar-EG')}</td>
                <td>{city.buildings}</td>
                <td>{city.pricePerMeter.toLocaleString('ar-EG')}</td>
                <td>{city.deposit.toLocaleString('ar-EG')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="results-info">
        عدد النتائج: <strong>{sortedCities.length}</strong> من <strong>{citiesWithDetails.length}</strong>
      </div>
    </div>
  );
};

export default AllCitiesStats;
