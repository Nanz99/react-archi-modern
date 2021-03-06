import React from "react"
import "./Stars.style.scss"
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

function Stars({ stars, reviews }) {
   const tempStars = Array.from({ length: 5 }, (_, index) => {
      const number = index + 0.5
      return (
         <span key={index}>
            {stars > number ? (
               <BsStarFill />
            ) : stars > index ? (
               <BsStarHalf />
            ) : (
               <BsStar />
            )}
         </span>
      )
   })
   return (
      <div className="stars__container">
         <div className="stars">{tempStars}</div>
         <p className="reviews">({reviews} customer reviews)</p>
      </div>
   )
}

export default React.memo(Stars)
