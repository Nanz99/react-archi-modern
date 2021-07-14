import React from "react"
import { Link } from "react-router-dom"
import './Error.style.scss'
const Error = () => {
   return (
      <main className="page-100 error__container">
         <section>
            <h1>404</h1>
            <h3>Sorry, the page you tried cannot be found</h3>
            <Link to="/" className="btn__backhome">
               back home
            </Link>
         </section>
      </main>
   )
}

export default React.memo(Error)
