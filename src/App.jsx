import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage, AboutPage, NotFoundPage, SignupPage, LoginPage, CoursesList, ContactPage, Denied, CourseDescription, CreateCourse, ProfilePage, EditProfilePage, Checkout, CheckoutSuccess, CheckoutFail } from './pages/index'
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
          <Route path='/user/editprofile' element={<EditProfilePage />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/checkout/fail' element={<CheckoutFail />} />
        </Route>

      </Routes >

    </>
  )
}

export default App
