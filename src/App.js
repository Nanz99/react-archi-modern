import Navbar from "components/Navbar/Navbar"
import Error from "features/Error/page/Error"
import SingleProduct from "features/SingleProduct/page/SingleProduct"
import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import About from "features/About/page/About"
import Home from "features/Home/page/Home"
import Products from "features/Products/page/Products"
import AuthWrapper from "features/Auth/pages/AuthWrapper"
import Sidebar from "components/Sidebar/Sidebar"
import Footer from "components/Footer/Footer"
import ScrollToTop from "components/ScrollToTop/ScrollToTop"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "features/Products/productsSlice"
import {
   filtersProducts,
   loadProducts,
   sortProducts
} from "features/Products/filtersSlice"
import Cart from "features/Cart/page/Cart"
import { totalsCountCart } from "features/Cart/CartSlice"
function App() {
   const dispatch = useDispatch()
   const { sort, filters } = useSelector(state => state.filters)
   const products = useSelector(state => state.products.products)
   const cart = useSelector(state => state.cart.cart)

   useEffect(() => {
      dispatch(getProducts())
   }, [dispatch])

   useEffect(() => {
      if (products) {
         dispatch(loadProducts(products))
      }
   }, [dispatch, products])

   useEffect(() => {
      dispatch(sortProducts())
      dispatch(filtersProducts())
   }, [dispatch, sort, filters])
   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart))
      dispatch(totalsCountCart())
   }, [dispatch, cart])
   return (
      <AuthWrapper>
         <BrowserRouter>
            <Navbar />
            <Sidebar />
            <Switch>
               <Route exact path="/" component={Home}></Route>
               <Route path="/about" component={About}></Route>
               <Route path="/cart" component={Cart}></Route>
               <Route exact path="/products" component={Products}></Route>
               <Route
                  exact
                  path="/products/:id"
                  component={SingleProduct}
               ></Route>
               <Route path="*" component={Error}></Route>
            </Switch>
            <Footer />
            <ScrollToTop showBelow={250} />
         </BrowserRouter>
      </AuthWrapper>
   )
}

export default App
