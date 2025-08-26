import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Examinee = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    course: '',
    branch: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/examinee');
        setData(res.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/examinee/${id}`);
      setData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      college: item.college,
      course: item.course,
      branch: item.branch,
      phone: item.phone
    });
    setEditingId(item._id);
    setEditFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await axios.put(`http://localhost:5000/api/examinee/${editingId}`, form);
      setForm({ name:'', email:'', college:'', course:'', branch:'', phone:'' });
      setEditingId(null);
      setEditFormVisible(false);
      const res = await axios.get('http://localhost:5000/api/examinee');
      setData(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '25px',
        background: 'linear-gradient(135deg, #ff7b00, #ff5100)',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      {/* Edit Form */}
      {editFormVisible && (
        <div
          className="card"
          style={{
            padding: '25px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 15px 45px rgba(0,0,0,0.25)',
            transition: 'all 0.4s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 25px 55px rgba(0,0,0,0.35)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 15px 45px rgba(0,0,0,0.25)';
          }}
        >
          <h3
            style={{
              color: '#ffb74b',
              textShadow: '0 0 15px rgba(255,183,75,0.85)',
              marginBottom: '20px',
              fontSize: '1.8rem'
            }}
          >
            Edit Examinee
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row" style={{ gap: '12px' }}>
              {['name','email','college','course','branch','phone'].map(field => (
                <div className="col-sm-4" key={field}>
                  <input
                    className="form-control"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    style={{
                      width: '100%',
                      padding: '12px 18px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.5)',
                      background: 'rgba(255,255,255,0.12)',
                      color: '#fff',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      fontWeight: 500
                    }}
                    onFocus={e => e.currentTarget.style.boxShadow = '0 0 15px rgba(255,183,75,0.8)'}
                    onBlur={e => e.currentTarget.style.boxShadow = 'none'}
                  />
                </div>
              ))}
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
                boxShadow: '0 6px 15px rgba(0,0,0,0.25)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255,140,0,0.9)';
                e.currentTarget.style.background = 'linear-gradient(90deg, #ff9500, #ff5a00)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.25)';
                e.currentTarget.style.background = 'linear-gradient(90deg, #ff7b00, #ff5100)';
              }}
            >
              Update Examinee
            </button>
          </form>
        </div>
      )}

      {/* Examinee Table */}
      <div
        className="card"
        style={{
          padding: '25px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 15px 45px rgba(0,0,0,0.25)',
          transition: 'all 0.4s ease',
          overflowX: 'auto'
        }}
        onMouseOver={e => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 25px 55px rgba(0,0,0,0.35)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 15px 45px rgba(0,0,0,0.25)';
        }}
      >
        <h3
          style={{
            color: "#f5f5f5",
            textShadow: '0 0 15px rgba(255,183,75,0.85)',
            marginBottom: '20px',
            fontSize: '1.8rem'
          }}
        >
          Examinee Details
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', textAlign: 'center', minWidth: '750px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>College</th>
              <th>Course</th>
              <th>Branch</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '12px' }}>No Examinee Found</td>
              </tr>
            ) : data.map((item, i) => (
              <tr
                key={item._id}
                style={{ transition: 'all 0.3s ease' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,183,75,0.15)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.college}</td>
                <td>{item.course}</td>
                <td>{item.branch}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      marginRight: '6px',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'linear-gradient(90deg, #ffa500, #ff7b00)',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                    }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 18px rgba(255,140,0,0.9)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'}
                  >Edit</button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'linear-gradient(90deg, #ff4b2b, #ff0000)',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                    }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 18px rgba(255,0,0,0.9)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Examinee;
