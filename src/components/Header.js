import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
const Header = () => {
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
      navigate('/login');
    }
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" >
  <div className="container-fluid">
    <a className="navbar-brand" href="/">RentalPage</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Contact Us</a>
        </li>
      </ul>
      <i class="fa-solid fa-cart-shopping fa-lg"></i>

      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <Avatar src="/broken-image.jpg" className='mx-3' />
      </Button>
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
      </Menu>

    </div>
  </div>
</nav>
    </div>
  )
}

export default Header
