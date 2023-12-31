import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';


const Register = () => {
    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [cpassword,setCpassword]=useState("");
    let[spin,setSpin]=useState(false);


    const addUserData=async(e)=>{
        e.preventDefault();

        if(name===""&&email===""&&password===""&&cpassword===""){
            setSpin(false);
            alert('Empty fields are not allowed!!!')
        }
        else if(name===""){
            setSpin(false);
            alert("Please enter your Name");
        }else if(email===""){
            setSpin(false);
            alert("Please enter your email");
        }else if(!email.includes("@")){
            setSpin(false);
            alert("Enter valid email")
        }
        else if(password===""){
            setSpin(false);
            alert("Please enter your Password")
        }else if(cpassword==="") {
            setSpin(false);
            alert("Please enter confirm password")
        }else if(password!==cpassword){
            setSpin(false);
            alert("password doesn't match")
        }else{
            const data=await fetch('https://erpbackend-959k.onrender.com/register',{
                method:'POST',
                headers:{
                    "Access-Control-Allow-Origin": true,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    cpassword:cpassword
                })
            });
            const response=await data.json();
            console.log(data.status);
            
            if(data.status===200){
                setSpin(false);
                toast("user registration done");
                setName("");
                setEmail("");
                setPassword("");
                setCpassword("")
            }else if(response.error){
                setSpin(false);
                toast(response.error);
                setName("");
                setPassword("");
                setCpassword("");
                setEmail("")
            }
        }
    }
    return (
        <div className='className=container d-flex flex-column justify-content-center align-items-center'>
            <form className='mt-4 border-info border p-5' >
                <h1 className='text-center mt-2 text-danger'>Sign Up</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={email} aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" value={cpassword} onChange={e=>setCpassword(e.target.value)} />
                </div>
                <div className='text-center'>
                    {!spin ?
                <button type="submit" className="btn btn-primary" style={{width:"100%"}} onClick={addUserData}>Register</button> :<button type='submit' className='btn btn-primary' style={{width:"100%"}}><CircularProgress size={'1rem'} style={{'color': 'white'}}/></button>}
                <p>Already have an account?<NavLink to={'/login'}>Log In</NavLink></p>
                </div>
                

            </form>
            <ToastContainer/>
        </div>
    )
}

export default Register
