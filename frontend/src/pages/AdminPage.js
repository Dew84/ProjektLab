// src/pages/AdminPage.js
import { useEffect, useMemo, useState } from 'react';
import userService from '../services/userService';
import adService from '../services/adService';
import './AdminPage.css';

//EGYELŐRE ILYEN MARAD KÉSŐBB KÜLÖN OLDALRA KERÜL ÉS BŐVÍTEM TOVÁBBI FUNKCIÓKKAL
// Minden egy lapra került és jelenleg csak törölni tud (ez volt a tervezett is)
// csak admin számára elérhető a felület
export default function AdminPage({ user, onBackHome, setCurrentPage }) {
    // admin only
    const isAdmin = (user?.role || user?.Role || user?.roles)?.toString()?.toLowerCase().includes('admin');

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [users, setUsers] = useState([]);
    const [uError, setUError] = useState('');

    const [loadingAds, setLoadingAds] = useState(true);
    const [ads, setAds] = useState([]);
    const [aError, setAError] = useState('');

    const goHome = () => {
        if (typeof onBackHome === 'function') return onBackHome();
        if (typeof setCurrentPage === 'function') return setCurrentPage('home');
    };


    const usersById = useMemo(
        () => Object.fromEntries(users.map(u => [u.id, u])),
        [users]
    );


    // A hirdetés létrehozójának megjelenítése
    const resolveCreator = (ad) => {
        // Ha az API ad közvetlen nevet
        if (ad.sellerDisplayName) return ad.sellerDisplayName;

        // Keresés a betöltött userek között
        const u = usersById[ad.userId];
        if (u) return u.userName || u.email || 'Ismeretlen';

        // Ha semmi sincs
        return 'Ismeretlen';
    };



    useEffect(() => {
        if (!isAdmin) return;

        (async () => {
            setLoadingUsers(true);
            setUError('');
            try {
                const list = await userService.getAllUsers();
                setUsers(Array.isArray(list) ? list : []);
            } catch (e) {
                setUError(e?.response?.data?.message || 'Felhasználók betöltése sikertelen.');
            } finally {
                setLoadingUsers(false);
            }
        })();

        (async () => {
            setLoadingAds(true);
            setAError('');
            try {
                const list = await adService.getAds();
                const items = Array.isArray(list) ? list : (list?.items ?? list?.data ?? []);
                setAds(items);
            } catch (e) {
                setAError(e?.response?.data?.message || 'Hirdetések betöltése sikertelen.');
            } finally {
                setLoadingAds(false);
            }
        })();
    }, [isAdmin]);

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Biztosan törlöd ezt a felhasználót?')) return;
        try {
            await userService.deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (e) {
            alert(e?.response?.data?.message || 'Törlés sikertelen.');
        }
    };

    const handleDeleteAd = async (id) => {
        if (!window.confirm('Biztosan törlöd ezt a hirdetést?')) return;
        try {
            await adService.deleteAd(id);
            setAds(prev => prev.filter(a => a.id !== id));
        } catch (e) {
            alert(e?.response?.data?.message || 'Törlés sikertelen.');
        }
    };

    if (!isAdmin) {
        return (
            <div className="admin-page">
                <div className="admin-card">
                    <h2>Admin felület</h2>
                    <p style={{ color: 'crimson', marginTop: 8 }}>
                        403 – Ehhez az oldalhoz admin jogosultság szükséges.
                    </p>
                    <button className="btn" onClick={goHome} style={{ marginTop: 12 }}>
                        Vissza a főoldalra
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-card">
                <div className="admin-header">
                    <h2>Admin felület</h2>
                    <div className="admin-actions">
                        <button className="btn outline" onClick={goHome}>Vissza</button>
                    </div>
                </div>

                {/* Felhasználók blokk */}
                <section className="admin-section">
                    <div className="section-header">
                        <h3>Felhasználók</h3>
                        <span className="pill">{users.length}</span>
                    </div>

                    {loadingUsers ? (
                        <p>Betöltés…</p>
                    ) : uError ? (
                        <p className="error">{uError}</p>
                    ) : users.length === 0 ? (
                        <p>Nincs felhasználó.</p>
                    ) : (
                        <div className="table-wrap">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Felhasználónév</th>
                                    <th>E-mail</th>
                                    <th>Szerep(ek)</th>
                                    <th style={{ width: 1 }}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.userName || u.username || '-'}</td>
                                        <td>{u.email || '-'}</td>
                                        <td>{u.role || u.roles || '-'}</td>
                                        <td>
                                            <button
                                                className="btn danger"
                                                onClick={() => handleDeleteUser(u.id)}
                                            >
                                                Törlés
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                {/* Hirdetések blokk */}
                <section className="admin-section">
                    <div className="section-header">
                        <h3>Hirdetések</h3>
                        <span className="pill">{ads.length}</span>
                    </div>

                    {loadingAds ? (
                        <p>Betöltés…</p>
                    ) : aError ? (
                        <p className="error">{aError}</p>
                    ) : ads.length === 0 ? (
                        <p>Nincs hirdetés.</p>
                    ) : (
                        <div className="table-wrap">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Megnevezés</th>
                                    <th>Ár</th>
                                    <th>Létrehozva</th>
                                    <th>Létrehozó</th>
                                    <th style={{ width: 1 }}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {ads.map(a => (
                                    <tr key={a.id}>
                                        <td>{a.id}</td>
                                        <td>{a.title || '-'}</td>
                                        <td>{a.price != null ? `${a.price} Ft` : '-'}</td>
                                        <td>{a.createdAt ? new Date(a.createdAt).toLocaleString() : '-'}</td>
                                        <td>{resolveCreator(a)}</td>
                                        <td>
                                            <button className="btn danger" onClick={() => handleDeleteAd(a.id)}>
                                                Törlés
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>

                            </table>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
