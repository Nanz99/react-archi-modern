import React from "react"
import "./CartItem.style.scss"
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import { removeItem, toggleAmount } from "features/Cart/CartSlice"
import { formatPrice } from "helpers/helpers"
import { useDispatch } from "react-redux"
const CartItem = ({ id, image, name, color, price, amount }) => {
   const dispatch = useDispatch()
   const increase = () => {
      let value = "inc"
      dispatch(toggleAmount({id,value}))
   }
   const decrease = () => {
      let value= "dec"
      dispatch(toggleAmount({id,value}))
   }
   return (
      <div className="cart__item">
         <div className="title">
            <img src={image} alt={name} />
            <div>
               <h5 className="name">{name}</h5>
               <p className="color">
                  color :
                  <span style={{ background: color }} />
               </p>
               <h5 className="price-small">{formatPrice(price)}</h5>
            </div>
         </div>
         <h5 className="price">{formatPrice(price)}</h5>
         <div className="amount-btns">
            <button type="button" className="amount-btn" onClick={decrease}>
               <FaMinus />
            </button>
            <h2 className="amount">{amount}</h2>
            <button type="button" className="amount-btn" onClick={increase}>
               <FaPlus />
            </button>
         </div>
         <h5 className="subtotal">{formatPrice(price * amount)}</h5>
         <button
            className="remove-btn"
            onClick={() => dispatch(removeItem(id))}
         >
            <FaTrash />
         </button>
      </div>
   )
}

export default React.memo(CartItem)
