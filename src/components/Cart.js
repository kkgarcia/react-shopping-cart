import React from 'react'
import { useStateContext } from '../context/StateContext'
import { Link } from 'react-router-dom'
import { calculateTotal } from '../utils/calculateTotal'
import toast from 'react-hot-toast'
import { BsCart4 } from 'react-icons/bs'

const Cart = () => {
    const { cartQuantity, cartItems, setCartQuantity, setCartItems } = useStateContext()
    const total = calculateTotal(cartItems)

    const handleOnAdd = (id) => {
      setCartQuantity(prev => prev + 1)
      setCartItems(prev => {
          const isExist = prev.some(item => item.id === id)
          let newList
          if (isExist) {
              newList = prev.map(item => {
                  if (item.id === id) return ({...item, quantity: item.quantity + 1})
                  return item
              })
              return newList
          }
          
      })
    }

    const handleOnDecrease = (id) => {
      setCartQuantity(prev => prev - 1 > 0 ? prev - 1 : 0)
      setCartItems(prev => {
        const isExist = prev.some(item => item.id === id)
        let newList
        if (isExist) {
            newList = prev.map(item => {
                if (item.id === id) return ({...item, quantity: item.quantity - 1})
                return item
            })
            return newList.filter(item => item?.quantity > 0)
        }
      })
    }

    const handleOnOrder = () => {
      toast.success('Succefully Ordered!')
      setCartQuantity(0)
      setCartItems([])
    }

    return (
      <div className='cart container'>
        {!!cartItems.length && cartItems.map((item) => (
              <div key={item?.id} className='cart-item'>
                <img src={item?.image} className='cart-item-img'/>
                <div className='item-cart-desc'>
                  <Link to={`/shop/${item?.id}`}><b className='underline'>{item?.title}</b></Link>
                  <p className='grey'>{item?.category}</p>
                  <b>${item?.price}</b>
                </div>
                <div className='cart-quantity-change'>
                  <button onClick={() => handleOnDecrease(item?.id)}>-</button>
                  <span>{item?.quantity}</span>
                  <button onClick={() => handleOnAdd(item?.id)}>+</button>
                </div>
              </div>
            )
        )}

        {!!cartQuantity && 
          <div className='cart-total-wrapper'>
            <div className='cart-total'>
              <p className='grey'>Total(USD)</p>
              <b>${total}</b>
            </div>
            <button onClick={handleOnOrder} className='cart-order-btn'>Order</button>
          </div>
        }

        {cartQuantity < 1 && 
          <div className='empty-cart'>
              <BsCart4  size={50} />
              <h3>Your Cart is Empty</h3>
              <Link to={'/shop'}>
                <button className='continue-btn'>Continue Shopping</button>
              </Link>
          </div>
        }

      </div>
    )
}

export default Cart