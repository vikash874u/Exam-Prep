import axios from 'axios';
import leaf1 from '../../assets/img/leaf_01.png';
import leaf2 from '../../assets/img/leaf_02.png';
import leaf3 from '../../assets/img/leaf_03.png';
import leaf4 from '../../assets/img/leaf_04.png';
import bg from '../../assets/img/bg.jpg';
import girl from '../../assets/img/girl.png';
import tree from '../../assets/img/trees.png';
import { useState } from 'react';

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', form);

      if (res.data.message === "Login Successfully") {
        alert('Login Successfully');
        localStorage.setItem('adminEmail', res.data.admin.email);
        localStorage.setItem('id', res.data.admin.id);
        localStorage.setItem("role", res.data.admin.role);

        window.location.href = '/addash';  // Redirect after successful login
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login Failed. Please check your credentials.");
    }
  };

  return (
    <section>
      <div className="leaves">
        <div className="set">
          <div><img src={leaf1} /></div>
          <div><img src={leaf2} /></div>
          <div><img src={leaf3} /></div>
          <div><img src={leaf4} /></div>
          <div><img src={leaf1} /></div>
          <div><img src={leaf2} /></div>
          <div><img src={leaf3} /></div>
          <div><img src={leaf4} /></div>
        </div>
      </div>
      <img src={bg} className="bg" />
      <img src={girl} className="girl" />
      <img src={tree} className="trees" />
      <form onSubmit={handelSubmit}>
        <div className="login">
          <h2>Admin Login</h2>
          <div className="inputBox">
            <input type="text" placeholder="Username" name='email' onChange={handelChange} />
          </div>
          <div className="inputBox">
            <input type="password" placeholder="Password" name='password' onChange={handelChange} />
          </div>
          <div className="inputBox">
            <button type="submit" className="btn btn-primary w-100" id="btn">
              Login
            </button>
          </div>
          <div className="group">
            <a href="#">Forget Password</a>
            <a href="">Signup</a>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
