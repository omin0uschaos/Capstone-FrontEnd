import axios from 'axios';
import { useState, useEffect } from 'react';
import './CrewDB.css';

function CrewDB() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPortraitUrl, setUserPortraitUrl] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    first: '',
    last: '',
    nickname: '',
    department: '',
    rank: '',
    title: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://voyatikadb.onrender.com/api/users', {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  const fetchUserDetails = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const userDetailsResponse = await axios.get(`https://voyatikadb.onrender.com/api/users/user/${userId}`, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSelectedUser(userDetailsResponse.data);
      const userPortraitResponse = await axios.get(`https://voyatikadb.onrender.com/api/users/portrait/${userDetailsResponse.data.username}`, {
        headers: {
          'Authorization': `${token}`,
        }
      });
      setUserPortraitUrl(userPortraitResponse.data);
    } catch (error) {
      console.error('Error fetching user details or portrait: ', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://voyatikadb.onrender.com/api/users/user/delete/${userId}`, {
        headers: {
          'Authorization': token
        }
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };
  const handleEdit = () => {
    setEditFormData({
      first: selectedUser.personalinfo.first,
      last: selectedUser.personalinfo.last,
      nickname: selectedUser.personalinfo.nickname,
      department: selectedUser.department,
      rank: selectedUser.rank,
      title: selectedUser.title,
    });
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    const updatedData = {
      ...editFormData,
      personalinfo: {
        ...selectedUser.personalinfo,
        first: editFormData.first,
        last: editFormData.last,
        nickname: editFormData.nickname,
      },
      department: editFormData.department,
      rank: editFormData.rank,
      title: editFormData.title,
    };
  
    try {
      const response = await axios.patch(`https://voyatikadb.onrender.com/api/users/user/update/${selectedUser._id}`, updatedData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      
      setEditMode(false);
      setSelectedUser(response.data.user); 
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  };
  
  

  return (
    <div className='crewdbContentDiv'>
      {!selectedUser && (
        <>
          <h2>Crew Database</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id} >
                <span onClick={() => fetchUserDetails(user._id)}>{user.personalinfo.first} {user.personalinfo.last}</span>
                <button className='crewDeleteButton' onClick={() => deleteUser(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {selectedUser && !editMode && (
        <div className='editProfileDiv'>
          <div className='profileButtonsDiv'>
          <button onClick={() => { setSelectedUser(null); setUserPortraitUrl(''); }}>Back to list</button>
          <button onClick={handleEdit}>Edit User</button>
          </div>
          <h2>{selectedUser.personalinfo.first} {selectedUser.personalinfo.last}'s Profile</h2>
          <div id='profilePortraitContainer'>
            <img src={userPortraitUrl} alt="User Portrait" />
          </div>
          <div className='profileInfoDiv'>
          <p><strong>Full Name:</strong>  {selectedUser.personalinfo.first} {selectedUser.personalinfo.last}</p>
          <p><strong>Nickname:</strong>  {selectedUser.personalinfo.nickname}</p>
          <p><strong>Age:</strong>  {selectedUser.personalinfo.age}</p>
          <p><strong>BirthDate:</strong>  {selectedUser.personalinfo.dob}</p>
          <p><strong>Department:</strong>  {selectedUser.department}</p>
          <p><strong>Rank:</strong>  {selectedUser.rank}</p>
          <p><strong>Title:</strong>  {selectedUser.title}</p>
          </div>
        </div>
      )}
      {selectedUser && editMode && (
        <form onSubmit={handleEditSubmit}>
          <div className='editCancelButtonDiv'>
            <button className='editCancelButton' onClick={() => setEditMode(false)}>Cancel</button>
        </div>
          
          <h2>Edit {selectedUser.personalinfo.first} {selectedUser.personalinfo.last}'s Profile</h2>
          <label>
           <span>First Name:</span> 
            <input name="first" value={editFormData.first} onChange={handleEditChange} />
          </label>
          <label>
           <span>Last Name:</span> 
            <input name="last" value={editFormData.last} onChange={handleEditChange} />
          </label>
          <label>
           <span>Nickname:</span> 
            <input name="nickname" value={editFormData.nickname} onChange={handleEditChange} />
          </label>
          <label>
           <span>Department:</span> 
            <input name="department" value={editFormData.department} onChange={handleEditChange} />
          </label>
          <label>
           <span>Rank:</span> 
            <input name="rank" value={editFormData.rank} onChange={handleEditChange} />
          </label>
          <label>
           <span>Title:</span> 
            <input name="title" value={editFormData.title} onChange={handleEditChange} />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
      }

export default CrewDB;
