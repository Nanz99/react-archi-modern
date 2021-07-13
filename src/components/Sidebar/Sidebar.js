import React from "react"
import "./Sidebar.style.scss"
import { FaTimes } from "react-icons/fa"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FiUserPlus } from "react-icons/fi"
import { IoIosLogOut } from "react-icons/io"
import logo from "../../assets/images/logoarchi.png"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { links } from "constants/links"
import { useDispatch, useSelector } from "react-redux"
import { closeSidebar } from "features/Products/productsSlice"

export default function Sidebar() {
   const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
   const isUser = isAuthenticated && user
   const isSidebarOpen = useSelector(state => state.products.isSidebarOpen)
   const dispatch = useDispatch()
   return (
      <div className="sidebar-container">
         <aside
            className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
         >
            <div className="sidebar-header">
               <img src={logo} alt="Coding" className="logo" />
               <button
                  className="close-btn"
                  onClick={() => dispatch(closeSidebar())}
               >
                  <FaTimes />
               </button>
            </div>
            <ul className="links">
               {links.map(({ id, text, url }) => {
                  return (
                     <li key={id} onClick={() => dispatch(closeSidebar())}>
                        <Link to={url}>{text}</Link>
                     </li>
                  )
               })}
               {/* {myUser && (
                  <li>
                     <Link to='/checkout' onClick={closeSidebar}>
                        checkout
                     </Link>
                  </li>
               )} */}
            </ul>
            <div className="cart-btn-wrapper">
               <Link to="/cart" className="cart-btn">
                  <span className="cart-container">
                     <AiOutlineShoppingCart />
                     <div className="cart-value">0</div>
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
         </aside>
      </div>
   )
}
