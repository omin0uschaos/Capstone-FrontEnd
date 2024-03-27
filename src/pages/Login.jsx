import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import './Login.css'

function DraggableLoginForm() {
  const [position, setPosition] = useState({ x: 250, y: 250 });
  const sensors = useSensors(useSensor(PointerSensor));

  // This handler updates the position state after drag ends, for persistence.
  const handleDragEnd = (event) => {
    const {delta} = event;
    setPosition(prev => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  };

  // The Draggable component including the handle
  const DraggableHandle = () => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: 'draggable-handle',
    });

    // Apply real-time drag transformations combined with persisted position
    const style = {
      transform: `translate3d(${position.x + (transform ? transform.x : 0)}px, ${position.y + (transform ? transform.y : 0)}px, 0)`,
      position: 'absolute',
      touchAction: 'none',
      width: 'fit-content',
    };

    return (
      <div className='loginFormDiv' ref={setNodeRef} style={style}>
        <div className='loginFormDragDiv' {...listeners} {...attributes} >
          Voyatika OS
        </div>
        <LoginForm />
      </div>
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <DraggableHandle />
    </DndContext>
  );
}

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);
  return (
    <div className='loginPageDiv' style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <DraggableLoginForm />
    </div>
  );
}

export default Login;
