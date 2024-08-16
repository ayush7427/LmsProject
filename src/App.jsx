import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage, AboutPage, NotFoundPage } from './pages/index'




function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/about' element={<AboutPage />} ></Route>
        <Route path='*' element={<NotFoundPage />} ></Route>
      </Routes>

    </>
  )
}

export default App
