import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyResult = () => {
  const [data, setData] = useState([])
  const userId = localStorage.getItem('userId')

  const handlefetch = async () => {
    const res = await axios.get(`http://localhost:5000/api/exams/examinee-result/${userId}`);
    setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);
  }

  useEffect(() => {
    handlefetch()
  }, [])

  return (
    <div>
      {/* 🔹 Custom Styling */}
      <style>{`
        .result-card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          background: #fff;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .result-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(0,0,0,0.25);
        }
        .result-title {
          color: #ff6a00;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
        }
        .result-table {
          border-radius: 10px;
          overflow: hidden;
        }
        .result-table thead td {
          background: linear-gradient(90deg, #ff6a00, #ff3d00);
          color: white;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 12px;
          font-size: 14px;
        }
        .result-table tbody tr {
          transition: all 0.4s ease;
          animation: fadeIn 0.6s ease;
        }
        .result-table tbody tr:nth-child(odd) {
          background-color: #fffaf5;
        }
        .result-table tbody tr:nth-child(even) {
          background-color: #fff3e5;
        }
        .result-table tbody tr:hover {
          background-color: #ffe4cc;
          transform: scale(1.01);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .result-table tbody td {
          padding: 10px;
          font-size: 14px;
          font-weight: 500;
        }
        .result-table tbody td:hover {
          background: rgba(255,106,0,0.1);
        }
        .status-badge {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          animation: fadeIn 0.6s ease;
        }
        .status-pass {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #2e7d32;
        }
        .status-fail {
          background: #ffebee;
          color: #d32f2f;
          border: 1px solid #d32f2f;
        }
        .date-badge {
          background: #f5f5f5;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #555;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="row mt-1">
        <div className="col-sm-12">
          <div className="card mx-auto mt-2 result-card">
            <div className="card-body">
              <div className="container p-0">
                <h3 className="result-title">Examinee Result</h3>

                {/* 📊 Table */}
                <table className="table table-bordered text-center result-table">
                  <thead>
                    <tr>
                      <td>S.N</td>
                      <td>Exam Name</td>
                      <td>Your Name</td>
                      <td>Total Marks</td>
                      <td>Score</td>
                      <td>Passing Marks</td>
                      <td>Status</td>
                      <td>Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .filter(item => item)
                      .map((item, i) => (
                        <tr key={item._id || i}>
                          <td>{i + 1}</td>
                          <td>{item.examId?.title || "N/A"}</td>
                          <td>{item.examineeId?.name || item.examineeId || "N/A"}</td>
                          <td>{item.totalMarks ?? "N/A"}</td>
                          <td>{item.score ?? "N/A"}</td>
                          <td>{item.passingMarks ?? "N/A"}</td>
                          <td>
                            <span className={`status-badge ${item.status === "Pass" ? "status-pass" : "status-fail"}`}>
                              {item.status ?? "N/A"}
                            </span>
                          </td>
                          <td>
                            <span className="date-badge">
                              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyResult
