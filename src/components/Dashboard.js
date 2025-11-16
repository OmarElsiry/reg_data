import React, { useState } from 'react';
import './Dashboard.css';
import { completeFullData } from '../data/completeFullData';

const Dashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [expandedCity, setExpandedCity] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Calculate statistics
  const stats = {
    totalCities: completeFullData.length,
    totalProjects: completeFullData.reduce((sum, city) => sum + city.projects.length, 0),
    totalBuildings: completeFullData.reduce((sum, city) => 
      sum + city.projects.reduce((pSum, proj) => pSum + proj.totalBuildings, 0), 0
    ),
    totalUnits: completeFullData.reduce((sum, city) => 
      sum + city.projects.reduce((pSum, proj) => pSum + proj.totalUnits, 0), 0
    )
  };

  const filteredData = completeFullData.filter(item =>
    item.city.toLowerCase().includes(searchText.toLowerCase()) ||
    item.projects.some(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const calculatePrice = (pricePerMeter, area) => {
    const areaNum = parseInt(area.split(':')[0]);
    return (pricePerMeter * areaNum).toLocaleString('ar-EG');
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🏢 منصة حجز الوحدات السكنية</h1>
          <p className="subtitle">الطرح الثاني - بيانات شاملة لجميع المشاريع والمدن</p>
        </div>
      </div>

      {/* Important Note */}
      <div className="important-note">
        <div className="note-icon">⚠️</div>
        <div className="note-content">
          <strong>ملاحظة هامة:</strong> الأسعار المعروضة قيمة تقديرية أولية ولا تشمل نسب التميز، وديعة الصيانة، المصاريف الإدارية (1%)، ومصاريف مجلس الأمناء (0.5%). الأسعار قابلة للزيادة بحد أقصى 20%.
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏙️</div>
          <div className="stat-info">
            <span className="stat-label">المدن</span>
            <span className="stat-value">{stats.totalCities}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏗️</div>
          <div className="stat-info">
            <span className="stat-label">المشاريع</span>
            <span className="stat-value">{stats.totalProjects}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-info">
            <span className="stat-label">العمارات</span>
            <span className="stat-value">{stats.totalBuildings}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-info">
            <span className="stat-label">الوحدات</span>
            <span className="stat-value">{stats.totalUnits.toLocaleString('ar-EG')}</span>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="controls-section">
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
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="عرض شبكة"
          >
            ⊞
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="عرض قائمة"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Results Info */}
      {searchText && (
        <div className="results-info">
          عدد النتائج: <strong>{filteredData.length}</strong> من <strong>{completeFullData.length}</strong>
        </div>
      )}

      {/* Cities Container */}
      <div className={`cities-container ${viewMode}`}>
        {filteredData.map((cityData, cityIdx) => (
          <div key={cityIdx} className="city-card">
            <div
              className="city-header"
              onClick={() => setExpandedCity(expandedCity === cityIdx ? null : cityIdx)}
            >
              <div className="city-title">
                <h2>{cityData.city}</h2>
                <span className="project-count">{cityData.projects.length} مشروع</span>
              </div>
              <span className={`expand-icon ${expandedCity === cityIdx ? 'expanded' : ''}`}>
                ▼
              </span>
            </div>

            {expandedCity === cityIdx && (
              <div className="city-content">
                {cityData.projects.map((project, projIdx) => (
                  <div key={projIdx} className="project-card">
                    <div
                      className="project-header"
                      onClick={() => setExpandedProject(expandedProject === `${cityIdx}-${projIdx}` ? null : `${cityIdx}-${projIdx}`)}
                    >
                      <div className="project-info-header">
                        <h3>{project.name}</h3>
                        {project.region && <p className="region">{project.region}</p>}
                      </div>
                      <div className="project-badges">
                        <span className="badge">{project.totalBuildings} عمارة</span>
                        <span className="badge">{project.totalUnits} وحدة</span>
                        <span className="badge price">{project.pricePerMeter.toLocaleString('ar-EG')} ج.م/م²</span>
                      </div>
                      <span className={`expand-icon ${expandedProject === `${cityIdx}-${projIdx}` ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </div>

                    {expandedProject === `${cityIdx}-${projIdx}` && (
                      <div className="project-details">
                        <div className="details-grid">
                          <div className="detail-item">
                            <span className="label">جدية الحجز</span>
                            <span className="value">{project.deposit.toLocaleString('ar-EG')} ج.م</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">سعر المتر</span>
                            <span className="value">{project.pricePerMeter.toLocaleString('ar-EG')} ج.م</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">العمارات</span>
                            <span className="value">{project.totalBuildings}</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">الوحدات</span>
                            <span className="value">{project.totalUnits}</span>
                          </div>
                        </div>

                        {/* Units Table */}
                        {project.units && (
                          <div className="table-section">
                            <h4>تفاصيل الوحدات</h4>
                            <div className="table-wrapper">
                              <table>
                                <thead>
                                  <tr>
                                    <th>الدور</th>
                                    <th>عدد الوحدات</th>
                                    <th>المساحة (م²)</th>
                                    <th>السعر التقريبي</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {project.units.map((unit, idx) => (
                                    <tr key={idx}>
                                      <td>{unit.floor}</td>
                                      <td>{unit.count}</td>
                                      <td>{unit.area}</td>
                                      <td className="price-cell">{calculatePrice(project.pricePerMeter, unit.area)} ج.م</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Models */}
                        {project.models && (
                          <div className="models-section">
                            {project.models.map((model, modelIdx) => (
                              <div key={modelIdx} className="model-card">
                                <h4>النموذج {model.model}</h4>
                                <div className="model-meta">
                                  <span>{model.buildings} عمارة</span>
                                  <span>{model.totalUnits} وحدة</span>
                                </div>
                                <div className="table-wrapper">
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
                                          <td>{floor.count}</td>
                                          <td>{floor.area}</td>
                                          <td className="price-cell">{calculatePrice(project.pricePerMeter, floor.area)} ج.م</td>
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
                          <div className="regions-section">
                            {project.regions.map((region, regionIdx) => (
                              <div key={regionIdx} className="region-card">
                                <h4>{region.region}</h4>
                                {region.model && <p className="model-label">النموذج: {region.model}</p>}
                                <div className="region-meta">
                                  <span>{region.buildings} عمارة</span>
                                  <span>{region.totalUnits} وحدة</span>
                                </div>
                                <div className="table-wrapper">
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
                                          <td>{floor.count}</td>
                                          <td>{floor.area}</td>
                                          <td className="price-cell">{calculatePrice(project.pricePerMeter, floor.area)} ج.م</td>
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

      {filteredData.length === 0 && (
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

export default Dashboard;
