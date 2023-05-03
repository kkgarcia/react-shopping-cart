import React from 'react'
import { useStateContext } from '../context/StateContext'
import ClipLoader from "react-spinners/ClipLoader";
import Item from './Item'


const Shop = () => {
    const { itemsList } = useStateContext()

    if (!itemsList.length) {
        return (
            <div className='loader-wrapper'>
                <ClipLoader size={60} />
            </div>
        )
    }

    return (
        <div className='items-wrapper container'>
            {itemsList.map(item => <Item key={item?.id} item={item} />)}
        </div>
    )
}

export default Shop