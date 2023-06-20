import React, { createContext, useEffect, useState } from 'react'
export const getproductsContext=createContext();

const ContextProvider = (props) => {
    let [allproducts,setAllproducts]=useState([]);
    let [cartCount,setCartcount]=useState(0)
    const getproducts=async ()=>{
        const response=await fetch('https://erpbackend-959k.onrender.com/getProducts',{
            method: 'GET',
            headers:{
                'ACCESS-CONTROL-ALLOW-ORIGIN': true,
                'Content-Type': 'application/json'
            }
        })
        const products =await  response.json();
        // console.log(products);
        setAllproducts(products);
    }
    useEffect(()=>{
        getproducts();
    },[])
  return (
    <getproductsContext.Provider value={{allproducts,setAllproducts,cartCount,setCartcount}}>
      {props.children}
    </getproductsContext.Provider>
  )
}

export default ContextProvider
