import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adService from '../services/adService';
import api from '../services/api';

export default function PublicProfilePage({ setSelectedAdId }) {
    // /users/public/:userId -> param string, konvertáljuk numberré
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

    // Ki a bejelentkezett felhasználó?
    const me = (() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    })();

    const canRate = !!me && me.id !== userId;

    // === 1) PUBLIC USER INFO BETÖLTÉSE ===
    useEffect(() => {
        let alive = true;

        async function loadUser() {
            try {
                setLoading(true);

                const res = await api.get(`/users/public/${userId}`);
                const data = res.data;
                if (!alive) return;

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

        if (!Number.isNaN(userId)) {
            loadUser();
        } else {
            setError('Érvénytelen felhasználó azonosító.');
            setLoading(false);
        }

        return () => {
            alive = false;
        };
    }, [userId]);

    // === 2) USER HIRDETÉSEINEK BETÖLTÉSE ===
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

        if (!Number.isNaN(userId)) {
            loadAds();
        }

        return () => {
            alive = false;
        };
    }, [userId, pageSize]);

    // === 3) ÉRTÉKELÉS KÜLDÉSE ===
    const handleRate = async (value) => {
        if (!canRate) return;

        try {
            // Token az api instance-ben van beállítva (authService.login/register után)
            await api.post('/ratings', {
                ratedUserId: userId,
                value,
            });

            const summaryRes = await api.get(`/ratings/${userId}/summary`);
            const summary = summaryRes.data;

            setAvgRating(Number(summary.average ?? 0));
            setRatingCount(Number(summary.count ?? 0));
            setMyRating(value);
        } catch (err) {
            console.error(err);
            alert('Hiba történt az értékelés közben.');
        }
    };

    if (loading) return <div>Betöltés…</div>;
    if (error) return <div>{error}</div>;
    if (!userData) return null;

    return (
        <div className="user-profile-page">
            {/* PROFIL FEJLÉC */}
            <div className="profile-header">
                <div className="profile-info">
                    <h2>{userData.userName || userData.name || 'Felhasználó'}</h2>
                    <p>Cím: {userData.address || '—'}</p>
                    <p>Telefonszám: {userData.phoneNumber || '—'}</p>
                </div>

                <div className="profile-actions">
                    {me && me.id !== userData.id && (
                        <button
                            className="btn-outline"
                            onClick={() => navigate(`/chat/${userData.id}`)}
                        >
                            Beszélgetés indítása
                        </button>
                    )}
                </div>
            </div>

            {/* ÉRTÉKELÉS ÖSSZEGZÉS */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    margin: '16px 0',
                }}
            >
                <strong>Értékelés:</strong>
                <span title={`${avgRating.toFixed(1)} / 5`}>
          {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(avgRating - 0.001);
              return (
                  <span
                      key={i}
                      style={{ color: filled ? '#FFC107' : '#ccc', fontSize: 20 }}
                  >
                ★
              </span>
              );
          })}
        </span>
                <span>({ratingCount})</span>
            </div>

            {/* ÉRTÉKELÉS LEADÁSA */}
            {canRate && (
                <div style={{ marginBottom: 24 }}>
                    <div style={{ marginBottom: 6 }}>Értékeld a felhasználót:</div>

                    {Array.from({ length: 5 }).map((_, i) => {
                        const index = i + 1;
                        const active = index <= (hover || myRating);

                        return (
                            <span
                                key={index}
                                style={{
                                    color: active ? '#FF9800' : '#bbb',
                                    fontSize: 28,
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => handleRate(index)}
                            >
                ★
              </span>
                        );
                    })}

                    {myRating > 0 && (
                        <span style={{ marginLeft: 8 }}>({myRating}/5)</span>
                    )}
                </div>
            )}

            <hr />

            {/* HIRDETÉSEK */}
            <div className="ads-section">
                <div className="ads-header">
                    <h3>Összes hirdetés ({ads.length} db)</h3>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}/oldal
                            </option>
                        ))}
                    </select>
                </div>

                <ul>
                    {ads.map((ad) => (
                        <li key={ad.id} style={{ marginBottom: 8 }}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (typeof setSelectedAdId === 'function') {
                                        setSelectedAdId(ad.id);
                                    }
                                    navigate(`/ads/${ad.id}`);
                                }}
                            >
                                {ad.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
