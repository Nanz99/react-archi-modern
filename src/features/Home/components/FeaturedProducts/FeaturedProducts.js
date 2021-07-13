import React from "react"
import "./FeaturedProducts.style.scss"
import { BsFillCircleFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import Product from "features/Products/components/Product/Product"
import { Link } from "react-router-dom"

function FeaturedProducts() {
   const featuredProducts = useSelector(
      state => state.products.featuredProducts
   )
   return (
      <div className="section featured-container">
         <div className="title">
            <h2>New Arrivals</h2>
            <div className="separator">
               <span>
                  <BsFillCircleFill
                     style={{ color: "#FAB702", fontSize: 10 }}
                  />
               </span>
            </div>
         </div>
         <div className="section-center featured">
            {featuredProducts.slice(0, 3).map(item => {
               return <Product key={item.id} {...item} />
            })}
         </div>
         <Link to="/products" className="btn">
            {" "}
            all products
         </Link>
      </div>
   )
}
export default React.memo(FeaturedProducts)
