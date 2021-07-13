import React, { useState } from "react"
import "./Slider.style.scss"

import slider1 from "../../../../assets/images/wide4.jpg"
import slider2 from "../../../../assets/images/wide5.jpg"
import slider3 from "../../../../assets/images/wide6.jpg"
import {
   Carousel,
   CarouselItem,
   CarouselControl,
   CarouselIndicators
} from "reactstrap"
import { Link } from "react-router-dom"

const items = [
   {
      src: slider1,
      altText: "Interior Design",
      captionTitle: "Our Expertise For",
      captionBig: "Interior Design",
      captionsmall:
         " We are team based on Brookylin. Our expertise on Interior Design."
   },
   {
      src: slider2,
      altText: "Featured Project",
      captionTitle: "Featured Project",
      captionBig: "Elegant Interior",
      captionsmall: "Often including the exterior, of a room or building."
   },
   {
      src: slider3,
      altText: "Interior Design",
      captionTitle: "Remodeling To Makes ",
      captionBig: "Your Life Easier",
      captionsmall:
         " We are team based on Brookylin. Our expertise on Interior Design."
   }
]

const Slider = props => {
   const [activeIndex, setActiveIndex] = useState(0)
   const [animating, setAnimating] = useState(false)

   const next = () => {
      if (animating) return
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
      setActiveIndex(nextIndex)
   }

   const previous = () => {
      if (animating) return
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
      setActiveIndex(nextIndex)
   }

   const goToIndex = newIndex => {
      if (animating) return
      setActiveIndex(newIndex)
   }

   const slides = items.map(item => {
      return (
         <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
         >
            <img src={item.src} alt={item.altText} />
            <div className="slider-content">
               <h4>{item.captionTitle}</h4>
               <h2>{item.captionBig}</h2>
               <p>{item.captionsmall}</p>
               <Link to="/products" className="btn-products">
                  OUR PRODUCTS
               </Link>
            </div>
         </CarouselItem>
      )
   })

   return (
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
         <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
         />
         {slides}
         <CarouselControl
            direction="prev"
            directionText=""
            onClickHandler={previous}
         />
         <CarouselControl
            direction="next"
            directionText=""
            onClickHandler={next}
         />
      </Carousel>
   )
}

export default React.memo(Slider)
