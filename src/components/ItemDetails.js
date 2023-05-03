import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

const ItemDetails = () => {
    
    const { itemId } = useParams()
    const [item, setItem] = useState(false)
    const { setCartItems, setCartQuantity } = useStateContext()
    
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${itemId}`)
            .then(res => res.json())
            .then(data => {
                setItem(data)
            })
    }, [])

    const handleOnClick = (e) => {
        e.preventDefault()
        setCartQuantity(prev => prev + 1)
        setCartItems(prev => {
            const exist = prev.some(product => product.id === item?.id)
            let newList
            if (exist) {
                newList = prev.map(product => {
                    if (product.id === item?.id) return ({...product, quantity: product.quantity + 1})
                    return product
                })
                return newList
            }
            return [...prev, {...item, quantity: 1}]
        } 
        )
        toast.success('Added to Cart!')
    }

    if (!item) {
        return (
            <div className='loader-wrapper'>
                <ClipLoader size={60} />
            </div>
        )
    }
    

    return (
        <div className='container'>
            <div className='details-wrapper'>
                <img className='details-image' src={item?.image} alt='product-photo' />
                <div className='details'>
                    <div className='title-price'>
                        <h3 className='details-title'>{item?.title}</h3>
                        <div className='details-price card-price'>${item?.price}</div>
                    </div>
                    <div className='details-desc'>
                        <p>{item?.description}</p>
                    </div>  
                    <button className='details-add-to-cart-btn' onClick={handleOnClick}>Add to Cart +</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails