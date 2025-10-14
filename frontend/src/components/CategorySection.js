import React from 'react';
import AdCard from './AdCard';
import './CategorySection.css';

function CategorySection({ category, ads, onViewAll, setCurrentPage, setSelectedAdId }) {


  return (
    <section className="category-section">
      <h2 className="category-title">📂 {category}</h2>

      <div className="ads-grid">
        {ads && ads.length > 0 ? (
          ads.slice(0, 5).map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
              onClick={() => {
                setSelectedAdId(ad.id);
                setCurrentPage('adDetails');
              }}
            />
          ))
        ) : (
          <div className="no-ads-message">
            <p>🔍 Még nincsenek hirdetések ebben a kategóriában.</p>
            <p>Légy te az első, aki hirdetést ad fel!</p>
          </div>
        )}
      </div>

      <button className="view-all-button" onClick={onViewAll}>
        Összes hirdetés ebben a kategóriában →
      </button>
    </section>
  );
}

export default CategorySection;