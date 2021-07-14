import Navbar from "components/Navbar/Navbar"
// import Error from "features/Error/page/Error"
// import SingleProduct from "features/SingleProduct/page/SingleProduct"
import React, { useEffect, Suspense } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
// import About from "features/About/page/About"
// import Home from "features/Home/page/Home"
// import Products from "features/Products/page/Products"
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
// import Cart from "features/Cart/page/Cart"
import { totalsCountCart } from "features/Cart/CartSlice"
// import ContactUs from "features/Contact/page/ContactUs"
import Loading from "components/Loading/Loading"
import GoToTop from "components/GotoTop/GoToTop"

// Lazy page

const Home = React.lazy(() => import("./features/Home/page/Home"))
const About = React.lazy(() => import("./features/About/page/About"))
const Products = React.lazy(() => import("./features/Products/page/Products"))
const ContactUs = React.lazy(() => import("./features/Contact/page/ContactUs"))
const Cart = React.lazy(() => import("./features/Cart/page/Cart"))
const SingleProduct = React.lazy(() =>
   import("./features/SingleProduct/page/SingleProduct")
)
const Error = React.lazy(() => import("./features/Error/page/Error"))

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
      dispatch(filtersProducts())
   }, [dispatch, filters])

   useEffect(() => {
      dispatch(sortProducts())
   }, [dispatch, sort])
   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart))
      dispatch(totalsCountCart())
   }, [dispatch, cart])
   return (
      <BrowserRouter>
         <Navbar />
         <Sidebar />
         <Suspense fallback={<Loading />}>
            <Switch>
               <Route exact path="/" component={Home}></Route>
               <Route exact path="/about" component={About}></Route>
               <Route exact path="/products" component={Products}></Route>
               <Route exact path="/contact-us" component={ContactUs}></Route>
               <Route path="/cart" component={Cart}></Route>
               <Route
                  exact
                  path="/products/:id"
                  component={SingleProduct}
               ></Route>
               <Route exact path="*" component={Error}></Route>
            </Switch>
         </Suspense>
         <Footer />
         <ScrollToTop showBelow={250} />
         <GoToTop />
      </BrowserRouter>
   )
}

export default App
