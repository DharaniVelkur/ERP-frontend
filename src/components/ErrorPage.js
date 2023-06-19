import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div  className='text-center'>
      <h1>Error Page</h1>
      <NavLink to={'/login'}>Back to Home Page</NavLink>
    </div>
  )
}

export default ErrorPage
