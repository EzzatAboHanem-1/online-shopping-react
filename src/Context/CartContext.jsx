import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Products from './../component/Products/Products';

export let cartContext = createContext();

    let headers = {
        token: localStorage.getItem("userToken")
    }

export function CartContextProvider(props) {
    
    let [cartQuantity, setCartQuantity] = useState(0);
    let [cartID, setCartID] = useState(0);

    async function addToCart(product_ID) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
            
            {
                productId: product_ID,
            },
            
            {
                headers: headers,
            })
        .then((response) => {
            setCartQuantity(response?.data?.numOfCartItems);
            return response
        })
        .catch((error) => {return error})
    }

    async function getCarts() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,  
            
            {
                headers: headers,
            })
        .then((response) => {
            setCartQuantity(response?.data?.numOfCartItems);
            setCartID(response?.data?.data?._id);
            return response
        })
        .catch((error) => {return error})
    }

    async function updateCart(id, count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,  
            
            {
                count: count,
            },
            {
                headers: headers,
            })
        .then((response) => {return response})
        .catch((error) => {return error})
    }

    async function deleteCartProduct(id) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,  

            {
                headers: headers,
            })
        .then((response) => {
            setCartQuantity(response?.data?.numOfCartItems);
            return response
        })
        .catch((error) => {return error})
    }

    async function deleteAllCart() {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,  

            {
                headers: headers,
            })
        .then((response) => {
            setCartQuantity(response?.data?.numOfCartItems);
            return response
        })
        .catch((error) => {return error})
    }

 return <>
    <cartContext.Provider value={{addToCart, getCarts, updateCart, deleteCartProduct, deleteAllCart, cartQuantity, cartID}}>
        {props.children}
    </cartContext.Provider>
 </>
}