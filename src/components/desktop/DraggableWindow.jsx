import { useState } from 'react';
import './DraggableWindow.css';
import closeButtonIcon from  '../../assets/images/closebutton.svg'

const DraggableWindow = ({ children, onClose, title }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartDragPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - startDragPosition.x;
    const newY = e.clientY - startDragPosition.y;
    setPosition({ x: newX, y: newY });
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const style = {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: '500px',
    height: '500px',
    cursor: isDragging ? 'grabbing' : 'inherit',
  };

  return (
    <div className='windowDiv' style={style} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onMouseMove={onMouseMove}>
      <div className='windowTitleBar' onMouseDown={onMouseDown} >
        {title}
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}> <img className='windowCloseButton' src={closeButtonIcon} /> </button>
      </div><div className='contentContainer'>
      <div id='windowContentDiv'>
        {children}
      </div><div className='scrollbarOffset'></div></div>
    </div>
  );
};

export default DraggableWindow;
