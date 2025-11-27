import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import adService from '../services/adService';
import categoryService from '../services/categoryService';
import AdCard from '../components/AdCard';
import ReactPaginate from 'react-paginate';
import './AllAdsPage.css';

function AllAdsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [ads, setAds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const adsPerPage = 20;

    // Szűrők state (amit a user állít)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOption, setSortOption] = useState('newest');

    // Alkalmazott szűrők (amit ténylegesen használunk a lekérdezéshez)
    const [appliedCategory, setAppliedCategory] = useState('');
    const [appliedMinPrice, setAppliedMinPrice] = useState('');
    const [appliedMaxPrice, setAppliedMaxPrice] = useState('');
    const [appliedSortOption, setAppliedSortOption] = useState('newest');

    // Kategóriák betöltése
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
            } catch (err) {
                console.error('Kategóriák betöltése sikertelen:', err);
            }
        };
        loadCategories();
    }, []);

    // URL paraméterek beolvasása ÉS kezdeti betöltés
useEffect(() => {
  const categoryId = searchParams.get('categoryId');
  if (categoryId) {
    setSelectedCategory(categoryId);
    setAppliedCategory(categoryId);
  }
}, [searchParams]);

    // Hirdetések betöltése az ALKALMAZOTT szűrők alapján
    useEffect(() => {
        loadAds();
    }, [appliedCategory, appliedMinPrice, appliedMaxPrice, appliedSortOption]);

    const loadAds = async () => {
        try {
            setLoading(true);

            // API params összeállítása - CSAK szűrés, rendezés nélkül
            const params = {
                pageSize: 1000
            };

            // Kategória szűrő
            if (appliedCategory) {
                params.categoryId = parseInt(appliedCategory);
            }

            // Ár szűrők
            if (appliedMinPrice && appliedMinPrice !== '') {
                params.minPrice = parseFloat(appliedMinPrice);
            }
            if (appliedMaxPrice && appliedMaxPrice !== '') {
                params.maxPrice = parseFloat(appliedMaxPrice);
            }

            console.log('Lekérdezés paraméterei:', params);

            const response = await adService.getAds(params);
            console.log('API válasz:', response);

            let fetchedAds = response.items || [];

            // KLIENS OLDALI RENDEZÉS
            fetchedAds = sortAds(fetchedAds, appliedSortOption);

            setAds(fetchedAds);
            setPageNumber(0);
        } catch (err) {
            console.error('Hirdetések betöltése sikertelen:', err);
            setError('Nem sikerült betölteni a hirdetéseket.');
        } finally {
            setLoading(false);
        }
    };

    // Rendezés függvény
    const sortAds = (adsToSort, sortType) => {
        const sorted = [...adsToSort];

        switch (sortType) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);

            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);

            case 'title-asc':
                return sorted.sort((a, b) => a.title.localeCompare(b.title, 'hu'));

            case 'newest':
            default:
                return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    };

    // Szűrők alkalmazása gomb
    const applyFilters = () => {
        setAppliedCategory(selectedCategory);
        setAppliedMinPrice(minPrice);
        setAppliedMaxPrice(maxPrice);
        setAppliedSortOption(sortOption);
    };

    // Szűrők törlése
    const resetFilters = () => {
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setSortOption('newest');
        setAppliedCategory('');
        setAppliedMinPrice('');
        setAppliedMaxPrice('');
        setAppliedSortOption('newest');
        setSearchParams({});
    };

    // Ellenőrizzük, hogy van-e változás a szűrőkben
    const hasFilterChanges = () => {
        return selectedCategory !== appliedCategory ||
            minPrice !== appliedMinPrice ||
            maxPrice !== appliedMaxPrice ||
            sortOption !== appliedSortOption;
    };

    const pagesVisited = pageNumber * adsPerPage;
    const displayAds = ads.slice(pagesVisited, pagesVisited + adsPerPage);
    const pageCount = Math.ceil(ads.length / adsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading && ads.length === 0) return <div className="loading">Betöltés...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="all-ads-page">
            <div className="all-ads-header">
                <h1>📋 Összes hirdetés</h1>
                <p>Összesen {ads.length} hirdetés található</p>
            </div>

            <div className="all-ads-container">
                {/* Bal oldali szűrők */}
                <aside className="filters-sidebar">
                    <div className="filters-header">
                        <h2>🔍 Szűrők</h2>
                        <button className="reset-button" onClick={resetFilters} 
                          disabled={!selectedCategory && !minPrice && !maxPrice && sortOption === 'newest'}>
                            Törlés
                        </button>
                    </div>

                    {/* Kategória szűrő */}
                    <div className="filter-group">
                        <label htmlFor="category-filter">📂 Kategória</label>
                        <select
                            id="category-filter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Összes kategória</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ár szűrő */}
                    <div className="filter-group">
                        <label>💰 Ár</label>
                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder="Min. ár (Ft)"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="price-input"
                                min="0"
                            />
                            <input
                                type="number"
                                placeholder="Max. ár (Ft)"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="price-input"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Rendezés a szűrőkben */}
                    <div className="filter-group">
                        <label htmlFor="sort-filter">🔢 Rendezés</label>
                        <select
                            id="sort-filter"
                            className="filter-select"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="newest">Legújabb elöl</option>
                            <option value="price-asc">Ár szerint növekvő</option>
                            <option value="price-desc">Ár szerint csökkenő</option>
                            <option value="title-asc">A-Z</option>
                        </select>
                    </div>

                    {/* SZŰRŐK ALKALMAZÁSA GOMB */}
                    <button
                        className={`apply-filters-button ${hasFilterChanges() ? 'has-changes' : ''}`}
                        onClick={applyFilters}
                        disabled={!hasFilterChanges()}
                    >
                        ✓ Szűrők alkalmazása
                    </button>

                    {/* Aktív szűrők megjelenítése */}
                    {(appliedCategory || appliedMinPrice || appliedMaxPrice || appliedSortOption !== 'newest') && (
                        <div className="active-filters">
                            <h3>Aktív szűrők:</h3>
                            {appliedCategory && (
                                <span className="filter-tag">
                                    {categories.find(c => c.id === parseInt(appliedCategory))?.name}
                                    <button onClick={() => {
                                        setSelectedCategory('');
                                        setAppliedCategory('');
                                    }}>✖</button>
                                </span>
                            )}
                            {appliedMinPrice && (
                                <span className="filter-tag">
                                    Min: {appliedMinPrice} Ft
                                    <button onClick={() => {
                                        setMinPrice('');
                                        setAppliedMinPrice('');
                                    }}>✖</button>
                                </span>
                            )}
                            {appliedMaxPrice && (
                                <span className="filter-tag">
                                    Max: {appliedMaxPrice} Ft
                                    <button onClick={() => {
                                        setMaxPrice('');
                                        setAppliedMaxPrice('');
                                    }}>✖</button>
                                </span>
                            )}
                            {appliedSortOption !== 'newest' && (
                                <span className="filter-tag">
                                    {appliedSortOption === 'price-asc' ? 'Ár ↑' :
                                        appliedSortOption === 'price-desc' ? 'Ár ↓' :
                                            'A-Z'}
                                    <button onClick={() => {
                                        setSortOption('newest');
                                        setAppliedSortOption('newest');
                                    }}>✖</button>
                                </span>
                            )}
                        </div>
                    )}
                </aside>

                {/* Jobb oldali hirdetések */}
                <main className="ads-content">
                    {ads.length === 0 ? (
                        <div className="no-ads-message">
                            <p>😔 Nincs hirdetés a megadott szűrőkkel.</p>
                            <p>Próbáld meg módosítani a szűrőket!</p>
                        </div>
                    ) : (
                        <>
                            <div className="ads-grid">
                                {displayAds.map((ad) => (
                                    <AdCard key={ad.id} ad={ad} />
                                ))}
                            </div>

                            {pageCount > 1 && (
                                <ReactPaginate
                                    previousLabel={"← Előző"}
                                    nextLabel={"Következő →"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    forcePage={pageNumber}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"pagination-link"}
                                    nextLinkClassName={"pagination-link"}
                                    disabledClassName={"pagination-disabled"}
                                    activeClassName={"pagination-active"}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default AllAdsPage;