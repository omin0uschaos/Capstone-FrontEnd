import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import './Icon.css'

const Icon = ({ id, src, initialPosition, onDoubleClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    position: 'absolute',
    left: initialPosition.x,
    top: initialPosition.y,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
    touchAction: 'none',
    width: 50,
    height: 50,
    cursor: 'grab',
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    onDoubleClick(id);
  }

  return (
    <div className='desktopIconClass' ref={setNodeRef} style={style} {...listeners} {...attributes} onDoubleClick={handleDoubleClick}>
      <img src={src} alt={`icon-${id}`} draggable="true" style={{ width: '100%', height: '100%' }} /><span className='iconTextTitle'>{id}</span>
    </div>
  );
};

export default Icon;
