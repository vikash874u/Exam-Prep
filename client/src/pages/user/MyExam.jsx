import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const MyExam = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/exams/exams');
    setData(res.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <div className="container-fluid p-0">
      <style>{`
        /* Card */
        .exam-card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          background: #fff;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-top: 15px;
        }
        .exam-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(0,0,0,0.25);
        }

        /* Title */
        .exam-title {
          color: #ff6a00;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0px 1px 2px rgba(0,0,0,0.2);
        }

        /* Table */
        .exam-table {
          border-radius: 10px;
          overflow: hidden;
        }
        .exam-table thead th {
          background: linear-gradient(90deg, #ff6a00, #ff3d00);
          color: white;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 12px;
          font-size: 14px;
        }
        .exam-table tbody tr {
          transition: all 0.3s ease;
          animation: fadeIn 0.6s ease;
        }
        .exam-table tbody tr:nth-child(odd) {
          background-color: #fffaf5;
        }
        .exam-table tbody tr:nth-child(even) {
          background-color: #fff3e5;
        }
        .exam-table tbody tr:hover {
          background-color: #ffe4cc;
          transform: scale(1.01);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .exam-table tbody td {
          padding: 10px;
          font-size: 14px;
          font-weight: 500;
        }

        /* Start Button */
        .start-btn {
          background: #ff6a00;
          border: none;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .start-btn:hover {
          background: #ff3d00;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(255,0,0,0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="row">
        <div className="col-sm-12">
          <div className="card p-3 exam-card">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="fw-bold exam-title">My Exams</h3>
            </div>

            <table className="table table-bordered text-center exam-table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Exam Name</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((exam, index) => (
                    <tr key={exam._id || index}>
                      <td>{index + 1}</td>
                      <td>{exam.title}</td>
                      <td>{exam.date}</td>
                      <td>{exam.duration}</td>
                      <td>
                        <Link
                          to={`/userdash/getexam/${exam._id}`}
                          className="btn btn-sm start-btn"
                        >
                          Start
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" align="center">No Exams Added</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExam;
