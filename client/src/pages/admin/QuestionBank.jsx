import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionBank = () => {
  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject: "",
  });

  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [id, setId] = useState({ id: '' });
  const [editForm, setEditForm] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editForm) {
        await axios.put(`http://localhost:5000/api/question/${id.id}`, formData);
        alert('Question updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/question', formData);
        alert('Question added successfully');
      }
      setFormData({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "", subject: "" });
      setEditForm(false);
      setId({ id: '' });
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Sorry, try again later");
    }
  };

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/question');
    setData(res.data.data);

    const res1 = await axios.get('http://localhost:5000/api/subject');
    setSubjects(res1.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/question/${id}`);
      alert("Deleted Successfully");
      fetchData();
    } catch (err) { alert("Try Again Later"); }
  };

  const handleEdit = (q) => {
    setFormData({ ...q, subject: q.subject?._id || "" });
    setId({ id: q._id });
    setEditForm(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '25px',
      background: 'linear-gradient(135deg, #ff7b00, #ff5100)',
      display: 'flex',
      flexDirection: 'column',
      gap: '25px'
    }}>
      {/* 🌟 Form Card */}
      <div
        className="card"
        style={{
          padding: '25px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,0.35)"; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)"; }}
      >
        <h3 style={{
          color: "#f5f5f5",
          textShadow: "0 0 12px rgba(255,183,75,0.85)",
          marginBottom: "20px"
        }}>{editForm ? "Edit Question" : "Add Question"}</h3>

        <form onSubmit={handleSubmit}>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter Question Here"
            required
            style={{
              width: '100%',
              padding: '12px 15px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              outline: 'none',
              marginBottom: '12px',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.currentTarget.style.boxShadow = "0 0 12px rgba(255,183,75,0.7)"}
            onBlur={(e) => e.currentTarget.style.boxShadow = "none"}
          />
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input name="optionA" placeholder="Option A" value={formData.optionA} onChange={handleChange} style={{ flex: 1, ...{ padding: '12px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)', color: '#fff', outline: 'none', transition: 'all 0.3s ease' } }} required />
            <input name="optionB" placeholder="Option B" value={formData.optionB} onChange={handleChange} style={{ flex: 1, ...{ padding: '12px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)', color: '#fff', outline: 'none', transition: 'all 0.3s ease' } }} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input name="optionC" placeholder="Option C" value={formData.optionC} onChange={handleChange} style={{ flex: 1, ...{ padding: '12px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)', color: '#fff', outline: 'none', transition: 'all 0.3s ease' } }} required />
            <input name="optionD" placeholder="Option D" value={formData.optionD} onChange={handleChange} style={{ flex: 1, ...{ padding: '12px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)', color: '#fff', outline: 'none', transition: 'all 0.3s ease' } }} required />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input name="correctAnswer" placeholder="Correct Option" value={formData.correctAnswer} onChange={handleChange} style={{ flex: 1, ...{ padding: '12px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)', color: '#fff', outline: 'none', transition: 'all 0.3s ease' } }} required />
            <select
  name="subject"
  value={formData.subject}
  onChange={handleChange}
  required
  style={{
    flex: 1,
    padding: "12px 15px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.6)",
    background: "rgba(255,255,255,0.15)",   // makes dropdown transparent
    color: "#fff",                            // text color inside select
    outline: "none",
    appearance: "none",                       // removes default browser style
    WebkitAppearance: "none",
    MozAppearance: "none",
    transition: "all 0.3s ease"
  }}
>
  <option value="">Select Subject</option>
  {subjects.map((sub) => (
    <option key={sub._id} value={sub._id} style={{ backgroundColor: "#ff7b00", color: "#fff" }}>
      {sub.name}
    </option>
  ))}
</select>

          </div>

          <button
            type="submit"
            style={{
              marginTop: '18px',
              padding: '12px 28px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(90deg, #ff7b00, #ff5100)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseOver={e => { e.currentTarget.style.transform = "scale(1.08) translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 18px rgba(255,140,0,0.9)"; e.currentTarget.style.background = "linear-gradient(90deg, #ff9500, #ff5a00)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)"; e.currentTarget.style.background = "linear-gradient(90deg, #ff7b00, #ff5100)"; }}
          >
            {editForm ? "Update Question" : "Add Question"}
          </button>
        </form>
      </div>

      {/* 🌟 Table Card */}
      <div
        className="card"
        style={{
          padding: '25px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,0.35)"; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)"; }}
      >
        <h3 style={{ color: "#f5f5f5", textShadow: "0 0 12px rgba(255,183,75,0.85)", marginBottom: "20px" }}>Question List</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', textAlign: 'center' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
              <th>S.No.</th><th>Question</th><th>Subject</th><th>Option A</th><th>Option B</th><th>Option C</th><th>Option D</th><th>Correct</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? <tr><td colSpan="9" style={{ padding: '12px' }}>No questions found</td></tr> :
              data.map((q, i) => (
                <tr key={q._id} style={{ transition: 'all 0.3s ease' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,183,75,0.15)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <td>{i + 1}</td>
                  <td>{q.question}</td>
                  <td>{q.subject?.name}</td>
                  <td>{q.optionA}</td>
                  <td>{q.optionB}</td>
                  <td>{q.optionC}</td>
                  <td>{q.optionD}</td>
                  <td>{q.correctAnswer}</td>
                  <td>
                    <button style={{
                      marginRight: '6px',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'linear-gradient(90deg, #ffa500, #ff7b00)',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 14px rgba(255,140,0,0.8)'} onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)'} onClick={() => handleEdit(q)}>Edit</button>
                    <button style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'linear-gradient(90deg, #ff4b2b, #ff0000)',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 14px rgba(255,0,0,0.8)'} onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)'} onClick={() => handleDelete(q._id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionBank;
