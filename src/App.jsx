import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage, AboutPage, NotFoundPage, SignupPage, LoginPage, CoursesList } from './pages/index'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/courses' element={<CoursesList />} />
      </Routes>

    </>
  )
}

export default App
