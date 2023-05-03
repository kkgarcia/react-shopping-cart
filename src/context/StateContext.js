import React, { useEffect, useState, createContext, useContext } from 'react'

const StateContext = createContext()

export const Context = ({ children }) => {
    const [itemsList, setItemsList] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=20')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setItemsList(data)
            })
    }, [])

    return (
        <StateContext.Provider value={{
            itemsList,
            cartQuantity,
            cartItems,
            setCartQuantity,
            setItemsList,
            setCartItems,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)