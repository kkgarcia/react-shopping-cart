import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiShoppingCart } from 'react-icons/hi'
import { useStateContext } from '../context/StateContext'
import { SlMenu } from 'react-icons/sl'
import { IoMdClose } from 'react-icons/io'

const Header = () => {
    
    const { cartQuantity } = useStateContext()
    const [hidden, setHidden] = useState(true)

  return (
    <header className='main-header'>
        <div className='header-container container'>
            <Link to='/'>
                <h1>Fake Shop</h1>
            </Link>
            <nav className='main-nav'>
                <ul className='header-links'>
                    <Link to='/'>
                        <li><h3>Home</h3></li>
                    </Link>
                    <Link to='/shop'>
                        <li><h3>Shop</h3></li>
                    </Link>
                    <Link to='/cart'>
                        <li className='shopping-cart'>
                            <HiShoppingCart size={25}/>
                            {cartQuantity > 0 && <span className='cart-quantity'>{cartQuantity}</span>}
                        </li>
                    </Link>
                </ul>
            </nav>
            <button className='menu-btn' onClick={() => setHidden(false)}>
                <SlMenu size={25} />
            </button>
            {!hidden && 
                <>
                <div className='blur-bg' onClick={() => setHidden(true)}></div>
                <div className='small-device-menu' onClick={() => setHidden(true)}>
                    <button className='sd-close-btn'>
                        <IoMdClose size={25} />
                    </button>
                    <ul className='sd-links'>
                        <Link to='/'>
                            <li>Home</li>
                        </Link>
                        <Link to='/shop'>
                            <li>Shop</li>
                        </Link>
                        <Link to='/cart'>
                            <li>Cart</li>
                        </Link>
                    </ul>
                </div>
                </>}
        </div>
    </header>
  )
}

export default Header