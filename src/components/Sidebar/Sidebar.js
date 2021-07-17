import React, { useEffect, useState } from "react"
import "./Sidebar.style.scss"
import { FaTimes } from "react-icons/fa"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Menu, Dropdown } from "antd"
import logo from "../../assets/images/logoarchi.png"
import { Link, useHistory } from "react-router-dom"
import { links } from "constants/links"
import { useDispatch, useSelector } from "react-redux"
import { closeSidebar } from "features/Products/productsSlice"
import { auth } from "firebase/config"

function Sidebar() {
   const [user, setUser] = useState({})
   const [islogin, setIslogin] = useState(true)
   const isSidebarOpen = useSelector(state => state.products.isSidebarOpen)
   const history = useHistory()
   const dispatch = useDispatch()

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
      <div className="sidebar-container">
         <aside
            className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
         >
            <div className="sidebar-header">
               <img
                  src={logo}
                  alt="logo-img"
                  style={{
                     width: "140px",
                     display: "block",
                     marginLeft: "0px"
                  }}
               />
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
                  {islogin < 1 ? (
                     <Link to="/login">
                        <button type="button" className="auth-btn">
                           Sign in
                        </button>
                     </Link>
                  ) : (
                     <div className="account-info">
                        <Dropdown overlay={acount} trigger={["click"]}>
                           <div
                              className="acoount__avatar-name ant-dropdown-link"
                              onClick={e => e.preventDefault()}
                           >
                              <img
                                 src={user.photoURL}
                                 alt={user.displayName}
                                 className="img-avatar"
                              />
                              <h5>
                                 Hi, <span>{user.displayName}</span>
                              </h5>
                           </div>
                        </Dropdown>
                     </div>
                  )}
               </div>
            </div>
         </aside>
      </div>
   )
}

export default React.memo(Sidebar)
