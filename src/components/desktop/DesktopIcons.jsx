import React, { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Icon from './Icon';
import DraggableWindow from './DraggableWindow';
import CrewDb from '../crewdb/CrewDB';
import DailyNews from '../dailynews/DailyNews';
import crewdbicon from '../../assets/images/crewdbicon.svg';
import destinationicon from '../../assets/images/destinationsicon.svg';
import newsicon from '../../assets/images/newsicon.svg';

const DesktopIcons = () => {
  const [icons, setIcons] = useState([
    { id: 'Crew DB', src: crewdbicon, position: { x: 20, y: 20 }, component: CrewDb },
    { id: 'Daily News', src: newsicon, position: { x: 100, y: 20 }, component: DailyNews },
    { id: 'icon-3', src: destinationicon, position: { x: 180, y: 20 }, component: CrewDb },
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