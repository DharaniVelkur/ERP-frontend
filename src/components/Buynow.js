import React, { useContext, useEffect, useState } from 'react'
import Buynowcard from './Buynowcard';
import { useNavigate } from 'react-router-dom';
import { getproductsContext } from './context/ContextProvider';
// import { loadScript, isScriptLoaded, isScriptLoadSucceeded } from 'utils/loadScript';
// import Razorpay from 'razorpay';

const Buynow = () => {
  let [cartdata, setCartdata] = useState([]);
  let {cartCount,setCartcount}=useContext(getproductsContext);
  let navigate=useNavigate()
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  let totalAmountTobePaid=0;
  cartdata.map(e=>{
    totalAmountTobePaid=totalAmountTobePaid+e.price;
    return totalAmountTobePaid;
  })
  let x=totalAmountTobePaid;
  // console.log(Math.trunc(totalAmountTobePaid));

  const getdatabuy = async () => {

    let token = localStorage.getItem('usersdatatoken');
    const res = await fetch("https://erpbackend-959k.onrender.com/cartdetails", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (data.status !== 200) {
      console.log("error");
    } else {
      console.log(data.buyuser.carts);
      setCartdata(data.buyuser.carts);
    }
  }


  const checkout = async () => {
    alert("Total amount to be paid :" +totalAmountTobePaid);
    setCartcount(0);
 
   await handlePayment();
   let token=localStorage.getItem('usersdatatoken');
    const checkres=await fetch('https://erpbackend-959k.onrender.com/checkout',{
      method: 'POST',
      headers:{
        "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization : token,
      Accept: "application/json"
      },
      body: JSON.stringify({
       orders:cartdata
      })
    });
    const data1=await checkres.json();
    setCartdata([]);
    navigate('/dashboard');
    // console.log(data1);

    if(checkres.error){
      alert("user invalid")
    } 
  }

  const handlePaymentSuccess = (paymentResponse) => {
    setIsPaymentSuccess(true);
    console.log('Payment Success:', paymentResponse);
  };
  

  const handlePaymentError = (error) => {
    console.log('Payment Error:', error);
  };

  const handlePayment = async () => {
    const options = {
      key: "rzp_test_tX1XoeHDlWZgAt",
      amount:totalAmountTobePaid*100,
      currency: 'INR',
      name: 'Equipment Rental',
      description: 'Equipment Rental Payment',
      handler: handlePaymentSuccess,
      prefill: {
        email: 'test71@gmail.com', // Replace with customer email address
        contact: '6567890909', // Replace with customer contact number
      },
      
      notes: {
        rentalItem: JSON.stringify({ "greeting": "hello" }), // Replace with additional item details
      },
      theme: {
        color: '#528FF0', // Replace with your preferred color theme
      }
    };
    const razorpay=new window.Razorpay(options);
    razorpay.open();

    // try {
    //   const response = await fetch('/create-razorpay-order', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ amount: razorpayOptions.amount }), // Send the amount to the server to create the order
    //   });

    //   const data = await response.json();

    //   const razorpay = new Razorpay({
    //     ...razorpayOptions,
    //     order_id: data.orderId, // Set the order ID received from the server
    //   });

    //   razorpay.open();
    // } catch (error) {
    //   console.log('Error creating Razorpay order:', error);
    // }

};

const handledelete=async (id)=>{
  let token=localStorage.getItem('usersdatatoken')
  let res=await fetch(`https://erpbackend-959k.onrender.com/deleteproduct/${id}`,{
    method: 'DELETE',
    headers:{
      "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization : token,
      Accept: "application/json"
    }
  });
  const data=await res.json();
  setCartdata(data.user.carts);
  console.log(data);
}


useEffect(() => {
  getdatabuy();
}, []);

return (
  <>
    <div className='row justify-content-center'>
      {
        cartdata.map(product => {
          return <Buynowcard product={product} handledelete={handledelete} />
        })
      }

    </div>
    <div className='d-flex justify-content-center'>
    <button className='btn btn-primary col-5 my-3' onClick={checkout}>Check OUT</button>
    </div>
  </>
)
    }

export default Buynow
