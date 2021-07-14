import React, { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import "./Navbar.style.scss"
import logo from "../../assets/images/logoarchi.png"
import { IoIosLogOut } from "react-icons/io"
import { FiUserPlus } from "react-icons/fi"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FaBars } from "react-icons/fa"
import { useAuth0 } from "@auth0/auth0-react"
import { useDispatch, useSelector } from "react-redux"
import {
   closeSticky,
   openSidebar,
   openSticky
} from "features/Products/productsSlice"
import { links } from "constants/links"

function Navbar() {
   const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
   const isUser = isAuthenticated && user
   const dispatch = useDispatch()
   const { total_items } = useSelector(state => state.cart)
   const { isSticky } = useSelector(state => state.products)

   const handleSticky = () => {
      if (window.pageYOffset > 150) {
         dispatch(openSticky())
      } else {
         dispatch(closeSticky())
      }
   }
   useEffect(() => {
      window.addEventListener("scroll", handleSticky)
      return () => window.removeEventListener("scroll", handleSticky)
   })
   return (
      <nav className={`navbar ${isSticky ? "navbar-sticky" : null}`}>
         <div className="nav-center">
            <div className="nav-header">
               <Link to="/">
                  <img
                     src={logo}
                     alt="logo-img"
                     style={{
                        width: "140px",
                        display: "block",
                        marginLeft: "0px"
                     }}
                  />
               </Link>
               <button
                  type="button"
                  className="nav-toggle"
                  onClick={() => dispatch(openSidebar())}
               >
                  <FaBars />
               </button>
            </div>
            <ul className="nav-links">
               {/* {links.map(({ id, text, url }) => {
                  return (
                     <ActiveLink
                        key={id}
                        activeOnlyWhenExact={true}
                        to={url}
                        label={text}
                     />
                  )
               })} */}
               {links.map(({ id, text, url }) => {
                  return (
                     <li key={id}>
                        <NavLink
                           to={url}
                           exact
                           activeStyle={{
                              color: "var(--color-main)"
                           }}
                        >
                           {text}
                        </NavLink>
                     </li>
                  )
               })}
            </ul>
            <div className="cart-btn-wrapper">
               <Link to="/cart" className="cart-btn">
                  <span className="cart-container">
                     <AiOutlineShoppingCart />
                     <div className="cart-value">{total_items}</div>
                  </span>
               </Link>
               <div className="account">
                  {isUser && user.picture && (
                     <img
                        src={user.picture}
                        alt={user.picture}
                        className="img-avatar"
                     />
                  )}
                  {isUser ? (
                     <button
                        type="button"
                        className="auth-btn"
                        onClick={() => {
                           logout({ returnTo: window.location.origin })
                        }}
                     >
                        <IoIosLogOut />
                     </button>
                  ) : (
                     <button
                        type="button"
                        onClick={loginWithRedirect}
                        className="auth-btn"
                     >
                        <FiUserPlus />
                     </button>
                  )}
               </div>
            </div>
         </div>
      </nav>
   )
}
export default React.memo(Navbar)
