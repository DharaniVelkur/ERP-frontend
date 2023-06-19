import React, { createContext, useEffect, useState } from 'react'
export const getproductsContext=createContext();

const ContextProvider = (props) => {
    let [allproducts,setAllproducts]=useState([]);
    let [loginData,setLoginData]=useState("")
    const getproducts=async ()=>{
        const response=await fetch('http://localhost:8081/getProducts',{
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
    <getproductsContext.Provider value={{allproducts,setAllproducts,loginData,setLoginData}}>
      {props.children}
    </getproductsContext.Provider>
  )
}

export default ContextProvider
