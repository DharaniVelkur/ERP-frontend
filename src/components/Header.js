import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { getproductsContext } from './context/ContextProvider';
import Badge from '@mui/material/Badge';

const Header = () => {
  let {cartCount,setCartcount}=useContext(getproductsContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    let navigate=useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const logoutuser=async ()=>{
  let token=localStorage.getItem('usersdatatoken');
  const res=await fetch('https://erpbackend-959k.onrender.com/logout',{
    method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization : token,
         Accept: "application/json",
      }
  });
  const data = await res.json();
    if (data.status===200){
      localStorage.removeItem("usersdatatoken");
      localStorage.removeItem('isAdmin');
      navigate('/login');
    } else if(data.status===401){
      localStorage.clear();
      navigate('/login');
    }
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" >
  <div className="container-fluid">
    <NavLink className="navbar-brand" to={"/dashboard"}>RentalPage</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
     { localStorage.getItem('isAdmin')? <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to={'/allorders'} >All Orders</NavLink>
        </li> : ""}
        {localStorage.getItem('usersdatatoken')? <li class="nav-item">
          <a className="nav-link active" aria-current="page" href="/contact">Contact Us</a>
        </li> : <li class="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Contact Us</a>
        </li>}
       
      </ul>
      <Badge badgeContent={cartCount} color='primary'>
      <i className="fa-solid fa-cart-shopping fa-lg"></i>
      </Badge>

      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <Avatar src="/broken-image.jpg" className='mx-3' />
      </Button>
      {
        localStorage.getItem('usersdatatoken') ?
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={()=>{
          handleClose();
        logoutuser()}}>Logout</MenuItem>
      </Menu> :""}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header
