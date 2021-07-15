import React, { Suspense } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Navbar from "components/Navbar/Navbar"
import GoToTop from "components/GoToTop/GoToTop"
import Sidebar from "components/Sidebar/Sidebar"
import ScrollToTop from "components/ScrollToTop/ScrollToTop"
import Footer from "components/Footer/Footer"
import Loading from "components/Loading/Loading"

//lazy load
const Home = React.lazy(() => import("../features/Home/page/Home"))
const About = React.lazy(() => import("../features/About/page/About"))
const Products = React.lazy(() => import("../features/Products/page/Products"))
const ContactUs = React.lazy(() => import("../features/Contact/page/ContactUs"))
const Cart = React.lazy(() => import("../features/Cart/page/Cart"))
const SingleProduct = React.lazy(() =>
   import("../features/SingleProduct/page/SingleProduct")
)
const Error = React.lazy(() => import("../features/Error/page/Error"))

function Routes() {
   return (
      <BrowserRouter>
         <GoToTop />
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
      </BrowserRouter>
   )
}

export default Routes
