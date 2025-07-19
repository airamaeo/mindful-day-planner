import {Routes, Route} from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/calendar' element={<Calendar />}/>
        <Route path='/settings' element={<Settings />}/>
      </Routes>
    </>
  )
}

export default App
