import React, { useState, useEffect } from 'react';
import adService from '../services/adService';
import PageSizeSelector from '../components/PageSizeSelector';
import AdList from '../components/AdList';
import './AdListPage.css';

function AdListPage({ categoryId, setCurrentPage, setSelectedAdId }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const loadAds = async () => {
      try {
        setLoading(true);
        const params = categoryId ? { categoryId, pageSize } : { pageSize };
        const response = await adService.getAds(params);
        setAds(response.items || []);
      } catch (err) {
        console.error('Hirdetések betöltése sikertelen:', err);
        setError('Nem sikerült betölteni a hirdetéseket.');
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, [categoryId, pageSize]);

  if (loading) return <div>Betöltés...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="adlist-page">
      <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />

      <AdList
        ads={ads}
        pageSize={pageSize}
        setSelectedAdId={setSelectedAdId}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default AdListPage;
