import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import SignUp from '../components/signup/SignUp';
import './Login.css'

function DraggableLoginForm() {
  const [position, setPosition] = useState({ x: 300, y: 100 });
  const [showSignUp, setShowSignUp] = useState(false);
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
        <div className='loginFormDragDiv' {...listeners} {...attributes}>
          Voyatika OS
        </div>
        {showSignUp ? <SignUp onSignUpSuccess={() => setShowSignUp(false)} /> : <LoginForm />}
        <div className='signUpDiv'>
          <span className='signUpSpan'>{showSignUp ? "" : "Don't Have an Account?"}</span>
          <button onClick={() => setShowSignUp(!showSignUp)} className="toggleFormButton">
          {showSignUp ? "Back to Login" : "Sign Up"}
        </button>
        </div>
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
