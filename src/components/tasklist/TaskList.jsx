import axios from 'axios';
import { useState, useEffect } from 'react';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      if (!username || !token) {
        console.error('No username or token found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://voyatikadb.onrender.com/api/users/userinfo/${username}`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        setTasks(response.data.taskList);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className='taskListContentDiv'>
      <h2>Your Tasks</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <strong>{task.taskname}</strong>: {task.taskDetail}
              <span>{task.taskComplete ? ' (Completed)' : ' (Incomplete)'}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}

export default TaskList;
