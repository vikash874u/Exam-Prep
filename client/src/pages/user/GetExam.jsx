import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

const GetExam = () => {
  const { id: examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const email = localStorage.getItem('userEmail');

  // Fetch exam and set initial state
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/exams/exam/${examId}`);
        const { exam: examData, questions: questionData } = res.data;
        setExam(examData);
        setQuestions(questionData);
        setTimeLeft(parseInt(examData.duration) * 60);
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError(err.response?.data?.error || 'Failed to load exam');
      }
    };
    fetchExam();
  }, [examId]);

  // Check if test is started within a time limit (e.g., 30 seconds)
  useEffect(() => {
    if (!exam || testStarted) return;

    const startTimeout = setTimeout(() => {
      if (!testStarted) {
        setError('Test expired: You did not start the test within the allowed time.');
        setSubmitted(true);
        navigate('/userdash/profile');
      }
    }, (1000*timeLeft)); // 30 seconds to start the test

    return () => clearTimeout(startTimeout);
  }, [exam, testStarted, navigate]);

  // Timer for exam duration
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted || !testStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, testStarted]);

  // Security: Prevent tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && testStarted && !submitted) {
        setError('Violation: Tab switching detected. Exam will be submitted.');
        handleSubmit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testStarted, submitted]);

  // Security: Disable cut, copy, paste
  useEffect(() => {
    const preventCopyPaste = (e) => {
      if (testStarted && !submitted) {
        e.preventDefault();
        setError('Violation: Cut/Copy/Paste detected. Exam will be submitted.');
        handleSubmit();
      }
    };

    document.addEventListener('cut', preventCopyPaste);
    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);

    return () => {
      document.removeEventListener('cut', preventCopyPaste);
      document.removeEventListener('copy', preventCopyPaste);
      document.removeEventListener('paste', preventCopyPaste);
    };
  }, [testStarted, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    if (!testStarted) setTestStarted(true); // Mark test as started when user answers a question
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitted) return;

    try {
      const res = await axios.post('http://localhost:5000/api/exams/submit-exam', {
        examId,
        answers,
        email,
      });
      setResult(res.data);
      setSubmitted(true);
      alert('Your Exam was submitted successfully. Result will be declared soon.');
      navigate('/userdash');
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError(err.response?.data?.error || 'Failed to submit exam');
    }
  };

  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  if (!exam || !questions.length) {
    return <div className="text-center m-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{exam.title}</h2>
      <div className="mb-3">
        <p><strong>Duration:</strong> {exam.duration} minutes</p>
        <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
        <p><strong>Passing Marks:</strong> {exam.passingMarks}</p>
        <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
      </div>

      { (
        <>
         
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {questions.map((q, index) => (
              <div key={q._id} className="card mb-3">
                <div className="card-body">
                  <h5>Question {index + 1}: {q.question}</h5>
                  <div className="form-check">
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={q.optionA}
                      checked={answers[q._id] === q.optionA}
                      onChange={() => handleAnswerChange(q._id, q.optionA)}
                      className="form-check-input"
                      id={`optionA-${q._id}`}
                      disabled={submitted}
                    />
                    <label className="form-check-label" htmlFor={`optionA-${q._id}`}>
                      {q.optionA}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={q.optionB}
                      checked={answers[q._id] === q.optionB}
                      onChange={() => handleAnswerChange(q._id, q.optionB)}
                      className="form-check-input"
                      id={`optionB-${q._id}`}
                      disabled={submitted}
                    />
                    <label className="form-check-label" htmlFor={`optionB-${q._id}`}>
                      {q.optionB}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={q.optionC}
                      checked={answers[q._id] === q.optionC}
                      onChange={() => handleAnswerChange(q._id, q.optionC)}
                      className="form-check-input"
                      id={`optionC-${q._id}`}
                      disabled={submitted}
                    />
                    <label className="form-check-label" htmlFor={`optionC-${q._id}`}>
                      {q.optionC}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={q.optionD}
                      checked={answers[q._id] === q.optionD}
                      onChange={() => handleAnswerChange(q._id, q.optionD)}
                      className="form-check-input"
                      id={`optionD-${q._id}`}
                      disabled={submitted}
                    />
                    <label className="form-check-label" htmlFor={`optionD-${q._id}`}>
                      {q.optionD}
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button type="submit" className="btn btn-primary" disabled={submitted}>
              Submit Exam
            </button>
          </form>
        </>
      )}
      <style>{`
/* 🌅 Container Gradient Background */
.container.mt-4 {
  background: linear-gradient(135deg, #ff7b00, #ff5100, #ff9a3c, #ffa64d);
  background-size: 400% 400%;
  animation: gradientBG 25s ease infinite;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
  transition: all 0.4s ease;
}

/* 🌈 Gradient Animation */
@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 🏷 Exam Header */
.container.mt-4 h2 {
  color: #fff;
  font-weight: 800;
  text-align: center;
  text-shadow: 2px 3px 8px rgba(0,0,0,0.4);
  margin-bottom: 25px;
}

/* 📄 Exam Info Cards */
.container.mt-4 .mb-3 p {
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
}

/* 🃏 Question Card Styling */
.card.mb-3 {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  border-left: 5px solid transparent;
}
.card.mb-3:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 14px 32px rgba(0,0,0,0.28);
  border-left: 5px solid #ff5100;
}

/* 📝 Question Title */
.card-body h5 {
  font-weight: 700;
  color: #ff5100;
  margin-bottom: 15px;
  transition: color 0.3s ease, transform 0.2s ease;
}
.card-body h5:hover {
  color: #ff7b00;
  transform: scale(1.02);
}

/* 🔘 Radio Inputs */
.form-check {
  margin-bottom: 12px;
  transition: all 0.3s ease;
}
.form-check-input {
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 2px solid #ff7b00;
  transition: all 0.3s ease;
}
.form-check-input:checked {
  background-color: #ff5100;
  border-color: #ff5100;
  box-shadow: 0 0 12px rgba(255,81,0,0.6);
}
.form-check-label {
  font-weight: 500;
  color: #333;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
}
.form-check-label:hover {
  color: #ff7b00;
  transform: scale(1.03);
}

/* ⏳ Timer Bar */
.timer-bar {
  height: 8px;
  border-radius: 12px;
  background: linear-gradient(90deg, #ff7b00, #ff5100);
  transition: width 1s linear;
  margin-bottom: 20px;
}

/* 🟢 Submit Button Enhanced */
.btn.btn-primary {
  width: 100%;
  background: linear-gradient(90deg, #ff7b00, #ff5100);
  border: none;
  padding: 14px;
  font-weight: 700;
  color: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(255,123,0,0.45);
  transition: all 0.3s ease, box-shadow 0.4s ease, transform 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.btn.btn-primary:hover {
  background: linear-gradient(90deg, #ff5100, #ff7b00);
  transform: scale(1.07) translateY(-2px);
  box-shadow: 0 14px 32px rgba(255,81,0,0.6), 0 0 15px rgba(255,123,0,0.5) inset;
}
.btn.btn-primary::after {
  content: "";
  position: absolute;
  left: -50%;
  top: 0;
  width: 200%;
  height: 100%;
  background: rgba(255,255,255,0.15);
  transform: skewX(-20deg);
  transition: all 0.5s ease;
}
.btn.btn-primary:hover::after {
  left: 100%;
}

/* ⚠️ Error Alert */
.alert.alert-danger {
  border-radius: 14px;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  text-align: center;
  animation: shake 0.3s ease;
}

/* 🔔 Shake animation for error */
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
`}</style>

    </div>
  );
};

export default GetExam;