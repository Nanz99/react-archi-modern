import React, { useEffect, useState } from "react"
import { Link, NavLink, useHistory } from "react-router-dom"
import "./Navbar.style.scss"
import logo from "../../assets/images/logoarchi.png"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FaBars } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {
   closeSticky,
   openSidebar,
   openSticky
} from "features/Products/productsSlice"
import { links } from "constants/links"
import { auth } from "firebase/config"

import { Menu, Dropdown } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import useFirestore from "./../../hooks/useFirestore"

function Navbar() {
   const dispatch = useDispatch()
   const { total_items } = useSelector(state => state.cart)
   const { isSticky } = useSelector(state => state.products)
   const [user, setUser] = useState({})
   const [islogin, setIslogin] = useState(false)
   const history = useHistory()

   const { username, passWord } = useSelector(state => state.users.login)
   const { docs } = useFirestore("users")

   const getInfoUser = (username, passWord) => {
      return docs.find(
         item => item.username === username && item.password === passWord
      )
   }
   const userInfo = getInfoUser(username, passWord)
   useEffect(() => {
      if (userInfo) {
         setUser(userInfo)
         setIslogin(true)
      } else {
         setUser({})
         setIslogin(false)
      }
   }, [userInfo])

   // console.log("userInfo", userInfo)
   // console.log("user", user)
   // console.log(islogin)
   useEffect(() => {
      const unSubScrised = auth.onAuthStateChanged(user => {
         if (user) {
            const { displayName, email, uid, photoURL } = user
            setUser({ displayName, email, uid, photoURL })
            history.push("/")
            setIslogin(true)
            return
         }
         setIslogin(false)
         setUser({})
         history.push("/")
      })

      return () => {
         unSubScrised()
      }
   }, [history])

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
   const acount = (
      <Menu>
         <Menu.Item key="0" disabled>
            <a href="https://www.youtube.com">Account Info</a>
         </Menu.Item>
         <Menu.Item key="1" disabled>
            <a href="https://www.youtube.com">Order</a>
         </Menu.Item>
         <Menu.Divider />
         <Menu.Item key="3">
            <button
               type="button"
               className="auth-logout__btn"
               onClick={() => {
                  setUser({})
                  setIslogin(false)
                  auth.signOut()
               }}
            >
               Sign Out
            </button>
         </Menu.Item>
      </Menu>
   )
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
                  {islogin ? (
                     <div className="account-info">
                        <Dropdown overlay={acount} trigger={["click"]}>
                           <div
                              className="acoount__avatar-name ant-dropdown-link"
                              onClick={e => e.preventDefault()}
                           >
                              <Avatar
                                 src={user.photoURL || user.url}
                                 className="img-avatar"
                              >
                                 {user.photoURL
                                    ? ""
                                    : user.email.slice(0, 1).toUpperCase()}
                              </Avatar>
                              <h5>
                                 Hi,{" "}
                                 <span>
                                    {user.fullname || user.email.slice(0, -10)}
                                 </span>
                              </h5>
                           </div>
                        </Dropdown>
                     </div>
                  ) : (
                     <Link to="/login">
                        <button type="button" className="auth-btn">
                           Sign in
                        </button>
                     </Link>
                  )}
               </div>
            </div>
         </div>
      </nav>
   )
}
export default React.memo(Navbar)
