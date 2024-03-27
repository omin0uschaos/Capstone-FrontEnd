import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'

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
      const response = await axios.post('https://voyatikadb.onrender.com/api/users/user/add', formData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error signing up:', error.response.data.message);
    }
  };

  return (
    <div id='signUpFormDiv'>
<form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        name="portrait"
        value={formData.portrait}
        onChange={handleChange}
        placeholder="Portrait URL"
      />
        <select name="rank" value={formData.rank} onChange={handleChange} required>
          <option value="">Select Rank</option>
          {['SUPCOM', 'FA', 'VA', 'RA', 'CAPT', 'CDR', 'LCDR', 'LT', 'ENS', 'WO', 'CPO', 'PO', 'SN', 'No Rank'].map(
            (rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            )
          )}
        </select>

        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          {['CMD', 'XO', 'OPS', 'ENG', 'COMMS', 'MED', 'INT', 'SEC', 'SCI', 'NAV', 'LOG', 'SPC', 'ENL', 'No Job'].map(
            (dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            )
          )}
        </select>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />

      <h3>Personal Information</h3>
      <input
        name="personalinfo.first"
        value={formData.personalinfo.first}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="personalinfo.last"
        value={formData.personalinfo.last}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        name="personalinfo.nickname"
        value={formData.personalinfo.nickname}
        onChange={handleChange}
        placeholder="Nickname"
      />
      <input name="personalinfo.age" type="number" value={formData.personalinfo.age} onChange={handleChange} placeholder="Age" />
      <input name="personalinfo.dob" value={formData.personalinfo.dob} onChange={handleChange} placeholder="Date of Birth" />
        <select
          name="personalinfo.homeplanet"
          value={formData.personalinfo.homeplanet}
          onChange={handleChange}
        >
          <option value="">Select Homeplanet</option>
          {['Earth', 'Luna Prime', 'Enceladus', 'Mars', 'Europa', 'Ganymede', 'Titan'].map((planet) => (
            <option key={planet} value={planet}>
              {planet}
            </option>
          ))}
        </select>


        <select
          name="personalinfo.military"
          value={formData.personalinfo.military}
          onChange={handleChange}
        >
          <option value="">Select Military Branch</option>
          {['EDF', 'LSC', 'EUF', 'MSG', 'JV', 'TS', 'Non-Military'].map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      <button type="submit">Sign Up</button>
    </form>

    </div>
  );
};

export default SignUp;
