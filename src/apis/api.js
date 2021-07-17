import axios from "axios"

export const getProductsData = () =>
   axios.get("https://course-api.com/react-store-products")

export const getSingleProductData = url => axios.get(url)

export const getListUsersData = () =>
   axios.get("https://60f166c638ecdf0017b0fc09.mockapi.io/api/users")
