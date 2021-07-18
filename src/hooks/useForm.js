import { useState } from "react"

const useForm = (validate) => {
   const [values, setValues] = useState({
      fullname: "",
      username: "",
      email: "",
      password: "",
      password2: ""
   })
   const [errors, setErrors] = useState({})

   const handleChange = e => {
      const { name, value } = e.target
      setValues({
         ...values,
         [name]: value
      })
   }

   const handleSubmit = e => {
      e.preventDefault()

      setErrors(validate(values))

   }
   // useEffect(() => {
   //    if (Object.keys(errors).length === 0 && isSubmitting) {
   //       callback()
   //    }
   // }, [errors])

   return { handleChange, handleSubmit, values, errors }
}

export default useForm
