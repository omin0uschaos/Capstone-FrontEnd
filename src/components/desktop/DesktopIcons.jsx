import React, { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Icon from './Icon';
import DraggableWindow from './DraggableWindow';
import CrewDb from '../crewdb/CrewDB';
import DailyNews from '../dailynews/DailyNews';
import Navigator from '../navigator/Navigator';
import TaskList from '../tasklist/TaskList';
import ShipViewer from '../shipview/ShipViewer';
import ResourceManager from '../resourcemanager/ResourceManager';
import MissionLog from '../missionlog/MissionLog';
import crewdbicon from '../../assets/images/crewdbicon.svg';
import destinationicon from '../../assets/images/destinationsicon.svg';
import newsicon from '../../assets/images/newsicon.svg';
import taskicon from '../../assets/images/taskicon.svg';
import shipviewicon from '../../assets/images/shipviewericon.svg'
import resourceicon from '../../assets/images/resourcesicon.svg'

const DesktopIcons = () => {
  const [icons, setIcons] = useState([
    { id: 'Crew DB', src: crewdbicon, position: { x: 20, y: 20 }, component: CrewDb },
    { id: 'Daily News', src: newsicon, position: { x: 100, y: 20 }, component: DailyNews },
    { id: 'G-Nav', src: destinationicon, position: { x: 180, y: 20 }, component: Navigator },
    { id: 'Tasker', src: taskicon, position: { x: 260, y: 20 }, component: TaskList },
    { id: 'Ship Viewer', src: shipviewicon, position: { x: 340, y: 20 }, component: ShipViewer },
    { id: 'Resources', src: resourceicon, position: { x: 420, y: 20 }, component: ResourceManager },
    { id: 'Mission Log', src: resourceicon, position: { x: 500, y: 20 }, component: MissionLog },
  ]);
  const [openWindows, setOpenWindows] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setIcons(icons.map(icon => {
      if (icon.id === active.id) {
        const newPosition = {
          x: icon.position.x + delta.x,
          y: icon.position.y + delta.y,
        };
        return { ...icon, position: newPosition };
      }
      return icon;
    }));
  };

  const handleDoubleClick = (iconId) => {
    if (!openWindows.some(window => window.id === iconId)) {
      const windowToAdd = icons.find(icon => icon.id === iconId);
      setOpenWindows([...openWindows, { ...windowToAdd, position: windowToAdd.position }]);
    }
  };

  const handleClose = (iconId) => {
    setOpenWindows(openWindows.filter(window => window.id !== iconId));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div id='desktopDiv' style={{ width: '100%', height: '100vh', position: 'relative' }}>
        {icons.map(icon => (
          <Icon
            key={icon.id}
            id={icon.id}
            src={icon.src}
            initialPosition={icon.position}
            onDoubleClick={() => handleDoubleClick(icon.id)}
          />
        ))}
        {openWindows.map(window => (
          <DraggableWindow
            key={window.id}
            id={window.id}
            title={window.id}
            initialPosition={window.position}
            onClose={() => handleClose(window.id)}
          >
            <window.component />
          </DraggableWindow>
        ))}
      </div>
    </DndContext>
  );
};

export default DesktopIcons;