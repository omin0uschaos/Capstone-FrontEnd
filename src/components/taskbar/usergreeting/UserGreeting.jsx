import { useEffect, useState } from 'react';
import axios from 'axios';

const UserGreeting = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (!token || !username) return;

      try {
        const response = await axios.get(`https://voyatikadb.onrender.com/api/users/userinfo/${username}`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userDetails) return <div>Loading user information...</div>;

  return (
    <div id='userGreetingDiv'>Hello, <span id='userGreetingName'>{userDetails.personalinfo.first}</span>!</div>
  );
};

export default UserGreeting;
