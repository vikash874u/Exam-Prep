import React, { useEffect, useState } from 'react';
import leaf1 from '../assets/img/leaf_01.png';
import leaf2 from '../assets/img/leaf_02.png';
import leaf3 from '../assets/img/leaf_03.png';
import leaf4 from '../assets/img/leaf_04.png';
import bg from '../assets/img/bg.jpg';
import girl from '../assets/img/girl.png';
import tree from '../assets/img/trees.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    college: "",
    course: "",
    branch: "",
    session: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/examinee', form);
      alert("Registered Successfully");
      window.location.href='/'
    } catch (error) {
      alert('Sorry try again later');
    }
  };

  const [data, setData] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/session');
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <section aria-label="Registration Section">
      <div className="leaves">
        <div className="set">
          <div><img src={leaf1} alt="Leaf 1" /></div>
          <div><img src={leaf2} alt="Leaf 2" /></div>
          <div><img src={leaf3} alt="Leaf 3" /></div>
          <div><img src={leaf4} alt="Leaf 4" /></div>
          <div><img src={leaf1} alt="Leaf 1" /></div>
          <div><img src={leaf2} alt="Leaf 2" /></div>
          <div><img src={leaf3} alt="Leaf 3" /></div>
          <div><img src={leaf4} alt="Leaf 4" /></div>
        </div>
      </div>
      <img src={bg} className="bg" alt="Background" />
      <img src={girl} className="girl" alt="Girl" />
      <img src={tree} className="trees" alt="Trees" />

      <div className="registration">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit} method='POST'>
          <div className="inputBox">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" required onChange={handleChange} name='name' placeholder="Enter your name" />
          </div>

          <div className="inputBox">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" required onChange={handleChange} name='email' placeholder="Enter email" />
          </div>

          <div className="inputBox">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="tel" className="form-control" id="phone" required onChange={handleChange} name='phone' placeholder="Enter phone number" />
          </div>

          <div className="inputBox">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required onChange={handleChange} name='password' placeholder="Enter password" />
          </div>

          <div className="inputBox">
            <label htmlFor="college" className="form-label">College</label>
            <input type="text" className="form-control" id="college" required onChange={handleChange} name='college' placeholder="Enter college name" />
          </div>

          <div className="inputBox">
            <label htmlFor="course" className="form-label">Course</label>
            <input type="text" className="form-control" id="course" required onChange={handleChange} name='course' placeholder="Enter course name" />
          </div>

          <div className="inputBox">
            <label htmlFor="branch" className="form-label">Branch</label>
            <input type="text" className="form-control" id="branch" required onChange={handleChange} name='branch' placeholder="Enter branch name" />
          </div>

          {/* ✅ Dropdown for sessions */}
          <div className="inputBox">
            <label htmlFor="session" className="form-label">Session</label>
            <select className="form-control" id="session" required onChange={handleChange} name="session" value={form.session}>
              <option value="">Select Session</option>
              {data.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.name} ({session.description})
                </option>
              ))}
            </select>
          </div>

          <div className="inputBox">
            <button type="submit" className="btn btn-primary w-100" id="btn">
              Register
            </button>
          </div>
        </form>

        <div className="group">
          <a href="/">Already have an account? Login</a>
        </div>
      </div>
    </section>
  );
};

export default Registration;
