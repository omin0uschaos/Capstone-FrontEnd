import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('https://voyatikadb.onrender.com/api/users/login', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setLoginStatus('Login successful');
        navigate('/home'); 
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setLoginStatus(error.response.data.message || 'Login failed');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setLoginStatus('Network error, please try again');
      } else {
        console.error('Error message:', error.message);
        setLoginStatus('Error, please try again');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
}

export default LoginForm;
