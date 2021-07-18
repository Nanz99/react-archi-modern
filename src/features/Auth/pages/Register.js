import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Register.style.scss"
import { db, storage, timestamp } from "firebase/config"
import validate from "../components/validate/validate"
import useForm from "hooks/useForm"


function Register() {
   const { handleChange, handleSubmit, values, errors } = useForm(validate)
   const [file, setFile] = useState(false)
   // const [fullname, setFullname] = useState(null)
   // const [username,setUsername] = useState(null)
   // const [email, setEmail] = useState(null)
   // const [password, setPassword] = useState(null)
   // const [password2, setPassword2] = useState(null)
   const [error, setError] = useState(null)
   const types = ["image/png", "image/jpeg"]
   const history = useHistory()
  
  
   

   const handleSignUp = async () => {
      const storageRef = storage.ref(file.name)
      const collectionRef = db.collection("users")
      storageRef.put(file).on("state_changed", async () => {
         const url = await storageRef.getDownloadURL()
         const createdAt = timestamp()
         collectionRef.add({
            url,
            createdAt,
            fullname : values.fullname,
            username : values.username,
            email : values.email,
            password : values.password,
            error: errors
         })
      })
      history.push("/login")
   }
   return (
      <div className="register__container">
         <div className="register__wrapper">
            <form
               action=""
               className="form__register"
               onSubmit={handleSubmit}
               noValidate
            >
               <h4>Sign Up</h4>
               <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  value={values.fullname}
                  onChange={handleChange}
               />
               {errors.fullname && <p className="error">{errors.fullname}</p>}
               <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
               />
               {errors.username && <p className="error">{errors.username}</p>}
               <input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Email"
                  onChange={handleChange}
               />
               {errors.email && <p className="error">{errors.email}</p>}
               <input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  onChange={handleChange}
               />
               {errors.password && <p className="error">{errors.password}</p>}
               <input
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  value={values.password2}
                  onChange={handleChange}
               />
               {errors.password2 && <p className="error">{errors.password2}</p>}
               <div className="form-control avatar__input">
                  <label htmlFor="avatar">Avatar</label>
                  <span>
                     +{" "}
                     <input
                        type="file"
                        onChange={e => {
                           let selected = e.target.files[0]
                           if (selected && types.includes(selected.type)) {
                              setFile(selected)
                           } else {
                              setFile(null)
                              setError("Please select file png or jpeg")
                           }
                           if (selected === null) {
                              setError("Your Avatar is required")
                           }
                        }}
                        id="avartar"
                        className="avatar__img"
                        placeholder="Avatar"
                     />
                  </span>
               </div>
               <p>{file === null ? error : ""}</p>
               <button
                  type="submit"
                  className="btn-login"
                  onClick={handleSignUp}
               >
                  Sign Up
               </button>
               <p>
                  Not account ?
                  <Link
                     to="/login"
                     style={{ color: "var(--color-main)", marginLeft: 5 }}
                  >
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </div>
   )
}
export default React.memo(Register)
