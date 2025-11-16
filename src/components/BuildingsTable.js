import React, { useState } from 'react';
import './BuildingsTable.css';
import { allBuildingsData } from '../data/buildingsComprehensive';

const BuildingsTable = ({ activeTab }) => {
  const [expandedBuilding, setExpandedBuilding] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

  // Get unique projects
  const projects = [...new Set(allBuildingsData.map(b => b.project))].sort();

  // Filter buildings
  const filteredBuildings = allBuildingsData.filter(building => {
    const searchMatch = 
      building.project.toLowerCase().includes(searchText.toLowerCase()) ||
      building.city.toLowerCase().includes(searchText.toLowerCase());
    
    const projectMatch = !projectFilter || building.project === projectFilter;
    
    return searchMatch && projectMatch;
  });

  const toggleBuilding = (id) => {
    setExpandedBuilding(expandedBuilding === id ? null : id);
  };

  return (
    <div className="buildings-wrapper">
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث عن المشروع أو العمارة..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="filters">
        <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
          <option value="">كل المشاريع</option>
          {projects.map(project => (
            <option key={project} value={project}>{project}</option>
          ))}
        </select>
      </div>

      <div className="buildings-list">
        {filteredBuildings.map(building => (
          <div key={building.id} className="building-card">
            <div 
              className="building-header"
              onClick={() => toggleBuilding(building.id)}
            >
              <div className="building-info">
                <h3>{building.project}</h3>
                <p className="building-city">{building.city}</p>
                <p className="building-code">القسم: {building.section}</p>
              </div>
              <div className="building-stats">
                <div className="stat">
                  <span className="label">عدد الشقق</span>
                  <span className="value">{building.units}</span>
                </div>
                <div className="stat">
                  <span className="label">سعر المتر</span>
                  <span className="value">{building.pricePerMeter.toLocaleString('ar-EG')} ج.م</span>
                </div>
                <div className="stat">
                  <span className="label">جدية الحجز</span>
                  <span className="value">{building.deposit.toLocaleString('ar-EG')} ج.م</span>
                </div>
              </div>
              <div className="expand-icon">
                {expandedBuilding === building.id ? '▼' : '▶'}
              </div>
            </div>

            {expandedBuilding === building.id && (
              <div className="building-details">
                <table>
                  <thead>
                    <tr>
                      <th>الدور</th>
                      <th>المساحة (م²)</th>
                      <th>السعر (ج.م)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {building.areas.map((area, idx) => {
                      const floorNames = ['دور أرضي', 'دور مكرر', 'دور أول (وسط)', 'دور أعلى'];
                      const price = area * building.pricePerMeter;
                      return (
                        <tr key={idx}>
                          <td>{floorNames[idx]}</td>
                          <td>{area}</td>
                          <td>{price.toLocaleString('ar-EG')}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingsTable;
