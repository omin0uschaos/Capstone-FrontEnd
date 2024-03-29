import { useState } from 'react';
import './DraggableWindow.css';
import closeButtonIcon from '../../assets/images/closebutton.svg';

let highestZIndex = 100; 

const DraggableWindow = ({ children, onClose, title }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(highestZIndex);

  const bringToFront = () => {
    const newZIndex = ++highestZIndex;
    setZIndex(newZIndex);
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartDragPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    bringToFront();
    e.stopPropagation(); // Prevent event bubbling
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

  // Ensure the window and its content do not interfere with dragging
  const preventDragHandler = (e) => {
    e.stopPropagation();
  };

  const style = {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: '500px',
    height: '500px',
    cursor: 'default',
    zIndex: zIndex,
  };

  return (
    <div
      className='windowDiv'
      style={style}
      onClick={bringToFront}
      onMouseUp={preventDragHandler}
      onMouseMove={preventDragHandler}
    >
      <div
        className='windowTitleBar'
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {title}
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}>
          <img className='windowCloseButton' src={closeButtonIcon} alt="Close" />
        </button>
      </div>
      <div className='contentContainer' onMouseDown={preventDragHandler}>
        <div id='windowContentDiv'>
          {children}
        </div>
        <div className='scrollbarOffset'></div>
      </div>
    </div>
  );
};

export default DraggableWindow;
