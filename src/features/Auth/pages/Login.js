import React from "react"
import firebase, { auth } from "../../../firebase/config"
import { addDocument } from "../../../firebase/services"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import "./Login.style.scss"
import { Link } from "react-router-dom"
import { useState } from "react"

const googleProvider = new firebase.auth.GoogleAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()

function Login() {
   const [email, setEmail] = useState("")
   const [passWord, setPassWord] = useState("")
   
   const handleLoginWithEmailAndPassword = () => {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, passWord)
         .catch(err => {
            console.log(err)
         })
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
               <h3>Login Form</h3>
               <input
                  type="text"
                  placeholder="Email"
                  onChange={e => {
                     setEmail(e.target.value)
                  }}
               />
               <input
                  type="password"
                  placeholder="Password"
                  onChange={e => {
                     setPassWord(e.target.value)
                  }}
               />
               <p>
                  Are you ready accounts?
                  <Link
                     to="/register"
                     style={{ color: "var(--color-main)", marginLeft: 5 }}
                  >
                     Register
                  </Link>
               </p>
               <button
                  type="button"
                  className="btn-login"
                  onClick={handleLoginWithEmailAndPassword}
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
            </form>
         </div>
      </div>
   )
}

export default React.memo(Login)
