import React, { useState, useEffect } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Count-up animation hook
const useCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
  }, [target, duration]);
  return count;
};

export default function DashboardAdmin() {
  const [date, setDate] = useState(new Date());
  const tests = useCounter(12);
  const passed = useCounter(8);

  const data = [
    { name: "Jan", Tests: 3, Passed: 2 },
    { name: "Feb", Tests: 4, Passed: 3 },
    { name: "Mar", Tests: 5, Passed: 4 },
    { name: "Apr", Tests: 2, Passed: 1 },
  ];

  const events = [
    { title: "Maths Exam", time: "2:00 PM" },
    { title: "Science Quiz", time: "5:00 PM" },
    { title: "English Test", time: "Tomorrow 10:00 AM" },
  ];

  return (
    <div className="container-fluid mt-4">
      {/* Cards */}
      <div className="row g-4">
        {/* Card 1 */}
        <div className="col-md-6">
          <Card
            className="border-0 rounded-4 shadow-lg text-white"
            style={{
              background: "linear-gradient(135deg, rgba(102,126,234,0.9), rgba(118,75,162,0.85))",
              backdropFilter: "blur(14px)",
              transition: "0.3s",
            }}
          >
            <Card.Body className="text-center p-4">
              <div className="mb-3 d-flex justify-content-center">
                <div
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    padding: "15px",
                  }}
                >
                  📘
                </div>
              </div>
              <h5 className="fw-bold">Tests Given</h5>
              <h1 className="fw-bold display-5">{tests}</h1>
              <ProgressBar now={(tests / 20) * 100} variant="info" className="mb-2" />
              <small>Total exams attempted</small>
            </Card.Body>
          </Card>
        </div>

        {/* Card 2 */}
        <div className="col-md-6">
          <Card
            className="border-0 rounded-4 shadow-lg text-white"
            style={{
              background: "linear-gradient(135deg, rgba(56,239,125,0.9), rgba(17,153,142,0.85))",
              backdropFilter: "blur(14px)",
              transition: "0.3s",
            }}
          >
            <Card.Body className="text-center p-4">
              <div className="mb-3 d-flex justify-content-center">
                <div
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    padding: "15px",
                  }}
                >
                  ✅
                </div>
              </div>
              <h5 className="fw-bold">Students Passed</h5>
              <h1 className="fw-bold display-5">{passed}</h1>
              <ProgressBar now={(passed / 15) * 100} variant="success" className="mb-2" />
              <small>Total students succeeded</small>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Graph + Calendar */}
      <div className="row g-4 mt-4">
        {/* Graph */}
        <div className="col-md-8">
          <Card className="border-0 rounded-4 shadow-lg">
            <Card.Body>
              <h5 className="fw-bold mb-3">📊 Performance Statistics</h5>
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={data} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="Tests" fill="url(#colorTests)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="Passed" fill="url(#colorPassed)" radius={[6, 6, 0, 0]} />
                    <Line
                      type="monotone"
                      dataKey="Passed"
                      stroke="#11998e"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                    <defs>
                      <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#764ba2" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="colorPassed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38ef7d" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#11998e" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Calendar */}
        <div className="col-md-4">
          <Card className="border-0 rounded-4 shadow-lg">
            <Card.Body>
              <h5 className="fw-bold mb-3">📅 Calendar</h5>
              <div className="p-2 rounded bg-light">
                <Calendar
                  value={date}
                  onChange={setDate}
                  tileClassName={({ date, view }) =>
                    date.toDateString() === new Date().toDateString()
                      ? "bg-gradient text-white rounded-circle"
                      : null
                  }
                />
              </div>

              {/* Events List */}
              <div className="mt-3 p-3 rounded bg-white shadow-sm" style={{ maxHeight: "180px", overflowY: "auto" }}>
                <h6 className="fw-bold">Upcoming Events</h6>
                {events.map((event, i) => (
                  <p key={i} className="mb-1">
                    <b>{event.title}</b> – {event.time}
                  </p>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
