import React, { useState, useMemo } from 'react';
import './HousingTable.css';

const HousingTable = ({ activeTab, data }) => {
  const [searchText, setSearchText] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minUnitPrice, setMinUnitPrice] = useState('');
  const [maxUnitPrice, setMaxUnitPrice] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedHeaders, setSortedHeaders] = useState({});

  // Get unique projects and cities
  const projects = useMemo(() => {
    return [...new Set(data.map(item => item.project))].sort();
  }, [data]);

  const cities = useMemo(() => {
    return [...new Set(data.map(item => item.city))].sort();
  }, [data]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = data.filter(row => {
      const text = `${row.project} ${row.city} ${row.district}`.toLowerCase();
      const searchMatch = text.includes(searchText.toLowerCase());
      const projectMatch = !projectFilter || row.project === projectFilter;
      const cityMatch = !cityFilter || row.city === cityFilter;
      
      const price = parseFloat(row.price) || 0;
      const minP = parseFloat(minPrice) || 0;
      const maxP = parseFloat(maxPrice) || Infinity;
      const priceMatch = price >= minP && price <= maxP;

      let minU = 0, maxU = 0;
      const unitPriceText = row.unitPrice;
      if (unitPriceText.includes('من') && unitPriceText.includes('إلى')) {
        const parts = unitPriceText.split(' ');
        minU = parseFloat(parts[1].replace(/,/g, '')) || 0;
        maxU = parseFloat(parts[3].replace(/,/g, '')) || 0;
      } else {
        const num = unitPriceText.match(/\d+/g);
        minU = maxU = parseFloat(num ? num.join('') : '0');
      }

      const minUP = parseFloat(minUnitPrice) || 0;
      const maxUP = parseFloat(maxUnitPrice) || Infinity;
      const unitPriceMatch = minU <= maxUP && maxU >= minUP;

      let tabMatch = true;
      if (activeTab === 'zilal') {
        tabMatch = row.project.includes('ظلال');
      } else if (activeTab === 'dyarana') {
        tabMatch = row.project.includes('ديارنا');
      } else if (activeTab === 'others') {
        tabMatch = !row.project.includes('ظلال') && !row.project.includes('ديارنا');
      }

      return searchMatch && projectMatch && cityMatch && priceMatch && unitPriceMatch && tabMatch;
    });

    // Sort
    if (sortColumn) {
      filtered.sort((a, b) => {
        let valA, valB;

        if (sortColumn === 'price' || sortColumn === 'deposit') {
          valA = parseFloat(a[sortColumn]) || 0;
          valB = parseFloat(b[sortColumn]) || 0;
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        } else if (sortColumn === 'unitPrice') {
          const getMin = text => {
            if (text.includes('من')) {
              return parseFloat(text.split('من')[1].split('إلى')[0].replace(/,/g, '')) || 0;
            }
            return parseFloat(text.replace(/,/g, '').match(/\d+/)?.[0] || '0');
          };
          valA = getMin(a.unitPrice);
          valB = getMin(b.unitPrice);
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        } else {
          valA = a[sortColumn]?.toString() || '';
          valB = b[sortColumn]?.toString() || '';
          return sortDirection === 'asc' 
            ? valA.localeCompare(valB, 'ar')
            : valB.localeCompare(valA, 'ar');
        }
      });
    }

    return filtered;
  }, [data, searchText, projectFilter, cityFilter, minPrice, maxPrice, minUnitPrice, maxUnitPrice, sortColumn, sortDirection, activeTab]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setSortedHeaders({ [column]: sortDirection === 'asc' ? 'desc' : 'asc' });
  };

  const handleApplySort = () => {
    if (sortColumn) {
      // Sorting is already applied via useMemo
    }
  };

  const handleReset = () => {
    setSearchText('');
    setProjectFilter('');
    setCityFilter('');
    setMinPrice('');
    setMaxPrice('');
    setMinUnitPrice('');
    setMaxUnitPrice('');
    setSortColumn('');
    setSortDirection('asc');
    setSortedHeaders({});
  };

  return (
    <div className="table-wrapper">
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          placeholder="ابحث عن المشروع، المدينة، أو الحي..."
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

        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
          <option value="">كل المدن</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="سعر متر أدنى"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="سعر متر أعلى"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="سعر وحدة أدنى"
          value={minUnitPrice}
          onChange={(e) => setMinUnitPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="سعر وحدة أعلى"
          value={maxUnitPrice}
          onChange={(e) => setMaxUnitPrice(e.target.value)}
        />

        <button onClick={() => {}}>تطبيق</button>
        <button onClick={handleReset}>إعادة تعيين</button>
      </div>

      <div className="sort-section">
        <select value={sortColumn} onChange={(e) => setSortColumn(e.target.value)}>
          <option value="">اختر عمود الترتيب</option>
          <option value="project">المشروع</option>
          <option value="city">المدينة</option>
          <option value="district">الحي</option>
          <option value="price">سعر المتر</option>
          <option value="deposit">جدية الحجز</option>
          <option value="areaRange">نطاق المساحات</option>
          <option value="unitPrice">سعر الوحدة</option>
        </select>

        <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
          <option value="asc">تصاعدي</option>
          <option value="desc">تنازلي</option>
        </select>

        <button onClick={handleApplySort}>ترتيب</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('project')} className={sortedHeaders['project'] ? sortedHeaders['project'] : ''}>
                المشروع
              </th>
              <th onClick={() => handleSort('city')} className={sortedHeaders['city'] ? sortedHeaders['city'] : ''}>
                المدينة
              </th>
              <th onClick={() => handleSort('district')} className={sortedHeaders['district'] ? sortedHeaders['district'] : ''}>
                الحي
              </th>
              <th onClick={() => handleSort('price')} className={sortedHeaders['price'] ? sortedHeaders['price'] : ''}>
                سعر المتر (ج.م)
              </th>
              <th onClick={() => handleSort('deposit')} className={sortedHeaders['deposit'] ? sortedHeaders['deposit'] : ''}>
                جدية الحجز
              </th>
              <th onClick={() => handleSort('areaRange')} className={sortedHeaders['areaRange'] ? sortedHeaders['areaRange'] : ''}>
                المساحة (م²)
              </th>
              <th onClick={() => handleSort('unitPrice')} className={sortedHeaders['unitPrice'] ? sortedHeaders['unitPrice'] : ''}>
                سعر الوحدة
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.project}</td>
                <td>{row.city}</td>
                <td>{row.district}</td>
                <td>{row.price.toLocaleString('ar-EG')}</td>
                <td>{row.deposit.toLocaleString('ar-EG')}</td>
                <td>{row.areaRange}</td>
                <td>{row.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HousingTable;
