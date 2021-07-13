import { formatPrice } from "helpers/helpers"
import React from "react"
import "./CartTotals.style.scss"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function CartTotals() {
   const { total_amount, shipping_fee } = useSelector(state => state.cart)
   const myUser = true
   return (
      <div className="cart__totals">
         <div>
            <article>
               <h5>
                  subtotal :<span>{formatPrice(total_amount)}</span>
               </h5>
               <p>
                  shipping fee :<span>{formatPrice(shipping_fee)}</span>
               </p>
               <hr />
               <h4>
                  order total :
                  <span>{formatPrice(total_amount + shipping_fee)}</span>
               </h4>
            </article>
            {myUser ? (
               <Link to="/checkout" className="btn">
                  proceed to checkout
               </Link>
            ) : (
               <button className="btn">login</button>
            )}
         </div>
      </div>
   )
}

export default React.memo(CartTotals)
