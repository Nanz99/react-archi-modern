import axios from "axios"

export const getProductsData = () =>
   axios.get("https://course-api.com/react-store-products")

export const getSingleProductData = url => axios.get(url)
