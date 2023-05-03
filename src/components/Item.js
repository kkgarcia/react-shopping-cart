import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { FaCartPlus } from 'react-icons/fa'
import { useStateContext } from '../context/StateContext'
import toast from 'react-hot-toast'

const Item = ({ item }) => {
    const {id, title, category, price, image, description, rating } = item
    const { setCartQuantity, setCartItems } = useStateContext()
    const [isHidden, setIsHidden] = useState(true)

    const handleOnAdd = (e) => {
        e.preventDefault()
        setCartQuantity(prev => prev + 1)
        setCartItems(prev => {
            const exist = prev.some(item => item.id === id)
            let newList
            if (exist) {
                newList = prev.map(item => {
                    if (item.id === id) return ({...item, quantity: item.quantity + 1})
                    return item
                })
                return newList
            }
            return [...prev, {...item, quantity: 1}]
        } 
        )
        toast.success('Added to Cart!')
    }

    return (
        <Link to={`/shop/${id}`}>
            <div className='item-card' onMouseEnter={() => setIsHidden(false)} onMouseLeave={() => setIsHidden(true)}>
                <img className='item-card-image' src={image} alt='item-image' />
                <div className='item-card-desc'>
                    <p className='grey'>{category}</p>
                    <p className='item-title'>{title}</p>
                    <div className='bottom-flex'>
                        <div className='card-rating'>
                            <AiFillStar size={23} color='gold'/>
                            <p className='grey'>{rating?.rate} | {rating?.count}</p>
                        </div>
                        <p className='card-price'>${price}</p>
                    </div>
                </div>
                {!isHidden && <button type='button' className='add-to-cart-btn' onClick={handleOnAdd}><FaCartPlus size={25} /></button>}
            </div>
        </Link>
    )
}

export default Item