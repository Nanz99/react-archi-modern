import React from "react"
import "./Footer.style.scss"
function Footer() {
   return (
      <>
         <div className="footer__container">
            <h4>
               From <span>{new Date().getFullYear()}</span> with {` `}
               <span>Anh Nhựt</span>
            </h4>
         </div>
      </>
   )
}

export default React.memo(Footer)
