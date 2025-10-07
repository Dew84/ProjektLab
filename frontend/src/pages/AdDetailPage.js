import React, { useState, useEffect } from "react";
import pictureService from "../services/pictureService";
import adService from "../services/adService";
import AdImageGallery from "../components/AdImageGallery";
import "./AdDetailPage.css";
import userService from "../services/userService";

function AdDetailPage({ adId }) {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ad, setAd] = useState(null);

  useEffect(() => {
    if (!adId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [adData, picturesData] = await Promise.all([
          adService.getAdById(adId),
          pictureService.getPictures(adId),
        ]);
        setAd(adData);
        setPictures(picturesData);
      } catch (err) {
        setError(err.message || "Hiba történt a betöltéskor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adId]);

  if (loading) return <div className="loading">Betöltés...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ad-detail-page">
      <header className="ad-header">
        <h1>{ad.title}</h1>
        <p className="ad-date">Feltöltve: {formatDateTime(ad.createdAt)}</p>
      </header>

      <main className="ad-content">
        <section className="ad-gallery">
          <AdImageGallery images={pictures} adId={adId} />
        </section>

        <section className="ad-info">
          <h2 className="ad-price">{ad.price.toLocaleString()} Ft</h2>
          {ad.category && (
            <p className="ad-category">Kategória: {ad.category}</p>
          )}
          <p className="ad-description">
            {ad.description || "Nincs megadva leírás."}
          </p>

          <div className="ad-contact">
            <h3>Kapcsolat</h3>
            <p><strong>Hirdető:</strong> { "Ismeretlen"}</p>
            {ad.phone && <p>📞 {ad.phone}</p>}
            {ad.email && <p>✉️ {ad.email}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export default AdDetailPage;
