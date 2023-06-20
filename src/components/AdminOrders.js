import React, { useEffect, useState } from 'react'
import SearchComponent from './SearchComponent';

const AdminOrders = () => {
    let [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [allorders, setAllorders] = useState([]);

    let function1=async ()=>{
        let token = localStorage.getItem('usersdatatoken')
        const res = await fetch('https://erpbackend-959k.onrender.com/getallusers', {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json"
            }
        })
        const response = await res.json();
        console.log(response.allusers);
        setUsers(response.allusers);
    }

    let function2= async () => {
        let token = localStorage.getItem('usersdatatoken')
        const res = await fetch('https://erpbackend-959k.onrender.com/getallorders/' + selectedUsers?._id, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json"
            }
        })
        const orderresponse = await res.json();
        console.log(orderresponse);
        setAllorders(orderresponse.orders);
        
    }

    useEffect( () => {
       function1();
    },[])

    useEffect(()=>{
        function2();
    }, [selectedUsers])
    useEffect(()=>{
console.log(allorders)
    },[allorders])

    return (
        <div>
            <SearchComponent data={users} setSelectedUsers={setSelectedUsers} />
            <div className='row justify-content-center align-items-center'>
                {
                    allorders?.map(order => {
                        return <>
                        <div className="card m-3" style={{ "width": "18rem" }}>
                            <img src={order.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{order.name}</h5>
                                <p className="card-text">{order.description}</p>
                                <p className='card-text'>Start Date :{order.startDate}</p>
                                <p className='card-text'>End Date :{order.endDate}</p>
                            </div>
                        </div>
                        </>
                    })
                }
            </div>
        </div>

    )
}

export default AdminOrders
