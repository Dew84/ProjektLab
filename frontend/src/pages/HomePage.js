import React, { useState, useEffect } from 'react';
import CategorySection from '../components/CategorySection';
import categoryService from '../services/categoryService';
import adService from '../services/adService';
import './HomePage.css';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [adsData, setAdsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1. Kategóriák betöltése
      const categoriesData = await categoryService.getCategories();
      setCategories(categoriesData);

      // 2. Random 2 kategória kiválasztása
      const shuffled = [...categoriesData].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);
      setSelectedCategories(selected);

      // 3. Hirdetések betöltése kategóriánként
      const adsPromises = selected.map(async (category) => {
        const ads = await adService.getAds({
          categoryId: category.id,
          pageSize: 5,
        });
        return { categoryId: category.id, ads: ads.items };
      });

      const adsResults = await Promise.all(adsPromises);

      // 4. Adatok strukturálása
      const adsMap = {};
      adsResults.forEach((result) => {
        const category = selected.find((c) => c.id === result.categoryId);
        if (category) {
          adsMap[category.name] = result.ads;
        }
      });

      setAdsData(adsMap);
    } catch (err) {
      console.error('Adatok betöltése sikertelen:', err);
      setError('Nem sikerült betölteni az adatokat. Próbáld újra később!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="homepage">
        <div className="loading">Betöltés...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Üdvözöllek a TradeByte-on! 👋</h1>
        <p>Vásárolj és adj el könnyedén</p>
      </header>

      {selectedCategories.map((category) => (
        <CategorySection
          key={category.id}
          category={category.name}
          ads={adsData[category.name] || []}
        />
      ))}
    </div>
  );
}

export default HomePage;