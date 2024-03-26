import React, { useState } from 'react';
import { useDraggable, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import './App.css';
import Login from '../components/LoginForm';
import CrewDB from '../components/crewdb/CrewDB';

function DraggableItem({ id, children, style, component: Component }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  // Adjust the main style to include real-time transform
  const styleWithTransform = {
    ...style,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    touchAction: 'none',
  };

  // Style for the drag handle
  const handleStyle = {
    backgroundColor: 'gray',
    padding: '5px',
    cursor: 'grab',
    marginBottom: '5px',
  };

  return (
    <div style={styleWithTransform}>
      {/* Drag Handle */}
      <div ref={setNodeRef} style={handleStyle} {...listeners} {...attributes}>
        Drag Handle
      </div>
      {/* Content or Component below the handle */}
      {Component ? <Component /> : children}
    </div>
  );
}


function App() {
  const [items, setItems] = useState({
    login: { top: 250, left: 250, component: Login },  });
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;
    const { id } = active;
  
    setItems((prevItems) => {
      const currentItem = prevItems[id];
      if (!currentItem) return prevItems;
  
      // Calculate the new position
      const newPos = {
        ...currentItem,
        top: currentItem.top + delta.y,
        left: currentItem.left + delta.x,
      };
  
      // Update the item's position in the state
      return {
        ...prevItems,
        [id]: newPos,
      };
    });
  };
  

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        {Object.keys(items).map((key) => (
          <DraggableItem
            key={key}
            id={key}
            style={{
              position: 'absolute',
              top: items[key].top,
              left: items[key].left,
              border: '1px solid black',
              padding: '10px',
              cursor: 'grab',
            }}
            component={items[key].component} // Pass the component if it exists
          >
            {items[key].content}
          </DraggableItem>
        ))}
      </div>
    </DndContext>
  );
}

export default App;
