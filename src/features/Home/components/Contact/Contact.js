import React from "react"
import { Link } from "react-router-dom"
import "./Contact.style.scss"

function Contact() {
   return (
      <div className="contact__container">
         <div className="contact__content">
            <h2>Are you ready contact us to get offers?</h2>
            <Link to="/contact" className="btn-contact">Contact Us</Link>
         </div>
      </div>
   )
}
export default React.memo(Contact)