import React, { useEffect } from 'react';
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Car from './pages/Car'
import CarsRented from './pages/CarsRented'
import Account from './pages/Account'
import SearchCar from './pages/SearchCar'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticateUser } from './features/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [cookies] = useCookies(['Authorization']);
  const dispatch = useDispatch()

  const getAuthenticatedUserUser = async () => {
    if (cookies.Authorization) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/authenticated`,
        {
          withCredentials: true
        }
      )

      if (data.status === 200) {

        dispatch(authenticateUser({
          email: data.data.email,
          name: data.data.name,
          role: data.data.role,
          isAuthenticated: true,
          id: data.data.ID
        }))
      }
    }
  }

  useEffect(() => {
    getAuthenticatedUserUser()
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Main>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/account' element={<Account />} />
          <Route path='/car' element={<Car />} />
          <Route path='/cars-rented' element={<CarsRented />} />
          <Route path='/search-car' element={<SearchCar />} />
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
