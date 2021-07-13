import Breadcrumb from "components/Breadcrumb/Breadcrumb"
import React from "react"
import productsImg from "../../../assets/images/bread2.jpg"
import Filters from "../components/Filters/Filters"
import ProductList from "../components/ProductList/ProductList"
import Sort from "../components/Sort/Sort"
import "./Products.style.scss"

export default function Products() {
   return (
      <main>
         <Breadcrumb title="Products" bgImg={productsImg} />
         <section className="page products-container">
            <div className="section-center products">
               <Filters />
               <div>
                  <Sort />
                  <ProductList />
               </div>
            </div>
         </section>
      </main>
   )
}
