import React, { useState } from 'react';
import './BuildingsTable.css';
import { buildingDetails } from '../data/apartmentsData';

const BuildingsTable = ({ activeTab }) => {
  const [expandedBuilding, setExpandedBuilding] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

  // Get unique projects
  const projects = [...new Set(buildingDetails.map(b => b.project))].sort();

  // Filter buildings
  const filteredBuildings = buildingDetails.filter(building => {
    const searchMatch = 
      building.project.toLowerCase().includes(searchText.toLowerCase()) ||
      building.city.toLowerCase().includes(searchText.toLowerCase()) ||
      building.buildingName.toLowerCase().includes(searchText.toLowerCase());
    
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
                <p className="building-name">{building.buildingName}</p>
                <p className="building-code">الكود: {building.buildingCode}</p>
              </div>
              <div className="building-stats">
                <div className="stat">
                  <span className="label">الوحدات</span>
                  <span className="value">{building.totalUnits}</span>
                </div>
                <div className="stat">
                  <span className="label">المساحة الإجمالية</span>
                  <span className="value">{building.totalArea} م²</span>
                </div>
                <div className="stat">
                  <span className="label">السعر الإجمالي</span>
                  <span className="value">{building.totalPrice.toLocaleString('ar-EG')} ج.م</span>
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
                      <th>الغرف</th>
                      <th>الحمامات</th>
                      <th>السعر (ج.م)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {building.apartments.map((apt, idx) => (
                      <tr key={idx}>
                        <td>{apt.floor}</td>
                        <td>{apt.area}</td>
                        <td>{apt.rooms}</td>
                        <td>{apt.bathrooms}</td>
                        <td>{apt.price.toLocaleString('ar-EG')}</td>
                      </tr>
                    ))}
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
