import React from "react"
import CartColumn from "../CartColumn/CartColumn"
import CartItem from "../CartItem/CartItem"
import CartTotals from "../CartTotals/CartTotals"
import { Link } from "react-router-dom"
import { clearCart } from "features/Cart/CartSlice"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './CartContent.style.scss'
function CartContent() {
   const dispatch = useDispatch()
   const { cart } = useSelector(state => state.cart)
   if (cart.length < 1) {
      return (
         <section className="page-100">
            <div className="empty">
               <h2>Your cart is empty</h2>
               <Link to="/products" className="btn-empty">
                  fill it
               </Link>
            </div>
         </section>
      )
   }
   return (
      <div className="section section-center container">
         <CartColumn />
         {cart.map(item => {
            return <CartItem key={item.id} {...item} />
         })}
         <hr />
         <div className="link-container">
            <Link to="/products" className="link-btn">
               continue shopping
            </Link>
            <button
               type="button"
               className="link-btn clear-btn"
               onClick={() => dispatch(clearCart())}
            >
               clear shopping cart
            </button>
         </div>
         <CartTotals />
      </div>
   )
}

export default React.memo(CartContent)
