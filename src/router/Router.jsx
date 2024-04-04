import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import NotfoundPage from '../pages/NotfoundPage'
import CartPage from '../pages/CartPage'
import OrderPage from '../pages/OrderPage'
import LoginPage from '../pages/LoginPage'
import SignInPage from '../pages/SignInPage'

function Router() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/cart' element={<CartPage/>}></Route>
            <Route path='*' element={<NotfoundPage/>}></Route>
            <Route path='/order' element={<OrderPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/sign' element={<SignInPage/>}></Route>
        </Routes>
    </div>
  )
}

export default Router