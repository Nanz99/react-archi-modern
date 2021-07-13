import React from "react"
import Product from "../Product/Product"
import "./GridView.style.scss"

function GridView({ filteredProducts }) {
   return (
      <div className="gridview">
         <div className="products-container">
            {filteredProducts.map(item => {
               return <Product key={item.id} {...item} />
            })}
         </div>
      </div>
   )
}
export default React.memo(GridView)
