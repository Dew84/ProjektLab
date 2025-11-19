import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UserProfilePage() {
    const { userId } = useParams(); // string!
    const [userData, setUserData] = useState(null);
    const [avg, setAvg] = useState(0);
    const [count, setCount] = useState(0);
    const [myRating, setMyRating] = useState(0);
    const [hover, setHover] = useState(0);

    const me = (() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    })();

    // Betöltés
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const res = await fetch(`/api/users/${userId}`);
                if (!res.ok) throw new Error('Felhasználó nem található');
                const data = await res.json();

                if (!alive) return;
                setUserData(data);
                // Backendtől függően:
                // - data.averageRating, data.ratingsCount
                // - esetleg data.myRating
                setAvg(Number(data.averageRating ?? 0));
                setCount(Number(data.ratingsCount ?? 0));
                if (data.myRating != null) setMyRating(Number(data.myRating));
            } catch (e) {
                console.error(e);
            }
        })();

        return () => { alive = false; };
    }, [userId]);

    const canRate = !!me && me?.id?.toString() !== userId;

    const handleRate = async (value) => {
        if (!canRate) return;
        try {
            const res = await fetch(`/api/users/${userId}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
                body: JSON.stringify({ rating: value }),
            });
            if (!res.ok) throw new Error('Értékelés nem sikerült');
            // Frissítsük a lokális állapotot: egyszerű módszer
            setMyRating(value);
            // opcionálisan újra lekérheted a profilt is, hogy pontos átlag jöjjön a szervertől
            const refreshed = await fetch(`/api/users/${userId}`);
            if (refreshed.ok) {
                const data = await refreshed.json();
                setAvg(Number(data.averageRating ?? 0));
                setCount(Number(data.ratingsCount ?? 0));
            }
        } catch (e) {
            console.error(e);
            alert('Hiba történt az értékelés közben.');
        }
    };

    if (!userData) return <div style={{ padding: 20 }}>Betöltés…</div>;

    return (
        <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 6 }}>{userData.userName || userData.name}</h2>
            {userData.bio && <p style={{ color: '#555', marginTop: 0 }}>{userData.bio}</p>}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 16px' }}>
                <strong>Értékelés:</strong>
                <span title={`${avg.toFixed(1)} / 5`}>
          {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(avg - 0.001); // egyszerű kerekítés
              return (
                  <span key={i} style={{ color: filled ? '#FFC107' : '#ccc', fontSize: 20 }}>★</span>
              );
          })}
        </span>
                <span>({count})</span>
            </div>

            {/* Saját értékelés leadása (ha be van jelentkezve és nem saját profil) */}
            {canRate && (
                <div style={{ marginBottom: 24 }}>
                    <div style={{ marginBottom: 6 }}>Értékeld a felhasználót:</div>
                    {Array.from({ length: 5 }).map((_, i) => {
                        const index = i + 1;
                        const active = index <= (hover || myRating);
                        return (
                            <span
                                key={index}
                                style={{ color: active ? '#FF9800' : '#bbb', fontSize: 28, cursor: 'pointer' }}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => handleRate(index)}
                            >
                ★
              </span>
                        );
                    })}
                    {myRating > 0 && <span style={{ marginLeft: 8 }}>({myRating}/5)</span>}
                </div>
            )}

            {/* Opcionális: a felhasználó hirdetései röviden */}
            {Array.isArray(userData.ads) && userData.ads.length > 0 && (
                <div>
                    <h3>Hirdetései</h3>
                    <ul>
                        {userData.ads.map((ad) => (
                            <li key={ad.id}>
                                <Link to={`/ads/${ad.id}`}>{ad.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
