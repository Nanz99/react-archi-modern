import Breadcrumb from "components/Breadcrumb/Breadcrumb"
import React from "react"
import cartImg from "../../../assets/images/bread4.jpg"
import './Cart.style.scss'
import CartContent from "../components/CartContent/CartContent"

export default function Cart() {
   return (
      <main>
         <Breadcrumb title="cart" bgImg={cartImg} />
         <section className="cart__content page">
            <CartContent/>
         </section>
      </main>
   )
}
