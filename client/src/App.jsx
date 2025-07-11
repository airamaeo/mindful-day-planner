import {Routes, Route} from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import AddTask from './pages/AddTask';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/addTask' element={<AddTask />}/>
      </Routes>
    </>
  )
}

export default App
