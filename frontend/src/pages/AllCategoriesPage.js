import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoryService from '../services/categoryService';
import './AllCategoriesPage.css';

function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Kategóriák betöltése sikertelen:', err);
        setError('Nem sikerült betölteni a kategóriákat.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/ads?categoryId=${categoryId}`);
  };

  if (loading) return <div className="loading">Betöltés...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="all-categories-page">
      <div className="categories-header">
        <h1>📂 Összes kategória</h1>
        <p>Válassz egy kategóriát a hirdetések böngészéséhez</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-icon">📦</div>
            <h3 className="category-name">{category.name}</h3>
            <button className="category-button">
              Hirdetések megtekintése →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCategoriesPage;