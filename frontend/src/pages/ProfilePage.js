// src/pages/ProfilePage.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import './ProfilePage.css';

export default function ProfilePage({ onBackHome, setCurrentPage }) {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    const goHome = () => {
        if (typeof onBackHome === 'function') return onBackHome();
        if (typeof setCurrentPage === 'function') return setCurrentPage('home');
        sessionStorage.setItem('keepHomeCategories', 'true');
        navigate('/');
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError('');
            try {
                const me = await userService.me();
                setUserName(me.userName || '');
                setEmail(me.email || '');
                setPhone(me.phoneNumber || '');
                setAddress(me.address || '');
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
            await userService.updateMe({
                userName: userName.trim(),
                email: email.trim(),
                phoneNumber: phone.trim(),
                address: address.trim(),
            });

            // localStorage frissítése
            const updatedUser = {
                userName: userName.trim(),
                name: userName.trim(),
                email: email.trim(),
                phoneNumber: phone.trim(),
                address: address.trim(),
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));

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
                        type="text"
                        placeholder="Telefonszám"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Cím"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}

                <div style={{ marginTop: 12 }}>
                    <button type="button" onClick={goHome}>
                        Vissza a főoldalra
                    </button>
                </div>
            </div>
        </div>
    );
}
