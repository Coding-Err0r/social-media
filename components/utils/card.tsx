import React from 'react'

const Card = () => {
  return (
    <div className="card w-2/5 bg-base-100 shadow-xl">
        <figure className="shadow-md rounded-xl"><img src="https://cdn.mos.cms.futurecdn.net/fv8U5mQBYgvSVi452sTVyJ-1200-80.png" alt="Shoes"/></figure>
        <div className="card-body">
            <h2 className="card-title">
            Shoes!
            <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div> 
            <div className="badge badge-outline">Products</div>
            </div>
        </div>
    </div>
  )
}

export default Card