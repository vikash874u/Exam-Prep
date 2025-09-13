import axios from "axios";
import { useState } from "react";

const ChangePassword = () => {
  const id = localStorage.getItem('userId');
  const [form, setForm] = useState({
    op: '',
    np: '',
    cnp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.put(`https://exam-prep-3ee5.onrender.com/api/examinee/change/${id}`, form);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
          backgroundColor: "#ffffffee",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#ff5100" }}>
          🔑 Change Password
        </h3>

        <form onSubmit={handlSubmit} method="POST">
          <div className="mb-3">
            <label className="form-label fw-semibold">Current Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter current password"
              required
              name="op"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              required
              name="np"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              required
              name="cnp"
              onChange={handleChange}
            />
          </div>

          <style>{`
            /* 🌅 Orange Gradient Background Animation */
            .d-flex.vh-100 {
              background: linear-gradient(135deg, #ff7b00, #ff5100, #ff9a3c, #ffa64d);
              background-size: 400% 400%;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              animation: gradientBG 20s ease infinite;
              transition: all 0.3s ease;
            }

            @keyframes gradientBG {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            /* 🌟 Card Styling */
            .card {
              width: 420px;
              border-radius: 20px;
              background-color: rgba(255, 255, 255, 0.85);
              backdrop-filter: blur(12px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
              padding: 30px 25px;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 35px rgba(0, 0, 0, 0.45);
            }

            /* ✨ Heading */
            h3 {
              text-align: center;
              font-weight: 700;
              color: #ff5100;
              margin-bottom: 25px;
              letter-spacing: 1px;
              text-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }

            /* 📝 Input Fields - Floating effect */
            .form-control {
              border-radius: 12px;
              padding: 14px 12px;
              font-size: 16px;
              border: 1.5px solid #ccc;
              transition: 0.3s ease all;
            }
            .form-control:focus {
              border-color: #ff7b00;
              box-shadow: 0 0 8px rgba(255,123,0,0.4);
              outline: none;
              transform: scale(1.02);
            }

            /* 🔒 Button Styling */
            .change-password-btn {
              border-radius: 12px;
              font-weight: 600;
              font-size: 16px;
              color: #fff;
              padding: 14px;
              background: linear-gradient(90deg, #ff7b00, #ff5100);
              border: 2px solid transparent;
              width: 100%;
              box-shadow: 0 6px 15px rgba(255, 123, 0, 0.4);
              transition: all 0.3s ease;
              transform: perspective(500px) translateY(0) scale(1) rotateX(0deg);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;
              animation: glow 2s infinite ease-in-out;
              text-shadow: 0 0 2px rgba(255, 255, 255, 0.2);
            }
            .change-password-btn:hover {
              background: linear-gradient(90deg, #ff5100, #ff7b00);
              transform: perspective(500px) translateY(-2px) scale(1.03) rotateX(3deg);
              box-shadow: 0 12px 25px rgba(255, 81, 0, 0.6);
              border-color: rgba(255, 255, 255, 0.5);
              text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
            }
            .change-password-btn:active {
              transform: perspective(500px) translateY(1px) scale(0.98) rotateX(-2deg);
              box-shadow: 0 2px 10px rgba(255, 123, 0, 0.3);
            }
            .change-password-btn:focus {
              outline: none;
              box-shadow: 0 0 0 3px rgba(255, 81, 0, 0.5);
            }
            .change-password-btn:disabled {
              opacity: 0.6;
              cursor: not-allowed;
              transform: perspective(500px) translateY(0) scale(1) rotateX(0deg);
              box-shadow: 0 6px 15px rgba(255, 123, 0, 0.2);
              animation: none;
            }
            .change-password-btn::before {
              content: url("data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'><path d='M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zm9.1 14H6V10h12v10z'/></svg>");
              margin-right: 8px;
              display: inline-block;
              width: 18px;
              height: 18px;
              vertical-align: middle;
              transition: transform 0.3s ease;
            }
            .change-password-btn:hover::before {
              transform: scale(1.2) translateY(-1px);
            }
            .change-password-btn::after {
              content: '';
              position: absolute;
              top: var(--y, 50%);
              left: var(--x, 50%);
              width: 0;
              height: 0;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              transform: translate(-50%, -50%);
              transition: width 0.5s ease, height 0.5s ease, opacity 0.5s ease;
              opacity: 1;
            }
            .change-password-btn:hover::after {
              width: 300%;
              height: 300%;
              opacity: 0;
            }
            @keyframes glow {
              0% { border-color: transparent; box-shadow: 0 6px 15px rgba(255, 123, 0, 0.4); }
              50% { border-color: rgba(255, 255, 255, 0.5); box-shadow: 0 6px 20px rgba(255, 123, 0, 0.6); }
              100% { border-color: transparent; box-shadow: 0 6px 15px rgba(255, 123, 0, 0.4); }
            }
            .change-password-btn .spinner {
              border: 2px solid transparent;
              border-top: 2px solid #fff;
              border-right: 2px solid #ff5100;
              border-radius: 50%;
              width: 18px;
              height: 18px;
              animation: spin 0.8s linear infinite;
              margin-right: 8px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            /* 💡 Label Styling */
            .form-label {
              font-weight: 600;
              color: #333;
              margin-bottom: 6px;
            }

            /* ✅ Optional: Add small icons next to input labels */
            .form-label::before {
              content: "🔑 ";
            }
          `}</style>

          <button
            type="submit"
            className="change-password-btn w-100 fw-bold"
            disabled={isSubmitting}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
            }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              <>Change Password</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
