import React, { useState } from "react"
import "./ProductImage.style.scss"
function ProductImage({ images }) {
   const [main, setMain] = useState(images[0])
   return (
      <section className="productimage__container">
         <img
            src={main.url || images[0].url}
            alt={images.id}
            className="main"
         />
         <div className="gallery">
            {images.map((image, index) => {
               return (
                  <img
                     src={image.url}
                     alt=""
                     key={index}
                     className={`${image.url === main.url ? "active" : null}`}
                     onClick={() => setMain(images[index])}
                  />
               )
            })}
         </div>
      </section>
   )
}

export default React.memo(ProductImage)
