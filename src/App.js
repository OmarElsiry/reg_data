import React, { useState } from 'react';
import './App.css';
import HousingTable from './components/HousingTable';
import Conditions from './components/Conditions';
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
          كل المشاريع
        </button>
        <button 
          className={`tab-button ${activeTab === 'zilal' ? 'active' : ''}`}
          onClick={() => handleTabChange('zilal')}
        >
          مشروع ظلال
        </button>
        <button 
          className={`tab-button ${activeTab === 'dyarana' ? 'active' : ''}`}
          onClick={() => handleTabChange('dyarana')}
        >
          مشروع ديارنا
        </button>
        <button 
          className={`tab-button ${activeTab === 'others' ? 'active' : ''}`}
          onClick={() => handleTabChange('others')}
        >
          مشاريع أخرى
        </button>
        <button 
          className={`tab-button ${activeTab === 'conditions' ? 'active' : ''}`}
          onClick={() => handleTabChange('conditions')}
        >
          الشروط
        </button>
      </div>

      {activeTab === 'conditions' ? (
        <Conditions />
      ) : (
        <HousingTable activeTab={activeTab} data={housingData} />
      )}
    </div>
  );
}

export default App;
