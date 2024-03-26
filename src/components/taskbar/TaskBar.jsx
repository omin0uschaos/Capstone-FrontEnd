import './TaskBar.css';
import Clock from './clock/Clock';
import voslogo from '../../assets/images/voslogo.svg';
import LogoutButton from './logout/LogoutButton';

function TaskBar() {
  return (
    <div id='taskBar'><div id='vosLogo'><img src={voslogo} alt="" srcset="" /><LogoutButton /></div>
        <Clock />
    </div>
  )
}

export default TaskBar