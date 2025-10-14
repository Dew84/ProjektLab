import React from 'react';
import './AdCard.css';
import { useState, useEffect } from "react";
import pictureService from "../services/pictureService";


const API_URL = process.env.REACT_APP_API_URL; 
const BASE_URL = API_URL.replace(/\/api$/, '');

function AdCard({ ad, onClick }) {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const picturesData = await pictureService.getPictures(ad.id);
      setPictures(picturesData);
    } catch (err) {
      setError(err.message || "Hiba történt a képek betöltéskor.");
    }
  };

  fetchData();
}, [ad.id]);

  return (

    <div className="ad-card" onClick={onClick}>
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
          <button className="ad-card-button" onClick={onClick}>Részletek</button>
        </div>
      </div>
    </div>
  );
}

export default AdCard;