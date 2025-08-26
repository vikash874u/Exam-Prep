import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportGeneration = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/exams/report');
    setData(Array.isArray(res.data) ? res.data : [res.data]);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #fff8f0; }
            h2 { color: #ff7e5f; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; border-radius: 10px; overflow: hidden; }
            td, th { border: 1px solid #ff7e5f; padding: 10px; text-align: left; }
            th { background: linear-gradient(90deg, #ff7e5f, #feb47b); color: white; }
          </style>
        </head>
        <body>
          <h2>Exam Report - ${item.examTitle}</h2>
          <table>
            <tr><th>Examinee Name</th><td>${item.examineeName}</td></tr>
            <tr><th>Email</th><td>${item.examineeEmail}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            <tr><th>Date of Exam</th><td>${item.attemptedAt}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Internal advanced styling
  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #ff7b00, #ff5100, #ff9a3c, #ffa64d)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(255, 126, 95, 0.4)',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      padding: '2rem',
      width: '100%',
      maxWidth: '1200px',
    },
    title: {
      background: 'linear-gradient(135deg, #ff7b00, #ff5100, #ff9a3c, #ffa64d)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 'bold',
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      borderRadius: '12px',
      overflow: 'hidden',
    },
    th: {
      background: 'linear-gradient(135deg, #ff7b00, #ff5100, #ff9a3c, #ffa64d)',
      color: '#fff',
      fontWeight: 600,
      padding: '14px 20px',
      border: 'none',
      textAlign: 'center',
    },
    td: {
      padding: '12px 20px',
      borderBottom: '1px solid #ffd194',
      textAlign: 'center',
    },
    rowHover: { backgroundColor: 'rgba(255, 200, 150, 0.2)' },
    button: {
      background: 'linear-gradient(135deg, #ff7b00, #ff5100, #ff9a3c, #ffa64d)',
      border: 'none',
      color: '#fff',
      padding: '8px 14px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>Report Generation</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.N</th>
              <th style={styles.th}>Exam Name</th>
              <th style={styles.th}>Examinee Name</th>
              <th style={styles.th}>Total Marks</th>
              <th style={styles.th}>Score</th>
              <th style={styles.th}>Passing Marks</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={item._id}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 200, 150, 0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
              >
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{item.examTitle}</td>
                <td style={styles.td}>{item.examineeName}</td>
                <td style={styles.td}>{item.totalMarks}</td>
                <td style={styles.td}>{item.score}</td>
                <td style={styles.td}>{item.passingMarks}</td>
                <td style={styles.td}>{item.status}</td>
                <td style={styles.td}>{new Date(item.attemptedAt).toLocaleString()}</td>
                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    onClick={() => handlePrint(item)}
                  >
                    Generate Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportGeneration;
