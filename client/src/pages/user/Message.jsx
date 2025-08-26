import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const userId = localStorage.getItem('userId');

  const fetchUserMessages = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/message/user/${userId}`);
      setMessages(res.data.message || []);
    } catch (err) {
      console.error('Error fetching user messages:', err);
    }
  };

  useEffect(() => { fetchUserMessages(); }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim()) return alert('Enter a message');
    try {
      await axios.post('http://localhost:5000/api/message', { question, examineeId: userId });
      setQuestion('');
      fetchUserMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const editMyMessage = async (id, currentText) => {
    const newText = prompt('Edit your message:', currentText);
    if (newText === null) return;
    try {
      await axios.put(`http://localhost:5000/api/message/edit/${id}`, {
        question: newText,
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error editing message:', err);
    }
  };

  const deleteByUser = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.put(`http://localhost:5000/api/message/delete/${id}`, {
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <div className="container p-3">
      <style>{`
  /* Headings */
  h2, h3 {
    color: #ff6a00;
    text-shadow: 0 1px 3px rgba(0,0,0,0.2);
    font-weight: 700;
    margin-bottom: 15px;
  }

  /* Form styling */
  form textarea {
    border-radius: 12px;
    padding: 12px;
    font-size: 14px;
    transition: all 0.3s ease;
    border: 1px solid #ffb74b;
  }
  form textarea:focus {
    border-color: #ff6a00;
    box-shadow: 0 0 10px rgba(255,106,0,0.4);
  }
  form button {
    background: #ff6a00;
    border: none;
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    border-radius: 10px;
    padding: 6px 20px;
  }
  form button:hover {
    background: #ff3d00;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(255,0,0,0.3);
  }

  /* Table */
  table {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    margin-top: 20px;
    background: linear-gradient(120deg, #fff8f0, #fff3e5);
  }
  thead tr {
    background: linear-gradient(90deg, #ff6a00, #ff3d00);
    color: white;
    font-weight: 700;
    text-transform: uppercase;
  }
  tbody tr {
    transition: all 0.3s ease;
    animation: fadeIn 0.6s ease;
    cursor: default;
  }
  tbody tr:nth-child(odd) {
    background-color: #fffaf5;
  }
  tbody tr:nth-child(even) {
    background-color: #fff3e5;
  }
  tbody tr:hover {
    background-color: #ffe4cc;
    transform: scale(1.01);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  /* Status badges */
  .status {
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 12px;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    display: inline-block;
  }
  .status.pending { background: #aaa; }
  .status.replied { background: #4caf50; }

  /* Buttons */
  .btn-warning {
    background: #ffb74b;
    border: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border-radius: 6px;
    padding: 4px 10px;
  }
  .btn-warning:hover {
    background: #ff9800;
    transform: scale(1.05);
  }
  .btn-danger {
    background: #f44336;
    border: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border-radius: 6px;
    padding: 4px 10px;
  }
  .btn-danger:hover {
    background: #d32f2f;
    transform: scale(1.05);
  }

  /* Fade-in animation */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Responsive table */
  @media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }
    thead tr {
      display: none;
    }
    tbody tr {
      margin-bottom: 15px;
      background: #fff3e5;
      border-radius: 12px;
      padding: 10px;
    }
    tbody td {
      text-align: right;
      padding-left: 50%;
      position: relative;
    }
    tbody td::before {
      content: attr(data-label);
      position: absolute;
      left: 15px;
      width: 45%;
      text-align: left;
      font-weight: 600;
    }
  }
`}</style>


      <h2>Send Feedback to Admin</h2>

      <form onSubmit={sendMessage}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="form-control mb-2"
          placeholder="Type your feedback..."
          rows="3"
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <hr />
      <h3>Your Messages</h3>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Feedback</th>
            <th>Admin Reply</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr><td colSpan="4">No feedback submitted</td></tr>
          ) : (
            messages.map((msg, idx) => (
              <tr key={msg._id}>
                <td>{idx + 1}</td>
                <td>{msg.question}</td>
                <td>{msg.answer || 'No reply yet'}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-1" onClick={() => editMyMessage(msg._id, msg.question)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteByUser(msg._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Message;
