import React, { useState } from 'react'
import emailjs from "@emailjs/browser";

const Contact = () => {
    let [from_name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [message,setMessage]=useState("");
    let submitHandler=()=>{
        if(from_name==""||email==""||message==""){
            alert("Fields cannot be empty!!!")
        }else{
            emailjs.send(
                "service_b35tj2g",
                "template_iib8xp8",
                {
                    from_name:from_name,
                    to_name:"Dharani",
                    from_email:email,
                    to_email:"dharanivelkur@gmail.com",
                    message:message
                },
                "psrZqBG5o5Guo116H"
            );
            alert("Submitted Successfully!!!!");
            setName("");
            setEmail("");
            setMessage("");
        }
    }
  return (
    <form onSubmit={submitHandler}>
    <div className='container d-flex flex-column justify-content-center align-items-center mt-4 contact'>
        <h1 className='text-secondary'>CONTACT  US</h1><br/>
    <div >
     <p><label htmlFor='name'>NAME :</label></p> 
      <input type='text' value={from_name} id='name' placeholder='Enter name' onChange={e=>setName(e.target.value)}></input>
    </div><br/>
    <div>
       <p><label htmlFor='email'>Email :</label></p> 
      <input type='email' id='email' value={email} placeholder='Enter email' onChange={e=>setEmail(e.target.value)}></input>
    </div><br/>
    <div>
      <p><label htmlFor='msg'>Message :</label></p>  
        <textarea placeholder='Enter message...' value={message} id='msg' rows={4} cols={40} onChange={e=>setMessage(e.target.value)}></textarea>
    </div><br/>
    <button className='btn btn-primary'>Submit</button>
    </div>
    </form>
  )
}

export default Contact
