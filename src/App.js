import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { Context } from './context/StateContext'
import Shop from './components/Shop'
import Cart from './components/Cart'
import Home from './components/Home'
import ItemDetails from './components/ItemDetails'
import { Toaster } from 'react-hot-toast'
import './styles.css'

const App = () => {
  return (
    <BrowserRouter>
        <Context>
          <Routes>
              <Route path='/' element={<MainLayout />}>
                  <Route index element={<Home />}/>
                  <Route path='/shop' element={<Shop />} />
                  <Route path='/shop/:itemId' element={<ItemDetails />} />
                  <Route path='/cart' element={<Cart />} />
              </Route>
              <Route path='*' element={<div>Not Found</div>} />
          </Routes>
          <Toaster />
        </Context>
    </BrowserRouter>
  )
}

export default App