import React, { useState, useEffect } from 'react';
import adService from '../services/adService';
import PageSizeSelector from '../components/PageSizeSelector';
import AdList from '../components/AdList';
import './PublicProfilePage.css';
import { useLocation, useNavigate } from 'react-router-dom';

function PublicProfilePage({ setCurrentPage, setSelectedAdId }) {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const user = location.state?.user;
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(20);

    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const response = await adService.getAds({ pageSize, userId: user?.id });
                setAds(response.items || []);
            } catch (err) {
                console.error('Adatok betöltése sikertelen:', err);
                setError('Nem sikerült betölteni az adatokat.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user, pageSize]);

    if (loading) return <div>Betöltés...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="user-profile-page">
            {/* --- FEJLÉC --- */}
            <div className="profile-header">
                <div className="profile-info">
                    <h2>{user?.name || 'Felhasználó'}</h2>
                    <p>Cím: {user?.address || '—'}</p>
                    <p>Telefonszám: {user?.phoneNumber || '—'}</p>
                </div>
                <div className="profile-actions">
                    <button className="btn-outline"
                        //style={{ display: user.id != loggedInUser.id ? 'inline-block' : 'none' }}
                        onClick={() => navigate(`/chat/${user.id}`)}
                    >Beszélgetés indítása</button>
                </div>
            </div>

            <hr />

            {/* --- HIRDETÉSEK --- */}
            <div className="ads-section">
                <div className="ads-header">
                    <h3>Összes hirdetés ({ads.length} db)</h3>
                    <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
                </div>

                <AdList
                    ads={ads}
                    pageSize={pageSize}
                    setSelectedAdId={setSelectedAdId}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default PublicProfilePage;
