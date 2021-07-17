import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "features/Products/productsSlice"
import {
   filtersProducts,
   loadProducts,
   sortProducts
} from "features/Products/filtersSlice"
import { totalsCountCart } from "features/Cart/CartSlice"
import { getListUsers } from "features/Auth/userSlice"
import Routes from "routes"

function App() {
   const dispatch = useDispatch()
   const { sort, filters } = useSelector(state => state.filters)
   const products = useSelector(state => state.products.products)
   const cart = useSelector(state => state.cart.cart)

   // handle
   useEffect(() => {
      dispatch(getProducts())
      dispatch(getListUsers())
   }, [dispatch])

   useEffect(() => {
      if (products) {
         dispatch(loadProducts(products))
      }
   }, [dispatch, products])

   useEffect(() => {
      dispatch(filtersProducts())
   }, [dispatch, filters])

   useEffect(() => {
      dispatch(sortProducts())
   }, [dispatch, sort])

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart))
      dispatch(totalsCountCart())
   }, [dispatch, cart])

   return <Routes />
}

export default App
