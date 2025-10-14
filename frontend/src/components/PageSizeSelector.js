import React from 'react';
import './PageSizeSelector.css';

function PageSizeSelector({ pageSize, setPageSize }) {
  return (
    <div className="page-size-selector">
      <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
        <option value={10}>10 / oldal</option>
        <option value={20}>20 / oldal</option>
        <option value={50}>50 / oldal</option>
      </select>
    </div>
  );
}

export default PageSizeSelector;