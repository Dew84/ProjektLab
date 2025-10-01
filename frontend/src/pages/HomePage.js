import React, { useState, useEffect } from 'react';
import CategorySection from '../components/CategorySection';
import './HomePage.css';

function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [adsData, setAdsData] = useState({});

  useEffect(() => {
    const categories = [
      'Elektronika',
      'Ruházat',
      'Otthon & Kert',
      'Sportfelszerelések',
      'Könyvek',
      'Játékok',
      'Autó & Motor',
      'Bútorok',
      'Számítástechnika'
    ];

    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    setSelectedCategories(selected);

    const generateMockAds = (category, count) => {
      if (count === 0) return [];
      
      return Array.from({ length: count }, (_, i) => ({
        id: `${category.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        title: `${category} termék ${i + 1}`,
        description: 'Ez egy rövid leírás a termékről. Kiváló állapotban, alig használt. Megbízható eladó.',
        price: Math.floor(Math.random() * 50000) + 5000,
        image: null
      }));
    };

    const mockData = {};
    mockData[selected[0]] = generateMockAds(selected[0], 5);
    mockData[selected[1]] = generateMockAds(selected[1], 0);
    
    setAdsData(mockData);
  }, []);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Üdvözöllek a TradeByte-on! 👋</h1>
      </header>

      {selectedCategories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          ads={adsData[category] || []}
        />
      ))}
    </div>
  );
}

export default HomePage;