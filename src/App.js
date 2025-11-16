import React, { useState } from 'react';
import './App.css';
import HousingTable from './components/HousingTable';
import Conditions from './components/Conditions';
import BuildingsTable from './components/BuildingsTable';
import DetailedProjects from './components/DetailedProjects';
import { housingData } from './data/housingData';

function App() {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-app">
      <h1>كراسات شروط حجز الوحدات السكنية (الطرح الثاني)</h1>
      
      <div className="note">
        <p>
          <strong>ملاحظة هامة:</strong> هذه الأسعار هي قيمة تقديرية أولية ولا تشمل نسب التميز، أو وديعة الصيانة، أو المصاريف الإدارية (1%) ومصاريف مجلس الأمناء (0.5%)، وهي أسعار مُعلنة لجدية الحجز وهي قابلة للزيادة بحد أقصى 20%.
        </p>
      </div>

      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          جميع المشاريع
        </button>
        <button 
          className={`tab-button ${activeTab === 'conditions' ? 'active' : ''}`}
          onClick={() => handleTabChange('conditions')}
        >
          الشروط
        </button>
        <button 
          className={`tab-button ${activeTab === 'buildings' ? 'active' : ''}`}
          onClick={() => handleTabChange('buildings')}
        >
          العمارات والشقق
        </button>
        <button 
          className={`tab-button ${activeTab === 'detailed' ? 'active' : ''}`}
          onClick={() => handleTabChange('detailed')}
        >
          المشاريع المفصلة
        </button>
      </div>

      {activeTab === 'conditions' ? (
        <Conditions />
      ) : activeTab === 'buildings' ? (
        <BuildingsTable activeTab={activeTab} />
      ) : activeTab === 'detailed' ? (
        <DetailedProjects />
      ) : (
        <HousingTable activeTab={activeTab} data={housingData} />
      )}
    </div>
  );
}

export default App;
