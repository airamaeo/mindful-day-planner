import {Routes, Route} from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import Settings from './pages/Settings';

import TaskForm from './components/TaskForm';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/tasks' element={<TaskForm />}/>
        <Route path='/settings' element={<Settings />}/>
      </Routes>
    </>
  )
}

export default App
