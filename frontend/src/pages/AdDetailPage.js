import React, { useState, useEffect } from "react";
import pictureService from "../services/pictureService";
import adService from "../services/adService";
import AdImageGallery from "../components/AdImageGallery";
import "./AdDetailPage.css";
import userService from "../services/userService";
import {formatDateTime} from "../services/adService";

function AdDetailPage({ adId }) {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ad, setAd] = useState(null);
  const [user, setUser] = useState(null); // 👈 új state a userhez

  useEffect(() => {
    if (!adId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Hirdetés és képek betöltése
        const [adData, picturesData] = await Promise.all([
          adService.getAdById(adId),
          pictureService.getPictures(adId),
        ]);
        setAd(adData);
        setPictures(picturesData);

        // 👇 Ha van userId (vagy ownerId), kérd le a usert is
        if (adData?.userId) {
          const userData = await userService.getUserByIdToAd(adData.userId);
          setUser(userData);
        }
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
console.log('Képek:', pictures);
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
          {ad.category && <p className="ad-category">Kategória: {ad.category}</p>}
          <p className="ad-description">
            {ad.description || "Nincs megadva leírás."}
          </p>

          <div className="ad-contact">
            <h3>Kapcsolat</h3>
            <p>
              <strong>Hirdető:</strong>{" "}
              {user ? user.userName : "Ismeretlen"}
            </p>
            {user?.phoneNumber && <p>📞 {user.phoneNumber}</p>}
            {user?.email && <p>✉️ {user.email}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdDetailPage;
