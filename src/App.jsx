import { Route, Routes } from 'react-router-dom'
import './App.css'
import {HomePage ,AboutPage} from './pages/index'




function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/about' element={<AboutPage/>} ></Route>
      </Routes>

    </>
  )
}

export default App
