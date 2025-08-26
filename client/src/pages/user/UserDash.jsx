import React, { useState, useEffect } from "react";
import bg from "../../assets/img/bg.jpg";
import a1 from "../../assets/img/a1.jpg";
import { Outlet } from "react-router";

export default function UserDashboard() {
  const role = localStorage.getItem("userRole");
  if (role === "user") {
    var email = localStorage.getItem("userEmail");
  } else {
    window.location.href = "/";
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 🌅";
    if (hour < 18) return "Good Afternoon ☀️";
    return "Good Evening 🌙";
  };

  const handlelogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState("#session");

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleLinkClick = (href) => setActiveLink(href);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      className={isDarkMode ? "dark-mode" : ""}
    >
      {/* Blur Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? "rgba(0,0,0,0.7)"
            : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 0,
        }}
      ></div>

      {/* 🔹 Top Navbar */}
      <nav
        className="navbar navbar-dark px-3"
        style={{
          zIndex: 3,
          background:
            "linear-gradient(90deg, #ff7b00, #ff5100, #ff7b00)", // orange gradient
          boxShadow: "0 3px 12px rgba(0,0,0,0.3)",
          position: "sticky",
          top: 0,
        }}
      >
        <span className="navbar-brand fw-bold fs-5 text-white">
          ⚡ User Dashboard
        </span>
        <div className="mx-auto text-white fw-bold fs-6">{getGreeting()}</div>
        <div className="ms-auto d-flex align-items-center">
          <img
            src={a1}
            alt="Profile"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            className="me-2 profile-img"
          />
          <span className="text-white me-2 fw-semibold">{email}</span>
          <span className="badge bg-light text-dark shadow-sm">user</span>
        </div>
      </nav>

      {/* Layout */}
      <div className="d-flex flex-grow-1" style={{ position: "relative", zIndex: 1 }}>
        {/* 🔹 Sidebar */}
        <div
          className="col-md-2 p-0 sidebar"
          style={{
            height: "calc(100vh - 56px)",
            overflowY: "auto",
          }}
        >
          <ul className="list-unstyled m-0">
            {[
              { href: "/userdash/myexam", text: "📅 My Exam", key: "#session" },
              { href: "/userdash/myresult", text: "📚 My Result", key: "#subject" },
              { href: "/userdash/message", text: "📝 Message", key: "#examination" },
              { href: "/userdash/changepass", text: "🔑 Change Password", key: "#password" },
            ].map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className={`d-block sidebar-link ${
                    activeLink === item.key ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick(item.key)}
                >
                  {item.text}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#logout"
                className="d-block sidebar-link logout"
                onClick={handlelogout}
              >
                🚪 Log Out
              </a>
            </li>
            <li>
              <button
                className="btn btn-light w-100 mt-3 toggle-btn"
                onClick={toggleTheme}
              >
                <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>{" "}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </div>

        {/* 🔹 Main Content */}
        <div
          className="col-md-10 p-4"
          style={{
            height: "calc(100vh - 56px)",
            overflowY: "auto",
            background: isDarkMode
              ? "rgba(0,0,0,0.5)"
              : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* 🔹 Styling */}
     <style>{`
  /* 🌈 Sidebar Gradient + Glass Effect */
  .sidebar {
    background: linear-gradient(135deg, rgba(255,123,0,0.95), rgba(255,81,0,0.9));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-size: 300% 300%;
    animation: gradientShift 12s ease infinite;
    box-shadow: 4px 0 25px rgba(0,0,0,0.4);
    transition: width 0.4s ease, background 0.5s ease;
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* 📌 Sidebar Collapse */
  .sidebar.collapsed {
    width: 70px !important;
  }
  .sidebar.collapsed .sidebar-link span {
    display: none;
  }

  /* 🚪 Sidebar Links */
  .sidebar-link {
    text-decoration: none;
    font-weight: 500;
    color: #fff !important;
    padding: 12px 16px;
    border-radius: 10px;
    margin: 8px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  /* Glow & ripple effect on hover */
  .sidebar-link:hover {
    background: rgba(255,255,255,0.25);
    transform: translateX(10px) scale(1.05);
    box-shadow: 0 0 25px rgba(255, 160, 90, 0.8);
  }
  .sidebar-link:hover::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -50%;
    width: 200%;
    height: 300%;
    background: rgba(255,255,255,0.15);
    transform: rotate(25deg);
    animation: ripple 0.8s linear;
  }
  @keyframes ripple {
    from { left: -50%; }
    to { left: 120%; }
  }

  /* Active State Glow */
  .sidebar-link.active {
    background: rgba(255,255,255,0.35);
    border-left: 4px solid white;
    font-weight: 600;
    box-shadow: 0 0 30px rgba(255, 120, 0, 0.95);
  }

  /* 📌 Sidebar Tooltip */
  .sidebar-link[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 110%;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.85);
    color: white;
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 1;
    pointer-events: none;
    animation: fadeIn 0.3s ease forwards;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-50%) scale(0.9); }
    to { opacity: 1; transform: translateY(-50%) scale(1); }
  }

  /* 🚪 Logout */
  .logout:hover {
    background: linear-gradient(90deg, #ff4b2b, #ff0000) !important;
    transform: translateX(8px) scale(1.07);
    box-shadow: 0 0 18px rgba(255,0,0,0.7);
  }

  /* 🌗 Toggle Button */
  .toggle-btn {
    border-radius: 12px;
    transition: all 0.3s ease;
    background: rgba(255,255,255,0.15);
    padding: 6px 12px;
    cursor: pointer;
  }
  .toggle-btn:hover {
    background: rgba(255,255,255,0.35);
    transform: scale(1.1) rotate(8deg);
    box-shadow: 0 0 12px rgba(255,255,255,0.6);
  }

  /* 🧑 Profile Image */
  .profile-img {
    transition: all 0.3s ease;
    border-radius: 50%;
  }
  .profile-img:hover {
    transform: scale(1.2) rotate(8deg);
    box-shadow: 0 0 25px rgba(255, 120, 0, 1);
  }

  /* ✨ Navbar */
  .navbar {
    transition: box-shadow 0.3s ease, background 0.3s ease;
  }
  .navbar.scrolled {
    box-shadow: 0 4px 18px rgba(0,0,0,0.3);
    background: rgba(255, 120, 0, 0.95);
  }

  .navbar-brand {
    position: relative;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: white !important;
    transition: color 0.3s ease;
  }
  .navbar-brand::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    background: white;
    transition: width 0.3s ease;
  }
  .navbar-brand:hover {
    color: #ffe9d1 !important;
  }
  .navbar-brand:hover::after {
    width: 100%;
  }

  /* 🌙 Dark Mode Transition */
  body, .sidebar, .col-md-10 {
    transition: background 0.4s ease, color 0.4s ease;
  }

  /* 🎡 Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ff7b00, #ff5100);
    border-radius: 6px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.4);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #ff5100, #ff2d00);
  }
  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.15);
  }
`}</style>


    </div>
  );
}
