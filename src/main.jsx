import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux"
import store from './Redux/store.js'


createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>  
  </Provider>
)
