import React, { useContext, useEffect, useState } from 'react'
import { getproductsContext } from './context/ContextProvider'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Badge from '@mui/material/Badge';

const Homepage = () => {
    let { allproducts, cartCount, setCartcount } = useContext(getproductsContext);


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
      setCartcount(cartCount+1);
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
      // console.log(inddata);
      const data1=await checkres.json();
      // console.log(data1);
  
      if(checkres.error){
        alert("user invalid")
      }else{
        navigate('/buynow');
      }
    }




    const dashboardvalid = async () => {
        let token = localStorage.getItem('usersdatatoken');
        const res = await fetch('https://erpbackend-959k.onrender.com/validuser', {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data = await res.json();
        // console.log(data);

        if (data.status !== 200) {
            navigate('/*');
        } else {
            navigate('/dashboard');
        }
    }
    useEffect(() => {
        dashboardvalid()
    }, [])

    return (
        <>
            <div className='container'>
                <Modal open={isModalOpen} onClose={handleCloseModal}>
                    <div  style={{"width":"600px","height":"300px","background":"white","top":"20%","margin":"auto"}} className='p-3 d-flex flex-wrap justify-content-center shadow'>
                    <div className='col-6 text-center'><DatePicker 
                            selected={dateRange.startDate}
                            onChange={date => handleDateChange(date, 'startDate')}
                            placeholderText="Start Date"
                        /></div>
                         <div  className='col-6 text-center'>
                        <DatePicker
                            selected={dateRange.endDate}
                            onChange={date => handleDateChange(date, 'endDate')}
                            placeholderText="End Date"
                        />
                       </div> 
                        <Button style={{"width":"100px","height":"50px"}}
                            variant="contained"
                            color="primary"
                            disabled={isContinueButtonDisabled}
                            onClick={continueToCart}
                        >
                            Continue
                        </Button>
                    </div>
                </Modal>
                <div className='row' style={{ "justifyContent": "center" }}>
                    {
                        allproducts.map(e => {
                            return (
                              
                                <div className="card m-3" style={{ "width": "18rem" }}>
                                  <Badge badgeContent={e.brand} color="secondary"/>
                                    <img src={e.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{e.name}</h5>
                                        <p className="card-text">{e.description.slice(0, 99)}...</p>
                                        <p className='card-text text-danger'>Price :{e.price}</p>
                                        <button className="btn btn-info " onClick={() => { handleOpenModal(e) }}>Add to Cart</button>

                                    </div>
                                   
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Homepage
