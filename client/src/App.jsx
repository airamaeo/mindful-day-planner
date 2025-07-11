import {Routes, Route} from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import AddTask from './pages/AddTask';
import Calendar from './pages/Calendar';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/addTask' element={<AddTask />}/>
        <Route path='/calendar' element={<Calendar />}/>
      </Routes>
    </>
  )
}

export default App
