import React from "react"
import { Link } from "react-router-dom"
import { FaEye } from "react-icons/fa"
import { formatPrice } from "helpers/helpers"
import "./Product.style.scss"

export default function Product({ image, name, id, price }) {
   return (
      <article className="product">
         <div className="product__container">
            <img src={image} alt={name} />
            <Link to={`/products/${id}`} className="link">
               <FaEye />
            </Link>
         </div>
         <footer>
            <Link to={`/products/${id}`} >
               <h5>{name}</h5>
            </Link>

            <p>{formatPrice(price)}</p>
         </footer>
      </article>
   )
}
