import React from 'react'

const Buynowcard = (props) => {
    console.log(props.product)
  return (
    <>
      <div className="card m-3 " style={{ "width": "18rem" }}>
        <img src={props.product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <p className="card-text">{props.product.description}</p>
          <p className="card-text">Rental Start Date :{props.product.startDate?.split('T')[0]}</p>
          <p className="card-text">Rental End Date :{props.product.endDate?.split('T')[0]}</p>
        </div>
        <button className='btn btn-primary'>Delete</button>
      </div>
    </>
  )
}

export default Buynowcard;
