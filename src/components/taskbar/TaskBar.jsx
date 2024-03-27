import './TaskBar.css';
import Clock from './clock/Clock';
import voslogo from '../../assets/images/voslogo.svg';
import LogoutButton from './logout/LogoutButton';
import UserGreeting from './usergreeting/UserGreeting';

function TaskBar() {
  return (
    <div id='taskBar'><div id='vosLogo'><img src={voslogo} alt="" srcset="" /><LogoutButton /><UserGreeting /></div>
        <Clock />
    </div>
  )
}

export default TaskBar