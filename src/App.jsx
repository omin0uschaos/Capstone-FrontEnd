import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Desktop from './pages/Desktop';
import LoadingPage from './pages/Loading';
import './App.css'


function App() {
  return (
    <><Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Desktop />}></Route>
        <Route path='/loading' element={<LoadingPage />}></Route>
    </Routes>

    </>
  );
}

export default App;