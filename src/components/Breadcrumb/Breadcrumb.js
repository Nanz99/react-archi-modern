import React from "react"
import "./Breadcrumb.style.scss"

import { Link } from "react-router-dom"
function Breadcrumb({ title, product, bgImg }) {
   return (
      <div
         className="breadcrumb__container"
         style={{
            backgroundImage: ` url(${bgImg})`,
         }}
      >
         <div className="breadcrumb__center">
            <h1>{title}</h1>
            <p>
               <Link to="/">Home</Link>
               {product && <Link to="/products">/ Products</Link>}/ {title}
            </p>
         </div>
      </div>
   )
}

export default React.memo(Breadcrumb)
