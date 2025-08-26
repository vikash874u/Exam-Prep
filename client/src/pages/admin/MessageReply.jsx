import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageReply = () => {
  const [messages, setMessages] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});

  const fetchAll = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/message/all');
      setMessages(res.data.message || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const sendReply = async (id) => {
    const answer = (replyInputs[id] || '').trim();
    if (!answer) return alert('Please type a reply.');
    try {
      await axios.put(`http://localhost:5000/api/message/reply/${id}`, { answer, role: 'admin' });
      setReplyInputs((prev) => ({ ...prev, [id]: '' }));
      fetchAll();
    } catch (err) {
      console.error('Error sending reply:', err);
    }
  };

  const editReply = async (id, currentReply) => {
    const newReply = prompt('Edit reply:', currentReply || '');
    if (newReply === null) return;
    try {
      await axios.put(`http://localhost:5000/api/message/reply/${id}`, { answer: newReply, role: 'admin' });
      fetchAll();
    } catch (err) {
      console.error('Error editing reply:', err);
    }
  };

  const deleteByAdmin = async (id) => {
    if (!window.confirm('Delete this reply?')) return;
    try {
      await axios.put(`http://localhost:5000/api/message/delete/${id}`, { role: 'admin' });
      fetchAll();
    } catch (err) {
      console.error('Error deleting reply:', err);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #ff7b00, #ff5100)',
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      color: '#fff',
      fontFamily: "'Poppins', sans-serif",
    },
    card: {
      borderRadius: '20px',
      padding: '25px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(14px)',
      boxShadow: '0 20px 45px rgba(0,0,0,0.3)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      color: '#fff',
      textAlign: 'center',
    },
    th: {
      padding: '12px',
      fontWeight: 700,
      textShadow: '0 0 8px rgba(0,0,0,0.3)',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      transition: 'background 0.3s ease',
    },
    input: {
      width: '100%',
      padding: '10px 15px',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.6)',
      background: 'rgba(255,255,255,0.15)',
      color: '#fff',
      outline: 'none',
      boxShadow: '0 0 0 rgba(255,255,255,0)',
      transition: 'all 0.3s ease',
    },
    button: {
      padding: '6px 14px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      fontWeight: 600,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
    },
    sendBtn: {
      background: 'linear-gradient(90deg, #ff7b00, #ff5100)',
    },
    editBtn: {
      background: 'linear-gradient(90deg, #ffa500, #ff7b00)',
    },
    deleteBtn: {
      background: 'linear-gradient(90deg, #ff4b2b, #ff0000)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{
        textAlign: 'center',
        color: "#f5f5f5",
        textShadow: '0 0 15px rgba(255,183,75,0.85)',
        marginBottom: '20px',
      }}>
        Admin - User Messages
      </h2>

      <div
        style={styles.card}
        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.35)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.3)'; }}
      >
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No.</th>
              <th style={styles.th}>Examinee</th>
              <th style={styles.th}>Feedback</th>
              <th style={styles.th}>Admin Reply</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td style={styles.td} colSpan="5">No messages found</td>
              </tr>
            ) : messages.map((msg, idx) => (
              <tr
                key={msg._id}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,183,75,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>
                  {msg.examineeId?.name || 'N/A'}
                  <div style={{ fontSize: '0.85em', color: '#ffd194' }}>{msg.examineeId?.email || ''}</div>
                </td>
                <td style={styles.td}>{msg.question}</td>
                <td style={styles.td}>{msg.answer || 'No reply yet'}</td>
                <td style={{ ...styles.td, minWidth: 250 }}>
                  <input
                    type="text"
                    placeholder="Type reply..."
                    value={replyInputs[msg._id] || ''}
                    onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                    style={styles.input}
                    onFocus={e => e.currentTarget.style.boxShadow = '0 0 12px rgba(255,183,75,0.7)'}
                    onBlur={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(255,255,255,0)'}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px', justifyContent: 'center' }}>
                    <button style={{ ...styles.button, ...styles.sendBtn }}
                      onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 18px rgba(255,140,0,0.9)'}
                      onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'}
                      onClick={() => sendReply(msg._id)}
                    >Send</button>

                    <button style={{ ...styles.button, ...styles.editBtn }}
                      onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 18px rgba(255,200,0,0.9)'}
                      onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'}
                      onClick={() => editReply(msg._id, msg.answer)}
                    >Edit</button>

                    <button style={{ ...styles.button, ...styles.deleteBtn }}
                      onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 18px rgba(255,0,0,0.9)'}
                      onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'}
                      onClick={() => deleteByAdmin(msg._id)}
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageReply;
