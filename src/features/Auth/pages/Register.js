import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Register.style.scss"
import { db, storage, timestamp } from "firebase/config"

function Register() {
   const [file, setFile] = useState(false)
   const [fullname, setFullname] = useState(null)
   const [email, setEmail] = useState(null)
   const [password, setPassword] = useState(null)
   const [phone, setPhone] = useState(null)
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
            fullname,
            email,
            password,
            phone,
            error
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
               onSubmit={e => e.preventDefault()}
            >
               <h4>Sign Up</h4>
               <input
                  type="text"
                  placeholder="Full Name"
                  onChange={e => {
                     setFullname(e.target.value)
                  }}
               />
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
                     setPassword(e.target.value)
                  }}
               />
               <input
                  type="tel"
                  placeholder="Phone"
                  onChange={e => {
                     setPhone(e.target.value)
                  }}
               />
               <div className="form-control avatar__input">
                  <label htmlFor="avatar">Avatar</label>

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
                        if(selected === null){
                           setError("Your Avatar is required")
                        }
                     }}
                     id="avartar"
                     placeholder="Avatar"
                  />
               </div>
               <button
                  type="button"
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
