import { formatPrice } from 'helpers/helpers'
import React from 'react'
import { Link } from 'react-router-dom'
import './ListView.style.scss'
function ListView({ filteredProducts }) {
   return (
      <section className="listview">
         {filteredProducts.map((product) => {
            const { id, image, name, price, description } = product
            return (
               <article key={id}>
                  <img src={image} alt={name} />
                  <div>
                     <h4>{name}</h4>
                     <h5 className='price'>{formatPrice(price)}</h5>
                     <p>{description.substring(0, 150)}...</p>
                     <Link to={`/products/${id}`} className='btn'>
                        Details
                     </Link>
                  </div>
               </article>
            )
         })}
      </section>
   )
}
export default React.memo(ListView)
