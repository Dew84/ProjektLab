// src/pages/ProfilePage.js
import { useEffect, useState } from 'react';
import userService from '../services/userService';
import './ProfilePage.css';

export default function ProfilePage(props) {
    const { onBackHome, setCurrentPage } = props;

    const [userName, setUserName] = useState('');
    const [email, setEmail]       = useState('');
    const [loading, setLoading]   = useState(true);
    const [saving, setSaving]     = useState(false);
    const [info, setInfo]         = useState('');
    const [error, setError]       = useState('');

    const goHome = () => {
        if (typeof onBackHome === 'function') return onBackHome();
        if (typeof setCurrentPage === 'function') return setCurrentPage('home');
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

                <button type="button" onClick={goHome} style={{ marginTop: 12 }}>
                    Vissza a főoldalra
                </button>
            </div>
        </div>
    );
}
