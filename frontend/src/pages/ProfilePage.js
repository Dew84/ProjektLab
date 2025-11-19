// src/pages/ProfilePage.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ÚJ
import userService from '../services/userService';
import './ProfilePage.css';

export default function ProfilePage(props) {
    const { onBackHome, setCurrentPage } = props;
    const navigate = useNavigate(); // ÚJ

    const [userName, setUserName] = useState('');
    const [email, setEmail]       = useState('');
    const [loading, setLoading]   = useState(true);
    const [saving, setSaving]     = useState(false);
    const [info, setInfo]         = useState('');
    const [error, setError]       = useState('');

    const goHome = () => {
        // 1) Ha van explicit callback:
        if (typeof onBackHome === 'function') return onBackHome();

        // 2) Ha valahol még state-alapú navigációt használsz:
        if (typeof setCurrentPage === 'function') return setCurrentPage('home'); // NEM 'goHome'!

        // 3) Alapértelmezett: Routeres navigáció a főoldalra:
        sessionStorage.setItem('keepHomeCategories', 'true');
        navigate('/', { state: { fromNavigation: true } });
    };

    const goOwnAds = () => {
        // Ha van state-alapú lapozás:
        if (typeof setCurrentPage === 'function') return setCurrentPage('ownAds');
        // Egyébként router:
        navigate('/ads/own');
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError('');
            try {
                const me = await userService.me();
                setUserName(me.userName || '');
                setEmail(me.email || '');
            } catch {
                setError('Nem sikerült betölteni a profilt.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setInfo('');
        setError('');
        setSaving(true);
        try {
            const updated = await userService.updateMe({
                userName: userName.trim(),
                email: email.trim(),
            });

            // localStorage frissítés, hogy a Navbar/Home is azonnal az újat mutassa
            try {
                const current = JSON.parse(localStorage.getItem('user') || '{}');
                const merged = {
                    ...current,
                    ...(updated || {}),
                    userName: (updated?.userName ?? userName).trim(),
                    name: (updated?.userName ?? userName).trim(),
                    email: (updated?.email ?? email).trim(),
                };
                localStorage.setItem('user', JSON.stringify(merged));
            } catch {
                localStorage.setItem('user', JSON.stringify({
                    userName: userName.trim(),
                    name: userName.trim(),
                    email: email.trim(),
                }));
            }

            setInfo('Profil frissítve.');
        } catch (e2) {
            setError(e2?.response?.data?.message || 'A mentés nem sikerült.');
        } finally {
            setSaving(false);
        }
    };

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
    const canSave = userName.trim().length >= 3 && isEmailValid && !saving;

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h2>Saját profil szerkesztése</h2>
                    <p>Betöltés…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2>Saját profil szerkesztése</h2>

                <form onSubmit={handleSave}>
                    <input
                        type="text"
                        placeholder="Felhasználónév"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        minLength={3}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={!canSave}>
                        {saving ? 'Mentés…' : 'Mentés'}
                    </button>
                </form>

                {info  && <p style={{ color: 'green', marginTop: 8 }}>{info}</p>}
                {error && <p style={{ color: 'red',   marginTop: 8 }}>{error}</p>}

                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <button type="button" onClick={goHome}>
                        Vissza a főoldalra
                    </button>
                </div>
            </div>
        </div>
    );
}
