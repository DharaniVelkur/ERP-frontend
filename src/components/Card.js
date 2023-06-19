import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Modal, TextField } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Card = (props) => {
  let [inddata,setInddata]=useState([]);
  let navigate=useNavigate();

  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setInddata(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date, field) => {
    setDateRange(prevRange => ({ ...prevRange, [field]: date }));
  };

  const continueToCart = async() => {
    if (dateRange.startDate && dateRange.endDate && dateRange.endDate >= dateRange.startDate) {
      const rentalItem = { dateRange };
     await addtocart(inddata)
      // console.log('Item added to cart:', rentalItem);
      handleCloseModal();
    } else {
      console.log('Invalid date range');
    }
  };

  const isContinueButtonDisabled = !(dateRange.startDate && dateRange.endDate && dateRange.endDate >= dateRange.startDate);

  const addtocart=async(product)=>{
    console.log(product)
    setInddata(product);
    let token=localStorage.getItem('usersdatatoken');
    const checkres=await fetch(`https://erpbackend-959k.onrender.com/addcart/${product._id}`,{
      method: 'POST',
      headers:{
        "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization : token,
      Accept: "application/json"
      },
      body: JSON.stringify({
        ...inddata,
        startDate:dateRange.startDate,
        endDate:dateRange.endDate
      })
    });
    console.log(inddata);
    const data1=await checkres.json();
    console.log(data1);

    if(checkres.error){
      alert("user invalid")
    }else{
      navigate('/buynow');
    }
  }


  return (
    <>
    
      <div className="card m-3" style={{ "width": "18rem" }}>
        <img src={props.product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <p className="card-text">{props.product.description}</p>
          <button className="btn btn-primary" onClick={()=>{handleOpenModal(props.product)}}>Add to Cart</button>
        </div>
      </div>
    </>
  )
}

export default Card;
