import React, { useState } from "react";
import leaf1 from '../assets/img/leaf_01.png'
import leaf2 from '../assets/img/leaf_02.png'
import leaf3 from '../assets/img/leaf_03.png'
import leaf4 from '../assets/img/leaf_04.png'
import bg from '../assets/img/bg.jpg'
import girl from '../assets/img/girl.png'
import tree from '../assets/img/trees.png'
import axios from 'axios'

const Login = () => {
  const [form,setForm] = useState({
  email:"",
  password:""
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://exam-prep-3ee5.onrender.com/api/admin/login", form);
	console.log(res.data);
    if (res.data.message === "Login Successfully") {
      alert("Login successfully");
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userRole", res.data.user.role);
		
      window.location.href = "/userdash";
    } else {
      alert(res.data.message || "Login failed");
    }
  } catch (error) {
    console.error(error);
    alert("Sorry, Try Again");
  }
};


  return (
     <section>
		<div className="leaves">
			<div className="set">
				<div><img src={leaf1}/></div>
				<div><img src={leaf2}/></div>
				<div><img src={leaf3}/></div>
				<div><img src={leaf4}/></div>
				<div><img src={leaf1}/></div>
				<div><img src={leaf2}/></div>
				<div><img src={leaf3}/></div>
				<div><img src={leaf4}/></div>
			</div>
		</div>
		<img src={bg} className="bg"/>
		<img src={girl} className="girl"/>
		<img src={tree} className="trees"/>
		  <form action=""  method='POST' onSubmit={handleSubmit} >
             <div className="login">
                <h2> Login</h2>
                <div className="inputBox">
                    <input type="text" placeholder="Username" name='email' onChange={handleChange} />
                </div>
                <div className="inputBox">
                    <input type="password" placeholder="Password" name='password' onChange={handleChange} />
                </div>
                <div className="inputBox">
                    <button type="submit" className="btn btn-primary w-100" id="btn">
                  Login
                </button>
                </div>
                <div className="group">
                    <a href="#">Forget Password</a>
                    <a href="/registration">Signup</a>
                </div>
            </div>
           </form>
            
		
	</section>
  )
}

export default Login
