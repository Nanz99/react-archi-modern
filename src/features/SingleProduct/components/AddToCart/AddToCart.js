import { addToCart } from "features/Cart/CartSlice"
import React, { useState } from "react"
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import "./AddToCart.style.scss"
import { useDispatch } from "react-redux"

function AddToCart({ product }) {
   const { colors, id, stock } = product
   const [mainColor, setMainColor] = useState(colors[0])
   const [amount, setAmount] = useState(1)
   const dispatch = useDispatch()
   const increase = () => {
      setAmount(amount => {
         let tempAmount = amount + 1
         if (tempAmount > stock) tempAmount = stock
         return tempAmount
      })
   }
   const decrease = () => {
      setAmount(amount => {
         let tempAmount = amount - 1
         if (tempAmount < 1) tempAmount = 1
         return tempAmount
      })
   }
   return (
      <div className="addtocard__container">
         <div className="colors">
            <span>Color :</span>
            <div>
               {colors.map((color, index) => {
                  return (
                     <button
                        key={index}
                        style={{ background: color }}
                        className={`${
                           mainColor === color
                              ? "color-btn active"
                              : "color-btn"
                        }`}
                        onClick={() => setMainColor(color)}
                     >
                        {mainColor === color ? <FaCheck /> : null}
                     </button>
                  )
               })}
            </div>
         </div>
         <div className="btn-container">
            <div className="amount-btns">
               <button type="button" className="amount-btn" onClick={decrease}>
                  <FaMinus />
               </button>
               <h2 className="amount">{amount}</h2>
               <button type="button" className="amount-btn" onClick={increase}>
                  <FaPlus />
               </button>
            </div>
            <Link
               to="/cart"
               className="btn-addtocart"
               onClick={() =>
                  dispatch(addToCart({ id, mainColor, amount, product }))
               }
            >
               add to cart
            </Link>
         </div>
      </div>
   )
}

export default React.memo(AddToCart)
