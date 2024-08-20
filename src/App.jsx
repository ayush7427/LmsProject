import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage, AboutPage, NotFoundPage, SignupPage, LoginPage, CoursesList, ContactPage, Denied, CourseDescription, CreateCourse, ProfilePage } from './pages/index'
import RequireAuth from './components/auth/requireAuth'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/courses' element={<CoursesList />} />
        <Route path='/denied' element={<Denied />} />
        <Route path='/course/description' element={<CourseDescription />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
          <Route path='/course/create' element={<CreateCourse />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />} >
          <Route path='/user/profile' element={<ProfilePage />} />
        </Route>

      </Routes >

    </>
  )
}

export default App
