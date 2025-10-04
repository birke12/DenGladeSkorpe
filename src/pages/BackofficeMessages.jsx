import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import styles from "../styles/pageStyles/backofficeMessages.module.css";

const BackofficeMessages = () => {
  // Henter funktioner fra useFetch hook til at lave API kald
  const { get, del, error, isLoading } = useFetch();
  // State til at gemme alle beskeder i
  const [messages, setMessages] = useState([]);

  // useEffect kører når siden loader - henter alle beskeder fra API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesData = await get.messages();
        setMessages(messagesData.data); // Gemmer beskederne i state
      } catch (err) {
        console.error("Fejl ved hentning af beskeder:", err);
      }
    };
    fetchMessages(); // Kalder funktionen med det samme
  }, []); // Tom array betyder det kun kører én gang

  // Funktion til at slette en besked
  const handleDeleteMessage = async (messageId) => {
    // Spørg brugeren om de er sikre før sletning
    if (window.confirm("Er du sikker på, at du vil slette denne besked?")) {
      try {
        await del.messages(messageId); // Sletter fra database
        alert("Besked slettet!");
        // Henter alle beskeder igen så listen bliver opdateret
        const messagesData = await get.messages();
        setMessages(messagesData.data);
      } catch (err) {
        console.error("Fejl ved sletning af besked:", err);
      }
    }
  };

  // Funktion til at ændre om en besked er læst eller ulæst
  const toggleReadStatus = async (messageId, currentStatus) => {
    try {
      // Her burde der være et PUT endpoint til at opdatere beskeder
      // await put.messages(messageId, { read: !currentStatus });
      // Men indtil videre opdaterer jeg bare lokalt i state
      setMessages((prev) =>
        prev.map((msg) =>
          // Finder den rigtige besked og ændrer status til det modsatte
          msg._id === messageId ? { ...msg, status: !currentStatus } : msg
        )
      );
    } catch (err) {
      console.error("Fejl ved opdatering af besked status:", err);
    }
  };

  // Hvis siden loader, vis loading tekst
  if (isLoading) return <p>Indlæser...</p>;
  // Hvis der er en fejl, vis fejlbesked
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.backofficeMessages}>
      <section>
        <h1>Besked Administration</h1>
        <p>
          <Link to="/backoffice">Tilbage til Backoffice</Link>
        </p>
      </section>

      {/* Her vises listen med alle beskeder */}
      <section>
        <h2>Indkomne Beskeder ({messages.length})</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              {/* Kolonneoverskrifter til tabellen */}
              <th>Navn</th>
              <th>Emne</th>
              <th>Besked</th>
              <th>Status</th>
              <th>Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {/* Går igennem alle beskeder og laver en række til hver */}
            {messages.map((message) => (
              <tr
                key={message._id}
                // Hvis beskeden er læst, bruges read style, ellers unread
                className={message.status ? styles.read : styles.unread}
              >
                {/* Viser navnet - prøver først engelsk så dansk */}
                <td>{message.name || message.navn || "-"}</td>
                {/* Viser emnet */}
                <td>{message.subject || message.emne || "-"}</td>
                {/* Viser beskedens indhold */}
                <td className={styles.messageCell}>
                  {message.description ||
                    message.beskrivelse ||
                    message.message ||
                    "-"}
                </td>
                <td>
                  <span
                    className={`${styles.status} ${
                      message.status ? styles.statusRead : styles.statusUnread
                    }`}
                  >
                    {message.status ? "Læst" : "Ulæst"}
                  </span>
                </td>
                <td className={styles.tableActions}>
                  {/* Knap til at skifte mellem læst/ulæst */}
                  <button
                    onClick={() =>
                      toggleReadStatus(message._id, message.status)
                    }
                    className={styles.toggleBtn}
                  >
                    {message.status ? "Marker som ulæst" : "Marker som læst"}
                  </button>
                  {/* Knap til at slette beskeden */}
                  <button
                    onClick={() => handleDeleteMessage(message._id)}
                    className={styles.deleteBtn}
                  >
                    Slet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Hvis der ikke er nogen beskeder, vis denne besked */}
        {messages.length === 0 && (
          <div className={styles.noMessages}>
            <p>Ingen beskeder endnu.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default BackofficeMessages;
