import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      email: email,
      password: password,
    }
    const apiUrl = 'http://localhost:8000/auth/signup/'
    
    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post( apiUrl, postData);
      console.log(response.data);
      
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.email) {
        toast.error("Email is already registered");
      } else {
        toast.error("An error occurred during sign-up");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
       
        <label htmlFor="email">Enter your Email</label>
        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

        <label htmlFor="password">Enter your Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

        <label htmlFor="password2">Confirm your Password</label>
        <input type="password" name="password2" id="password2" value={password2} onChange={e => setPassword2(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;

  /* const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }
    fetch('http://localhost:8000/signup/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      })
    }).then(res => res.json()).then(data => {
      console.log(data);
      
    }).catch(error => {
      if (error.response.status === 400 && error.response.data.email) {
        toast.error("Email is already registered");
      } else {
        toast.error("An error occurred during sign-up");
      }
    });
  } */