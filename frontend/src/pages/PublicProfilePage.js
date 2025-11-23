import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adService from '../services/adService';
import api from '../services/api';
import './PublicProfilePage.css';

export default function PublicProfilePage({ setSelectedAdId }) {
    const { userId: userIdParam } = useParams();
    const userId = Number(userIdParam);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [ads, setAds] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [myRating, setMyRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Bejelentkezett user
    const me = (() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    })();

    const canRate = !!me && me.id !== userId;


    useEffect(() => {
        let alive = true;

        async function loadUser() {
            try {
                setLoading(true);

                const res = await api.get(`/users/public/${userId}`);
                if (!alive) return;
                const data = res.data;

                setUserData(data);
                setAvgRating(Number(data.averageRating ?? 0));
                setRatingCount(Number(data.ratingCount ?? 0));
            } catch (err) {
                console.error(err);
                if (alive) setError('Nem sikerült betölteni a felhasználó adatait.');
            } finally {
                if (alive) setLoading(false);
            }
        }

        if (!Number.isNaN(userId)) loadUser();
        else {
            setError('Érvénytelen felhasználó azonosító.');
            setLoading(false);
        }

        return () => { alive = false; };
    }, [userId]);


    useEffect(() => {
        let alive = true;

        async function loadAds() {
            try {
                setLoading(true);
                const response = await adService.getAds({ pageSize, userId });
                if (!alive) return;

                setAds(response.items || []);
            } catch (err) {
                console.error(err);
                if (alive) setError('Nem sikerült betölteni a hirdetéseket.');
            } finally {
                if (alive) setLoading(false);
            }
        }

        if (!Number.isNaN(userId)) loadAds();

        return () => { alive = false; };
    }, [userId, pageSize]);


    const handleRate = async (value) => {
        if (!canRate) return;

        try {
            await api.post('/ratings', {
                ratedUserId: userId,
                value,
            });

            const summary = (await api.get(`/ratings/${userId}/summary`)).data;

            setAvgRating(Number(summary.average ?? 0));
            setRatingCount(Number(summary.count ?? 0));
            setMyRating(value);
        } catch (err) {
            console.error(err);
            alert('Hiba történt az értékelés közben.');
        }
    };

    // === LOADING / ERROR ===
    if (loading) {
        return (
            <div className="user-profile-page center">
                <div className="loader" />
                <p>Betöltés…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-profile-page center">
                <div className="error-card">
                    <h3>Hoppá!</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!userData) return null;


    return (
        <div className="user-profile-page">


            <div className="profile-card profile-card-wide">
                <div className="profile-header">
                    <div className="avatar-circle">
                        {userData.userName?.charAt(0)?.toUpperCase() || 'F'}
                    </div>

                    <div className="profile-info">
                        <h2>{userData.userName || userData.name || 'Felhasználó'}</h2>
                        <p className="profile-subtitle">
                            Cím: <span>{userData.address || '—'}</span>
                        </p>
                        <p className="profile-subtitle">
                            Telefonszám: <span>{userData.phoneNumber || '—'}</span>
                        </p>
                    </div>

                    <div className="profile-actions">
                        {me && me.id !== userData.id && (
                            <button
                                className="btn primary"
                                onClick={() => navigate(`/chat/${userData.id}`)}
                            >
                                💬 Beszélgetés indítása
                            </button>
                        )}
                    </div>
                </div>

                {/* RATING SUMMARY */}
                <div className="rating-summary">
                    <div className="rating-value">
                        <span className="rating-number">{avgRating.toFixed(1)}</span>
                        <span className="rating-max">/ 5</span>
                    </div>

                    <div className="rating-stars">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const filled = i < Math.round(avgRating - 0.001);
                            return (
                                <span key={i} className={filled ? 'star filled' : 'star'}>
                                    ★
                                </span>
                            );
                        })}
                    </div>

                    <div className="rating-count">
                        {ratingCount > 0 ? `${ratingCount} értékelés` : 'Még nincs értékelés'}
                    </div>
                </div>

                {/* RATING INPUT */}
                {canRate && (
                    <div className="rating-input">
                        <div className="rating-input-label">
                            Értékeld a felhasználót:
                        </div>

                        <div className="rating-input-stars">
                            {Array.from({ length: 5 }).map((_, i) => {
                                const index = i + 1;
                                const active = index <= (hover || myRating);

                                return (
                                    <span
                                        key={index}
                                        className={active ? 'star big filled' : 'star big'}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(0)}
                                        onClick={() => handleRate(index)}
                                    >
                                        ★
                                    </span>
                                );
                            })}
                        </div>

                        {myRating > 0 && (
                            <span className="rating-my">
                                Saját értékelésed: {myRating}/5
                            </span>
                        )}
                    </div>
                )}
            </div>


            <div className="ads-card">
                <div className="ads-header">
                    <div>
                        <h3>Hirdetések</h3>
                        <span className="ads-count">{ads.length} aktív hirdetés</span>
                    </div>

                    <div className="ads-page-size">
                        <label>
                            Elem / oldal:{' '}
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                            >
                                {[10, 20, 50].map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                {ads.length === 0 ? (
                    <div className="ads-empty">Ennek a felhasználónak nincs hirdetése.</div>
                ) : (
                    <div className="ads-grid">
                        {ads.map((ad) => {
                            const hasImage = ad.pictureUrls && ad.pictureUrls.length > 0;

                            // === Képek URL-je ===
                            let thumbUrl = null;

                            if (hasImage) {
                                const pic = ad.pictureUrls[0];

                                if (pic.startsWith('http')) {
                                    thumbUrl = pic;
                                } else {
                                    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
                                    const base = apiBase.replace(/\/api\/?$/, '');
                                    thumbUrl = `${base}/${pic.replace(/^\/+/, '')}`;
                                }
                            }

                            return (
                                <div
                                    key={ad.id}
                                    className="ad-card"
                                    onClick={() => navigate(`/ads/${ad.id}`)}
                                >
                                    <div className="ad-card-image">
                                        {thumbUrl ? (
                                            <img src={thumbUrl} alt={ad.title} />
                                        ) : (
                                            <div className="ad-card-placeholder">📦</div>
                                        )}
                                    </div>

                                    <div className="ad-card-body">
                                        <h4 className="ad-card-title">{ad.title}</h4>
                                        {ad.price != null && (
                                            <div className="ad-card-price">{ad.price} Ft</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
