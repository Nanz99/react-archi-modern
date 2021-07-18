import React, { useEffect } from "react"
import firebase, { auth } from "../../../firebase/config"
import { addDocument } from "../../../firebase/services"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import "./Login.style.scss"
import { Link, useHistory } from "react-router-dom"
import useFirestore from "./../../../hooks/useFirestore"
import { useDispatch } from "react-redux"
import { handleValue } from "../userSlice"
import useForm from "hooks/useForm"
import validate from "../components/validate/validate"

const googleProvider = new firebase.auth.GoogleAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()

function Login() {
   const dispatch = useDispatch()
   const history = useHistory()

   const { handleChange, handleSubmit, values, errors } = useForm(validate)
   const { docs } = useFirestore("users")

   const getOneUser = (username, passWord) => {
      return docs.filter(
         item => item.username === username && item.password === passWord
      )
   }
   let username = values.username
   let passWord = values.password
   useEffect(() => {
      dispatch(handleValue({ username, passWord }))
   }, [dispatch, username, passWord])
   const handleLogin = () => {
      let item = { username, passWord }
      const user = getOneUser(item.username, item.passWord)
      console.log("user", user)
      if (user && user.length > 1) {
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
            <form action="" className="form-login" onSubmit={handleSubmit}>
               <h4>Login Form</h4>
               <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
               />
               {errors.username && <p className="error">{errors.username}</p>}
               <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
               />
               {errors.passWord && <p className="error">{errors.password}</p>}
               <p>Forget password</p>
               <button
                  type="submit"
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
                  Don't have an account?
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
