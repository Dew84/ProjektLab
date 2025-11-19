import React, { useState, useEffect } from 'react';
import adService, { formatDateTime } from '../services/adService';
import PageSizeSelector from '../components/PageSizeSelector';
import './OwnAdListPage.css';
import pictureService from '../services/pictureService';
import { useNavigate } from 'react-router-dom';


function OwnAdListPage({ setCurrentPage, setUser, setSelectedAdId }) {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(20);
    const navigate = useNavigate();


    const handleModify = async (adId) => {
        console.log('Modifying ad with id:', adId);
        if (typeof setSelectedAdId === 'function') {
            setSelectedAdId(adId);
        }
        navigate(`/ads/edit/${adId}`);
    }

    const handleDelete = async (adId) => {
        if (!window.confirm('Biztosan törlöd?')) return;
        try {
            await pictureService.deletePicturesByAd(adId);
            await adService.deleteAd(adId);
            setAds(prev => prev.filter(a => a.id !== adId));
        } catch (e) {
            alert(e?.response?.data?.message || 'Törlés sikertelen.');
        }
    };

    useEffect(() => {
        const loadAds = async () => {
            try {
                setLoading(true);
                const params = { pageSize };
                const response = await adService.getMyAds(params);
                setAds(response.items || []);
            } catch (err) {
                console.error('Hirdetések betöltése sikertelen:', err);
                setError('Nem sikerült betölteni a hirdetéseket.');
            } finally {
                setLoading(false);
            }
        };

        loadAds();
    }, [pageSize]);

    if (loading) return <div>Betöltés...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="adlist-page">
            <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
            <div className="table-container">
                <table className="ad-table">
                    <thead>
                        <tr>
                            <th>Cím</th>
                            <th>Létrehozva</th>
                            <th colSpan="2">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map(ad => (
                            <tr key={ad.id}>
                                <td>{ad.title}</td>
                                <td>{formatDateTime(ad.createdAt)}</td>
                                <td>
                                    <button className="btn modify" onClick={() => handleModify(ad.id)}>
                                        ✏️ Módosítás
                                    </button>
                                </td>
                                <td>
                                    <button className="btn delete" onClick={() => handleDelete(ad.id)}>
                                        🗑️ Törlés
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default OwnAdListPage;
