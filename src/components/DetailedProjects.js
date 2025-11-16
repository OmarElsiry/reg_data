import React, { useState } from 'react';
import './DetailedProjects.css';
import { detailedProjectsData } from '../data/detailedProjectsData';

const DetailedProjects = () => {
  const [searchText, setSearchText] = useState('');
  const [expandedCity, setExpandedCity] = useState(null);

  const cities = Object.keys(detailedProjectsData).sort();

  const filteredCities = cities.filter(city => {
    const cityData = detailedProjectsData[city];
    return (
      city.toLowerCase().includes(searchText.toLowerCase()) ||
      cityData.المشاريع.some(project =>
        project.اسم_المشروع.toLowerCase().includes(searchText.toLowerCase()) ||
        project.اسم_المنطقة?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  });

  const toggleCity = (city) => {
    setExpandedCity(expandedCity === city ? null : city);
  };

  return (
    <div className="detailed-projects-wrapper">
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث عن مدينة أو مشروع أو منطقة..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="cities-list">
        {filteredCities.map(city => {
          const cityData = detailedProjectsData[city];
          return (
            <div key={city} className="city-section">
              <div
                className="city-header"
                onClick={() => toggleCity(city)}
              >
                <h2>{city}</h2>
                <div className="city-stats">
                  <span className="stat-item">
                    {cityData.المشاريع.length} مشروع
                  </span>
                  <span className="stat-item">
                    {cityData.المشاريع.reduce((sum, p) => sum + p.إجمالي_عدد_الوحدات, 0).toLocaleString('ar-EG')} وحدة
                  </span>
                </div>
                <span className="expand-icon">
                  {expandedCity === city ? '▼' : '▶'}
                </span>
              </div>

              {expandedCity === city && (
                <div className="city-details">
                  {cityData.المشاريع.map((project, idx) => (
                    <div key={idx} className="project-card">
                      <div className="project-header">
                        <h3>{project.اسم_المشروع}</h3>
                        {project.اسم_المنطقة && (
                          <p className="region-name">{project.اسم_المنطقة}</p>
                        )}
                      </div>

                      <div className="project-details-grid">
                        <div className="detail-item">
                          <span className="label">جدية الحجز</span>
                          <span className="value">
                            {project.قيمة_جدية_الحجز_جم.toLocaleString('ar-EG')} ج.م
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="label">سعر المتر</span>
                          <span className="value">
                            {project.سعر_المتر_المربع_جم.toLocaleString('ar-EG')} ج.م
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="label">عدد العمارات</span>
                          <span className="value">
                            {project.إجمالي_عدد_العمارات}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="label">عدد الوحدات</span>
                          <span className="value">
                            {project.إجمالي_عدد_الوحدات.toLocaleString('ar-EG')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailedProjects;
