import React, { useEffect } from "react"
import firebase, { auth } from "../../../firebase/config"
import { addDocument } from "../../../firebase/services"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import "./Login.style.scss"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import useFirestore from "./../../../hooks/useFirestore"
import { useDispatch } from "react-redux"
import { handleValue } from "../userSlice"

const googleProvider = new firebase.auth.GoogleAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()

function Login() {
   const dispatch = useDispatch()
   const history = useHistory()
   const [email, setEmail] = useState("")
   const [passWord, setPassWord] = useState("")

   const { docs } = useFirestore("users")

   const getOneUser = (email, passWord) => {
      return docs.filter(
         item => item.email === email && item.password === passWord
      )
   }
   useEffect(() => {
      dispatch(handleValue({ email, passWord }))
   }, [dispatch, email, passWord])
   const handleLogin = () => {
      let item = { email, passWord }
      const user = getOneUser(item.email, item.passWord)

      if (user) {
         history.push("/")
      }
   }

   //Login with Google
   const handleGoogleLogin = async () => {
      const { additionalUserInfo, user } = await auth.signInWithPopup(
         googleProvider
      )
      console.log(user)
      if (additionalUserInfo?.isNewUser) {
         addDocument("users", {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId
         })
      }
   }
   //Login with Github
   const handleGithubLogin = async () => {
      const { additionalUserInfo, user } = await auth.signInWithPopup(
         githubProvider
      )
      if (additionalUserInfo?.isNewUser) {
         addDocument("users", {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId
         })
      }
   }
   return (
      <div className="login__container">
         <div className="form-container sign-in-container">
            <form
               action=""
               className="form-login"
               onSubmit={e => e.preventDefault()}
            >
               <h4>Login Form</h4>
               <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={e => {
                     setEmail(e.target.value)
                  }}
               />
               <input
                  nmae="password"
                  type="password"
                  placeholder="Password"
                  onChange={e => {
                     setPassWord(e.target.value)
                  }}
               />
               <p>Forget password</p>
               <button
                  type="button"
                  className="btn-login"
                  onClick={handleLogin}
               >
                  Login
               </button>
               <span>Or Login with social platforms</span>
               <div className="social-container">
                  {/* <button className="social" style={{ color: "blue" }}>
                     <FaFacebookF />
                  </button> */}
                  <button className="social" onClick={handleGoogleLogin}>
                     <FcGoogle />
                  </button>
                  <button className="social" onClick={handleGithubLogin}>
                     <FaGithub />
                  </button>
               </div>
               <p>
                  Are you ready accounts?
                  <Link
                     to="/register"
                     style={{ color: "var(--color-main)", marginLeft: 5 }}
                  >
                     Register
                  </Link>
               </p>
            </form>
         </div>
      </div>
   )
}

export default React.memo(Login)
