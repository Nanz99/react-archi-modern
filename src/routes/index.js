import React, { Suspense } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Navbar from 'components/Navbar/Navbar';
import Sidebar from "components/Sidebar/Sidebar"
import Loading from "components/Loading/Loading"
import Footer from "components/Footer/Footer"
import ScrollToTop from "components/ScrollToTop/ScrollToTop"
import GoToTop from './../components/GoToTop/GoToTop';

const Home = React.lazy(() => import("../features/Home/page/Home"))
const About = React.lazy(() => import("../features/About/page/About"))
const Products = React.lazy(() => import("../features/Products/page/Products"))
const ContactUs = React.lazy(() => import("../features/Contact/page/ContactUs"))
const Cart = React.lazy(() => import("../features/Cart/page/Cart"))
const SingleProduct = React.lazy(() =>
   import("../features/SingleProduct/page/SingleProduct")
)
const Error = React.lazy(() => import("../features/Error/page/Error"))
const Login = React.lazy(() => import("../features/Auth/pages/Login"))
const Register = React.lazy(() => import("../features/Auth/pages/Register"))



function Routes() {
   return (
      <BrowserRouter>
         <GoToTop />
         <Navbar />
         <Sidebar />
         <Suspense fallback={<Loading />}>
            <Switch>
               <Route path="/login" component={Login} />
               <Route exact path="/register" component={Register} />
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
               <Route exact path="*" component={Error} />
            </Switch>
            <Footer />
         </Suspense>

         <ScrollToTop showBelow={250} />
      </BrowserRouter>
   )
}

export default Routes
