import React, { useState, useEffect } from "react";
import conversationService from "../services/conversationService";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import "./OwnConversationListPage.css";
import PageSizeSelector from "../components/PageSizeSelector";

function OwnConversationListPage({ setCurrentPage, owner }) {
  const [conversations, setConversations] = useState([]);
  const [conversationUsers, setConversationUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(20);

  const navigate = useNavigate();

  useEffect(() => {
    const loadConversations = async () => {
      if (!owner) return;

      try {
        setLoading(true);

        // Beszélgetések lekérése
        const response = await conversationService.getConversationsByUserId(
          owner.id
        );
        const items = response || [];
        setConversations(items);

        // Partner felhasználók lekérése Promise.all segítségével
        const usersArray = await Promise.all(
          items.map(async (conv) => {
            const partnerId =
              conv.user1Id === owner.id ? conv.user2Id : conv.user1Id;
            try {
              const user = await userService.getUserByIdToAd(partnerId);
              return {
                convId: conv.id,
                user: user || {
                  userName: "Ismeretlen felhasználó",
                  id: partnerId,
                },
              };
            } catch (err) {
              console.error("Felhasználó betöltése sikertelen:", err);
              return {
                convId: conv.id,
                user: { userName: "Hiba a név betöltésekor", id: partnerId },
              };
            }
          })
        );

        const usersObj = {};
        usersArray.forEach((item) => {
          usersObj[item.convId] = item.user;
        });

        setConversationUsers(usersObj);
      } catch (err) {
        console.error("Beszélgetések betöltése sikertelen:", err);
        setError("Nem sikerült betölteni a beszélgetéseket.");
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
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
              <tr
                key={conversation.id}
                className={conversation.hasNewMessage ? "table-row-notification" : ""}
              >
                <td>
                  {conversationUsers[conversation.id]?.userName ||
                    "Betöltés..."}
                </td>
                <td>
                  <button
                    className="btn-open"
                    onClick={() => {
                      const user = conversationUsers[conversation.id];
                      if (user) navigate(`/chat/${user.id}`);
                    }}
                  >
                    Beszélgetés megnyitása
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

export default OwnConversationListPage;
