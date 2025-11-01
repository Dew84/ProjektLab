import React, { useState, useEffect } from 'react';
import PageSizeSelector from '../components/PageSizeSelector';
import conversationService from '../services/conversationService';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

function OwnConversationListPage({ setCurrentPage, owner }) {
    const [conversations, setConversations] = useState([]);
    const [conversationUsers, setConversationUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(20);

    const navigate = useNavigate();

    useEffect(() => {
        const loadConversations = async () => {
            try {
                setLoading(true);
                const response = await conversationService.getConversationsByUserId( owner.id );
                const items = response || [];
                setConversations(items);

                const users = {};
                await Promise.all(
                    items.map(async (conv) => {
                        try {
                            const partnerId =
                                conv.user1Id === owner.id
                                    ? conv.user2Id
                                    : conv.user1Id;
                            const user = await userService.getUserByIdToAd(partnerId);
                            users[conv.Id] = user || 'Ismeretlen felhasználó';
                        } catch (err) {
                            console.error('Felhasználó betöltése sikertelen:', err);
                            users[conv.Id] = 'Hiba a név betöltésekor';
                        }
                    })
                );

                setConversationUsers(users);
            } catch (err) {
                console.error('Beszélgetések betöltése sikertelen:', err);
                setError('Nem sikerült betölteni a beszélgetéseket.');
            } finally {
                setLoading(false);
            }
        };

        if (owner) {
            loadConversations();
        }
    }, [pageSize, owner]);

    if (loading) return <div>Betöltés...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="adlist-page">
            <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
            <div className="table-container">
                <table className="ad-table">
                    <thead>
                        <tr>
                            <th>Felhasználó</th>
                            <th>Művelet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conversations.map((conversation) => (
                            <tr key={conversation.Id}>
                                <td>{conversationUsers[conversation.Id].userName || 'Betöltés...'}</td>
                                <td>
                                    <button onClick={() => navigate(`/chat/${conversationUsers[conversation.Id].id}`)}> Beszélgetés megnyitása </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OwnConversationListPage;
