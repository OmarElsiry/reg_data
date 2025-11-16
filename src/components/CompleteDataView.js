import React, { useState } from 'react';
import './CompleteDataView.css';
import { completeFullData } from '../data/completeFullData';

const CompleteDataView = () => {
  const [expandedCity, setExpandedCity] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [searchText, setSearchText] = useState('');

  const filteredData = completeFullData.filter(item =>
    item.city.toLowerCase().includes(searchText.toLowerCase()) ||
    item.projects.some(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className="complete-data-wrapper">
      <div className="search-container">
        <input
          type="text"
          placeholder="ابحث عن مدينة أو مشروع..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="cities-container">
        {filteredData.map((cityData, cityIdx) => (
          <div key={cityIdx} className="city-section">
            <div
              className="city-header"
              onClick={() => setExpandedCity(expandedCity === cityIdx ? null : cityIdx)}
            >
              <h2>{cityData.city}</h2>
              <span className="expand-icon">{expandedCity === cityIdx ? '▼' : '▶'}</span>
            </div>

            {expandedCity === cityIdx && (
              <div className="city-content">
                {cityData.projects.map((project, projIdx) => (
                  <div key={projIdx} className="project-section">
                    <div
                      className="project-header"
                      onClick={() => setExpandedProject(expandedProject === `${cityIdx}-${projIdx}` ? null : `${cityIdx}-${projIdx}`)}
                    >
                      <div className="project-title">
                        <h3>{project.name}</h3>
                        {project.region && <p className="region">{project.region}</p>}
                      </div>
                      <div className="project-quick-stats">
                        <span>{project.totalBuildings} عمارة</span>
                        <span>{project.totalUnits} وحدة</span>
                        <span>{project.pricePerMeter.toLocaleString('ar-EG')} ج.م/م²</span>
                      </div>
                      <span className="expand-icon">{expandedProject === `${cityIdx}-${projIdx}` ? '▼' : '▶'}</span>
                    </div>

                    {expandedProject === `${cityIdx}-${projIdx}` && (
                      <div className="project-details">
                        <div className="project-info">
                          <div className="info-item">
                            <span className="label">جدية الحجز:</span>
                            <span className="value">{project.deposit.toLocaleString('ar-EG')} ج.م</span>
                          </div>
                          <div className="info-item">
                            <span className="label">سعر المتر:</span>
                            <span className="value">{project.pricePerMeter.toLocaleString('ar-EG')} ج.م</span>
                          </div>
                          <div className="info-item">
                            <span className="label">عدد العمارات:</span>
                            <span className="value">{project.totalBuildings}</span>
                          </div>
                          <div className="info-item">
                            <span className="label">إجمالي الوحدات:</span>
                            <span className="value">{project.totalUnits.toLocaleString('ar-EG')}</span>
                          </div>
                        </div>

                        {/* Display units data */}
                        {project.units && (
                          <div className="units-table">
                            <h4>تفاصيل الوحدات</h4>
                            <table>
                              <thead>
                                <tr>
                                  <th>الدور</th>
                                  <th>عدد الوحدات</th>
                                  <th>المساحة (م²)</th>
                                  <th>النموذج</th>
                                </tr>
                              </thead>
                              <tbody>
                                {project.units.map((unit, idx) => (
                                  <tr key={idx}>
                                    <td>{unit.floor}</td>
                                    <td>{unit.count}</td>
                                    <td>{unit.area}</td>
                                    <td>{unit.model}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Display models data */}
                        {project.models && (
                          <div className="models-container">
                            {project.models.map((model, modelIdx) => (
                              <div key={modelIdx} className="model-section">
                                <h4>النموذج {model.model}</h4>
                                <div className="model-stats">
                                  <span>{model.buildings} عمارة</span>
                                  <span>{model.totalUnits} وحدة</span>
                                </div>
                                <table>
                                  <thead>
                                    <tr>
                                      <th>الدور</th>
                                      <th>عدد الوحدات</th>
                                      <th>المساحة (م²)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {model.floors.map((floor, floorIdx) => (
                                      <tr key={floorIdx}>
                                        <td>{floor.floor}</td>
                                        <td>{floor.count}</td>
                                        <td>{floor.area}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Display regions data */}
                        {project.regions && (
                          <div className="regions-container">
                            {project.regions.map((region, regionIdx) => (
                              <div key={regionIdx} className="region-section">
                                <h4>{region.region}</h4>
                                {region.model && <p className="model-label">النموذج: {region.model}</p>}
                                <div className="region-stats">
                                  <span>{region.buildings} عمارة</span>
                                  <span>{region.totalUnits} وحدة</span>
                                </div>
                                <table>
                                  <thead>
                                    <tr>
                                      <th>الدور</th>
                                      <th>عدد الوحدات</th>
                                      <th>المساحة (م²)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {region.floors.map((floor, floorIdx) => (
                                      <tr key={floorIdx}>
                                        <td>{floor.floor}</td>
                                        <td>{floor.count}</td>
                                        <td>{floor.area}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompleteDataView;
