import './TaskBar.css';
import Clock from './clock/Clock';
import voslogo from '../../assets/images/voslogo.svg';

function TaskBar() {
  return (
    <div id='taskBar'><div id='vosLogo'><img src={voslogo} alt="" srcset="" /></div>
        <Clock />
    </div>
  )
}

export default TaskBar