import React, { useState, useEffect, useRef } from 'react';
import CategorySection from '../components/CategorySection';
import categoryService from '../services/categoryService';
import adService from '../services/adService';
import './HomePage.css';

function HomePage({ setCurrentPage, setCategoryId, setSelectedAdId }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [adsData, setAdsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  loadData();
  
  // Amikor a komponens betöltődött, kis késleltetéssel töröljük a flag-et
  // Így a loadData már felhasználhatta, de a következő navigációhoz már nem lesz ott
  const timer = setTimeout(() => {
    if (sessionStorage.getItem('keepHomeCategories') === 'true') {
      console.log('🧹 Flag törlése késleltetéssel');
      sessionStorage.removeItem('keepHomeCategories');
    }
  }, 1000); // 1 másodperc után töröljük

  return () => clearTimeout(timer);
}, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1. Kategóriák betöltése
      const categoriesData = await categoryService.getCategories();
      setCategories(categoriesData);

      // 2. Ellenőrizzük hogy navigációból jövünk-e vagy frissítésből
      const savedCategoriesIds = sessionStorage.getItem('homePageCategories');
      const navigationFlag = sessionStorage.getItem('keepHomeCategories');
      
      let selected;
      let shouldKeepCategories = false;

      //Ha navigációból jövünk, akkor ne véletlenszerű kategóriákat válasszunk
      if (savedCategoriesIds && navigationFlag === 'true') {
        console.log('Navigációból jövünk, megtartjuk a kategóriákat');
        const ids = JSON.parse(savedCategoriesIds);
        selected = categoriesData.filter(cat => ids.includes(cat.id));

        //Ha kevesebb mint 2 kategória van mentve, akkor töltsünk be véletlenszerűeket
        if (selected.length >= 2) {
          shouldKeepCategories = true;
        } else {
          console.log('Kevés kategória mentve, véletlenszerűeket töltünk be');
          const shuffled = [...categoriesData].sort(() => 0.5 - Math.random());
          selected = shuffled.slice(0, 2);
        }
      } else {
        console.log('Frissítésből jövünk, véletlenszerű kategóriákat választunk');
        const shuffled = [...categoriesData].sort(() => 0.5 - Math.random());
        selected = shuffled.slice(0, 2);
      }
      sessionStorage.setItem('homePageCategories', JSON.stringify(selected.map(cat => cat.id)));
      
      if(!shouldKeepCategories) {
        sessionStorage.removeItem('keepHomeCategories');
      }

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
          onViewAll={() => {
            setCategoryId(category.id);
            setCurrentPage('adlist');
          }}
          setCurrentPage={setCurrentPage}
          setSelectedAdId={setSelectedAdId}
        />
      ))}
    </div>
  );
}

export default HomePage;