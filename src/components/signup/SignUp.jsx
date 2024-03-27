import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    portrait: '',
    isAdmin: false,
    rank: '',
    clearanceLevel: '',
    department: '',
    title: '',
    credits: 0,
    personalinfo: {
      first: '',
      last: '',
      nickname: '',
      age: '',
      dob: '',
      enlistDate: '',
      marital: '',
      homeplanet: '',
      military: '',
      education: '',
      favFood: '',
      favSport: '',
    }
  });

  const handleChange = (e) => {
    if (e.target.name.includes('.')) {
      const [parentKey, childKey] = e.target.name.split('.');
      setFormData({
        ...formData,
        [parentKey]: {
          ...formData[parentKey],
          [childKey]: e.target.value
        }
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://voyatikadb.onrender.com/api/user/add', formData);
      console.log(response.data.message); // Handle response appropriately
    } catch (error) {
      console.error('Error signing up:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input name="portrait" value={formData.portrait} onChange={handleChange} placeholder="Portrait URL" />
      <label>
        Admin:
        <input name="isAdmin" type="checkbox" checked={formData.isAdmin} onChange={handleChange} />
      </label>
      <select name="rank" value={formData.rank} onChange={handleChange} required>
        <option value="">Select Rank</option>
        {['SUPCOM', 'FA', 'VA', 'RA', 'CAPT', 'CDR', 'LCDR', 'LT', 'ENS', 'WO', 'CPO', 'PO', 'SN', 'No Rank'].map(rank => (
          <option key={rank} value={rank}>{rank}</option>
        ))}
      </select>
      {/* Repeat the above pattern for clearanceLevel, department, and other enum fields */}
      <input name="personalinfo.first" value={formData.personalinfo.first} onChange={handleChange} placeholder="First Name" required />
      {/* Repeat for other fields in personalinfo */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
