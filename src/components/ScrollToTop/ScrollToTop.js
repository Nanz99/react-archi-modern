import React, { useEffect, useState } from "react"
import "./ScrollToTop.style.scss"
import { RiArrowUpSLine } from "react-icons/ri"

function ScrollToTop({showBelow}) {
   const [show, setShow] = useState(showBelow ? false : true)
   const handleScroll = () => {
      if (window.pageYOffset > showBelow) {
         if (!show) setShow(true)
      } else {
         if (show) setShow(false)
      }
   }
   useEffect(() => {
      if (showBelow) {
         window.addEventListener("scroll", handleScroll)
         return () => window.removeEventListener("scroll", handleScroll)
      }
   })
   const handleClick = () => {
      window["scrollTo"]({ top: 0, behavior: "smooth" })
   }
   return (
      <div>
         {show && (
            <button className="backtotop-btn" onClick={handleClick}>
               <RiArrowUpSLine />
            </button>
         )}
      </div>
   )
}
export default React.memo(ScrollToTop)