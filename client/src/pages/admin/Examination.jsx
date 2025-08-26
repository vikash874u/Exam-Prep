import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Examination = () => {
  const [formData, setFormData] = useState({
    examName: '',
    date: '',
    time: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    sessionId: '',
    status: 'Scheduled',
    questionDistribution: [{ subject: '', numberOfQuestions: '' }],
  });

  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [exams, setExams] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [subjectRes, sessionRes, examRes] = await Promise.all([
        axios.get('http://localhost:5000/api/subject'),
        axios.get('http://localhost:5000/api/session'),
        axios.get('http://localhost:5000/api/exams/exams')
      ]);
      setSubjects(subjectRes.data || []);
      setSessions(sessionRes.data || []);
      setExams(examRes.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuestionDistChange = (index, e) => {
    const updated = [...formData.questionDistribution];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questionDistribution: updated });
  };

  const addDistributionField = () => {
    setFormData({
      ...formData,
      questionDistribution: [...formData.questionDistribution, { subject: '', numberOfQuestions: '' }],
    });
  };

  const removeDistributionField = (index) => {
    if (formData.questionDistribution.length === 1) return;
    const updated = [...formData.questionDistribution];
    updated.splice(index, 1);
    setFormData({ ...formData, questionDistribution: updated });
  };

  const validateForm = () => {
    if (!formData.examName || !formData.date || !formData.time || !formData.duration || !formData.totalMarks || !formData.passingMarks || !formData.sessionId) {
      return 'All fields are required';
    }
    if (parseInt(formData.passingMarks) > parseInt(formData.totalMarks)) return 'Passing marks cannot exceed total marks';
    if (formData.questionDistribution.some(d => !d.subject || !d.numberOfQuestions || parseInt(d.numberOfQuestions) <= 0)) return 'All question distributions must be valid';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      if (isEditing && editingExamId) {
        await axios.put(`http://localhost:5000/api/exams/${editingExamId}`, formData);
        alert('Exam Updated Successfully');
      } else {
        await axios.post('http://localhost:5000/api/exams', formData);
        alert('Exam Created Successfully');
      }
      setFormData({
        examName: '',
        date: '',
        time: '',
        duration: '',
        totalMarks: '',
        passingMarks: '',
        sessionId: '',
        status: 'Scheduled',
        questionDistribution: [{ subject: '', numberOfQuestions: '' }],
      });
      setIsEditing(false);
      setEditingExamId(null);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Error submitting form');
    }
  };

  const handleEdit = (exam) => {
    setFormData({
      examName: exam.title,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      sessionId: exam.sessionId._id,
      status: exam.status,
      questionDistribution: exam.questionDistribution || [{ subject: '', numberOfQuestions: '' }],
    });
    setEditingExamId(exam._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/exams/${id}`);
    fetchData();
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: 'linear-gradient(135deg, #ff7b00, #ff5100)' }}>
      {/* CSS for select and options */}
      <style>
        {`
          select.custom-select {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            border: 1px solid #ffb74b;
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
            background-repeat: no-repeat;
            background-position: right 10px top 50%;
            background-size: 12px;
            cursor: pointer;
          }
          select.custom-select:focus {
            outline: none;
            border-color: #ff5100;
            box-shadow: 0 0 5px rgba(255, 81, 0, 0.5);
          }
          select.custom-select option {
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 10px;
          }
          select.custom-select option:hover,
          select.custom-select option:focus,
          select.custom-select option:checked {
            background: rgba(255, 183, 75, 0.3);
            color: #fff;
          }
        `}
      </style>

      {/* Form Card */}
      <div style={{
        padding: '20px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
        marginBottom: '20px',
      }}>
        <h3 style={{ color: '#ffb74b', textShadow: '0 0 12px rgba(255, 183, 75, 0.85)' }}>
          {isEditing ? 'Edit Examination' : 'Create Examination'}
        </h3>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Form fields (Exam Name, Marks, Date, Time, Duration) */}
          <div className='row mb-2'>
            <div className='col-md-4'>
              <input
                type="text"
                placeholder="Exam Name"
                name="examName"
                value={formData.examName}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ffb74b', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                required
              />
            </div>
            <div className='col-md-4'>
              <input
                type="number"
                placeholder="Total Marks"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ffb74b', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                min="1"
                required
              />
            </div>
            <div className='col-md-4'>
              <input
                type="number"
                placeholder="Passing Marks"
                name="passingMarks"
                value={formData.passingMarks}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ffb74b', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                min="1"
                required
              />
            </div>
          </div>

          <div className='row mb-2'>
            <div className='col-md-4'>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ffb74b', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                required
              />
            </div>
            <div className='col-md-4'>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ffb74b', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                required
              />
            </div>
            <div className='col-md-4'>
              <input
                type="number"
                placeholder="Duration(mins)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ffb74b', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                min="1"
                required
              />
            </div>
          </div>

          {/* Session & Status */}
          <div className='row mb-2'>
            <div className='col-md-6'>
              <select
                name="sessionId"
                value={formData.sessionId}
                onChange={handleChange}
                className="custom-select"
                required
              >
                <option value="" disabled>Select Session</option>
                {sessions.map((session) => (
                  <option key={session._id} value={session._id}>
                    {session.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-6'>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="custom-select"
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Question Distribution */}
          <h5 style={{ color: '#ffb74b', marginTop: '10px' }}>Question Distribution</h5>
          {formData.questionDistribution.map((item, index) => (
            <div className="row mb-1" key={index}>
              <div className='col-md-6'>
                <select
                  name="subject"
                  value={item.subject}
                  onChange={(e) => handleQuestionDistChange(index, e)}
                  className="custom-select"
                  required
                >
                  <option value="" disabled>Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-md-4'>
                <input
                  type="number"
                  placeholder="No. of Questions"
                  name="numberOfQuestions"
                  value={item.numberOfQuestions}
                  onChange={(e) => handleQuestionDistChange(index, e)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ffb74b', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                  min="1"
                  required
                />
              </div>
              <div className='col-md-2'>
                <button
                  type="button"
                  onClick={() => removeDistributionField(index)}
                  style={{ background: 'red', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addDistributionField}
            style={{ background: 'orange', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '10px', marginTop: '5px' }}
          >
            + Add Subject
          </button>

          <button
  type="submit"
  style={{
    background: 'linear-gradient(90deg, #ff7b00, #ff5100)', // Gradient matching the form's theme
    color: '#fff',
    border: 'none',
    padding: '12px 24px', // Slightly increased padding for a bolder look
    borderRadius: '12px',
    marginTop: '10px',
    fontWeight: '600', // Bold text for emphasis
    fontSize: '16px', // Larger text for readability
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255, 123, 0, 0.4)', // Subtle glow effect
    transition: 'all 0.3s ease', // Smooth transitions for hover/active
    transform: 'translateY(0)', // Default position for hover effect
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 123, 0, 0.6)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 123, 0, 0.4)';
  }}
  onMouseDown={(e) => {
    e.currentTarget.style.transform = 'translateY(1px)';
    e.currentTarget.style.boxShadow = '0 2px 10px rgba(255, 123, 0, 0.3)';
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 123, 0, 0.6)';
  }}
>
  {isEditing ? 'Update Exam' : 'Create Exam'}
</button>
        </form>
      </div>

      {/* Examination Details Table */}
      <div style={{
        padding: '20px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
        marginTop: '20px',
      }}>
        <h3 style={{ color: '#ffb74b', textShadow: '0 0 12px rgba(255, 183, 75, 0.85)', marginBottom: '15px' }}>
          Examination Details
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', textAlign: 'center' }}>
          <thead style={{ borderBottom: '2px solid rgba(255, 183, 75, 0.5)' }}>
            <tr>
              <th>S.No.</th>
              <th>Exam Name</th>
              <th>Total Marks</th>
              <th>Passing Marks</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Session</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr
                key={exam._id}
                style={{ transition: '0.3s' }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 183, 75, 0.15)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td>{index + 1}</td>
                <td>{exam.title}</td>
                <td>{exam.totalMarks}</td>
                <td>{exam.passingMarks}</td>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
                <td>{exam.duration}</td>
                <td>{exam.sessionId?.name || 'N/A'}</td>
                <td>{exam.status}</td>
                <td>
                  <button
                    onClick={() => handleEdit(exam)}
                    style={{ marginRight: '5px', padding: '5px 12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(90deg, #ffa500, #ff7b00)', color: '#fff' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam._id)}
                    style={{ padding: '5px 12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(90deg, #ff4b2b, #ff0000)', color: '#fff' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {exams.length === 0 && <tr><td colSpan="10" style={{ padding: '10px' }}>No exams found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Examination;