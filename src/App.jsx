import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Desktop from './pages/Desktop';


function App() {
  return (
    <><Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Desktop />}></Route>
    </Routes>

    </>
  );
}

export default App;