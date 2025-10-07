import React from 'react';
import './AdCard.css';

function AdCard({ ad, onClick }) {

  return (
    
    <div className="ad-card" onClick={onClick}>
      <div className="ad-card-image">
        {ad.image ? (
          <img src={ad.image} alt={ad.title} />
        ) : (
          <div className="ad-card-placeholder">📦 Nincs kép</div>
        )}
      </div>
      <div className="ad-card-content">
        <h3 className="ad-card-title">{ad.title}</h3>
        <p className="ad-card-description">{ad.description}</p>
        <div className="ad-card-footer">
          <span className="ad-card-price">{ad.price.toLocaleString()} Ft</span>
          <button className="ad-card-button" onClick={onClick}>Részletek</button>
        </div>
      </div>
    </div>
  );
}

export default AdCard;