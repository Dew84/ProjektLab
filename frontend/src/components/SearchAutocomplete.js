import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import adService from '../services/adService';
import './SearchAutocomplete.css';

function SearchAutocomplete({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Amikor elhagyjuk a search oldalt, törli a query-t
  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setQuery('');
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Kattintás detektálás a komponensen kívül
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keresés debounce-szal
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const fetchSuggestions = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await adService.getAds({
        keyword: searchQuery,
        pageSize: 5,
      });
      setSuggestions(response.items || []);
      setIsOpen(true);
    } catch (error) {
      console.error('Autocomplete hiba:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (adId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/ads/${adId}`);
  };

  return (
    <div className="search-autocomplete" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Keresés..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍 Keresés
        </button>
      </form>

      {isOpen && (
        <div className="autocomplete-dropdown">
          {loading && <div className="autocomplete-loading">Betöltés...</div>}
          
          {!loading && suggestions.length === 0 && query.trim().length >= 2 && (
            <div className="autocomplete-empty">Nincs találat</div>
          )}

          {!loading && suggestions.length > 0 && (
            <>
              {suggestions.map((ad) => (
                <div
                  key={ad.id}
                  className="autocomplete-item"
                  onClick={() => handleSuggestionClick(ad.id)}
                >
                  <div className="autocomplete-item-title">{ad.title}</div>
                  <div className="autocomplete-item-price">
                    {ad.price.toLocaleString()} Ft
                  </div>
                </div>
              ))}
              
              <div 
                className="autocomplete-see-all"
                onClick={() => {
                  setIsOpen(false);
                  navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                }}
              >
                Összes találat megtekintése →
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchAutocomplete;