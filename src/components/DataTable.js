import React, { useState } from 'react';
import './DataTable.css';
import { completeFullData } from '../data/completeFullData';

const DataTable = () => {
  const [searchText, setSearchText] = useState('');
  const [expandedCity, setExpandedCity] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [sortBy, setSortBy] = useState('city');

  const filteredData = completeFullData.filter(item =>
    item.city.toLowerCase().includes(searchText.toLowerCase()) ||
    item.projects.some(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const sortedData = [...filteredData].sort((a, b) => {
    switch(sortBy) {
      case 'units':
        const aUnits = a.projects.reduce((sum, p) => sum + p.totalUnits, 0);
        const bUnits = b.projects.reduce((sum, p) => sum + p.totalUnits, 0);
        return bUnits - aUnits;
      case 'buildings':
        const aBuildings = a.projects.reduce((sum, p) => sum + p.totalBuildings, 0);
        const bBuildings = b.projects.reduce((sum, p) => sum + p.totalBuildings, 0);
        return bBuildings - aBuildings;
      case 'price':
        const aPrice = a.projects[0]?.pricePerMeter || 0;
        const bPrice = b.projects[0]?.pricePerMeter || 0;
        return bPrice - aPrice;
      default:
        return a.city.localeCompare(b.city, 'ar');
    }
  });

  const calculatePrice = (pricePerMeter, area) => {
    const areaNum = parseInt(area.split(':')[0]);
    return (pricePerMeter * areaNum).toLocaleString('ar-EG');
  };

  return (
    <div className="data-table-container">
      <div className="table-header">
        <h1>📊 جداول البيانات الكاملة</h1>
        <p>عرض تفصيلي لجميع المشاريع والوحدات والأسعار</p>
      </div>

      <div className="table-controls">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 ابحث عن مدينة أو مشروع..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          {searchText && (
            <button 
              className="clear-btn"
              onClick={() => setSearchText('')}
            >
              ✕
            </button>
          )}
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="city">ترتيب: المدينة</option>
          <option value="units">ترتيب: عدد الوحدات</option>
          <option value="buildings">ترتيب: عدد العمارات</option>
          <option value="price">ترتيب: سعر المتر</option>
        </select>
      </div>

      {searchText && (
        <div className="results-info">
          عدد النتائج: <strong>{sortedData.length}</strong> من <strong>{completeFullData.length}</strong>
        </div>
      )}

      <div className="tables-wrapper">
        {sortedData.map((cityData, cityIdx) => (
          <div key={cityIdx} className="city-table-section">
            <div
              className="city-table-header"
              onClick={() => setExpandedCity(expandedCity === cityIdx ? null : cityIdx)}
            >
              <h2>{cityData.city}</h2>
              <span className="expand-icon">{expandedCity === cityIdx ? '▼' : '▶'}</span>
            </div>

            {expandedCity === cityIdx && (
              <div className="city-table-content">
                {cityData.projects.map((project, projIdx) => (
                  <div key={projIdx} className="project-table-section">
                    <div
                      className="project-table-header"
                      onClick={() => setExpandedProject(expandedProject === `${cityIdx}-${projIdx}` ? null : `${cityIdx}-${projIdx}`)}
                    >
                      <div>
                        <h3>{project.name}</h3>
                        {project.region && <p className="region">{project.region}</p>}
                      </div>
                      <span className="expand-icon">{expandedProject === `${cityIdx}-${projIdx}` ? '▼' : '▶'}</span>
                    </div>

                    {expandedProject === `${cityIdx}-${projIdx}` && (
                      <div className="project-table-details">
                        <div className="project-meta">
                          <div className="meta-item">
                            <span>جدية الحجز:</span>
                            <strong>{project.deposit.toLocaleString('ar-EG')} ج.م</strong>
                          </div>
                          <div className="meta-item">
                            <span>سعر المتر:</span>
                            <strong>{project.pricePerMeter.toLocaleString('ar-EG')} ج.م</strong>
                          </div>
                          <div className="meta-item">
                            <span>العمارات:</span>
                            <strong>{project.totalBuildings}</strong>
                          </div>
                          <div className="meta-item">
                            <span>الوحدات:</span>
                            <strong>{project.totalUnits}</strong>
                          </div>
                        </div>

                        {/* Units Table */}
                        {project.units && (
                          <div className="table-group">
                            <h4>تفاصيل الوحدات</h4>
                            <div className="table-responsive">
                              <table>
                                <thead>
                                  <tr>
                                    <th>الدور</th>
                                    <th>عدد الوحدات</th>
                                    <th>المساحة (م²)</th>
                                    <th>النموذج</th>
                                    <th>السعر التقريبي</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {project.units.map((unit, idx) => (
                                    <tr key={idx}>
                                      <td>{unit.floor}</td>
                                      <td className="center">{unit.count}</td>
                                      <td className="center">{unit.area}</td>
                                      <td className="center">{unit.model}</td>
                                      <td className="price">{calculatePrice(project.pricePerMeter, unit.area)} ج.م</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Models */}
                        {project.models && (
                          <div className="models-group">
                            {project.models.map((model, modelIdx) => (
                              <div key={modelIdx} className="table-group">
                                <h4>النموذج {model.model} ({model.buildings} عمارة - {model.totalUnits} وحدة)</h4>
                                <div className="table-responsive">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>الدور</th>
                                        <th>الوحدات</th>
                                        <th>المساحة (م²)</th>
                                        <th>السعر التقريبي</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {model.floors.map((floor, floorIdx) => (
                                        <tr key={floorIdx}>
                                          <td>{floor.floor}</td>
                                          <td className="center">{floor.count}</td>
                                          <td className="center">{floor.area}</td>
                                          <td className="price">{calculatePrice(project.pricePerMeter, floor.area)} ج.م</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Regions */}
                        {project.regions && (
                          <div className="regions-group">
                            {project.regions.map((region, regionIdx) => (
                              <div key={regionIdx} className="table-group">
                                <h4>{region.region}</h4>
                                {region.model && <p className="model-label">النموذج: {region.model} - {region.buildings} عمارة - {region.totalUnits} وحدة</p>}
                                <div className="table-responsive">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>الدور</th>
                                        <th>الوحدات</th>
                                        <th>المساحة (م²)</th>
                                        <th>السعر التقريبي</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {region.floors.map((floor, floorIdx) => (
                                        <tr key={floorIdx}>
                                          <td>{floor.floor}</td>
                                          <td className="center">{floor.count}</td>
                                          <td className="center">{floor.area}</td>
                                          <td className="price">{calculatePrice(project.pricePerMeter, floor.area)} ج.م</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
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

      {sortedData.length === 0 && (
        <div className="no-results">
          <p>لم يتم العثور على نتائج</p>
          <button onClick={() => setSearchText('')} className="reset-btn">
            إعادة تعيين البحث
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
