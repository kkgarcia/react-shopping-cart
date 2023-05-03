import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/shop')
  }
  
  return (
    <>
    <div className='home-page-bg'></div>
    <div className='welcome-banner'>
      <h3>Welcome To Fake Shop</h3>
      <button onClick={handleOnClick} className='home-shop-btn'>Shop Now</button>
    </div>
    </>
  )
}

export default Home