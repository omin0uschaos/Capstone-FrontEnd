import axios from 'axios';
import { useState, useEffect } from 'react';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDetail, setNewTaskDetail] = useState('');
  const [userId, setUserId] = useState('');

  // Assuming token is stored in localStorage
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!username || !token) {
        console.error('No username or token found in local storage');
        setLoading(false);
        return;
      }

      try {
        const userInfoResponse = await axios.get(`https://voyatikadb.onrender.com/api/users/userinfo/${username}`, {
          headers: { 'Authorization': token }
        });
        setUserId(userInfoResponse.data._id); // Set the userId for later use in task operations
        setTasks(userInfoResponse.data.taskList || []);
        console.log(tasks);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [username, token]); // React to changes in username or token

  const addTask = async () => {
    if (!userId) return;
    try {
      await axios.post(`https://voyatikadb.onrender.com/api/users/user/task/add/${userId}`, {
        taskname: newTaskName,
        taskDetail: newTaskDetail,
        taskComplete: false
      }, { headers: { 'Authorization': token } });
      setNewTaskName('');
      setNewTaskDetail('');
      fetchUserInfo(); // Refresh tasks list
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!userId) return;
    try {
      await axios.delete(`https://voyatikadb.onrender.com/api/users/user/task/delete/${userId}/${taskId}`, {
        headers: { 'Authorization': token }
      });
      fetchUserInfo(); // Refresh tasks list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = async (taskId, updatedFields) => {
    if (!userId) return;
    try {
      await axios.patch(`https://voyatikadb.onrender.com/api/users/user/task/update/${userId}/${taskId}`, updatedFields, {
        headers: { 'Authorization': token }
      });
      fetchUserInfo(); // Refresh tasks list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className='taskListContentDiv'>
      <h2>Your Tasks</h2>
      <div>
        <input
          type="text"
          placeholder="New task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="New task detail"
          value={newTaskDetail}
          onChange={(e) => setNewTaskDetail(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <strong>{task.taskname}</strong>: {task.taskDetail}
              <span>{task.taskComplete ? ' (Completed)' : ' (Incomplete)'}</span>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
              <button onClick={() => updateTask(task._id, { taskComplete: !task.taskComplete })}>
                Mark as {task.taskComplete ? 'Incomplete' : 'Complete'}
              </button>
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
