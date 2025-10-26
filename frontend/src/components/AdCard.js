import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pictureService from "../services/pictureService";
import './AdCard.css';

const API_URL = process.env.REACT_APP_API_URL; 
const BASE_URL = API_URL.replace(/\/api$/, '');

function AdCard({ ad }) {
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const picturesData = await pictureService.getPictures(ad.id);
        setPictures(picturesData);
      } catch (err) {
        console.error(err.message || "Hiba történt a képek betöltéskor.");
      }
    };

    fetchData();
  }, [ad.id]);

  return (
    <div className="ad-card" onClick={() => navigate(`/ads/${ad.id}`)}>
      <div className="ad-card-image">
        {pictures.length > 0 ? (
          <img src={`${BASE_URL}/images/${ad.id}/${pictures[0].fileName}`} alt={ad.title} />
        ) : (
          <div className="ad-card-placeholder">📦 Nincs kép</div>
        )}
      </div>
      <div className="ad-card-content">
        <h3 className="ad-card-title">{ad.title}</h3>
        <p className="ad-card-description">{ad.description}</p>
        <div className="ad-card-footer">
          <span className="ad-card-price">{ad.price.toLocaleString()} Ft</span>
          <button className="ad-card-button" onClick={(e) => {
            e.stopPropagation();
            navigate(`/ads/${ad.id}`);
          }}>
            Részletek
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdCard;