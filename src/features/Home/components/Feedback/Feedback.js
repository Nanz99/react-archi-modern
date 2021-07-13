import React from "react"
import "./Feedback.style.scss"
import Slider from "react-slick"
import { feedbacks } from "constants/feedbacks"
import { FaQuoteLeft } from "react-icons/fa"
import { BsFillCircleFill } from "react-icons/bs"
function Feedback() {
   const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots:false
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots:false
            }
         }
      ]
   }
   return (
      <div className="feedback__container">
         <div className="title">
            <h2>Customer Reviews</h2>
            <div className="separator">
               <span>
                  <BsFillCircleFill
                     style={{ color: "#FAB702", fontSize: 10 }}
                  />
               </span>
            </div>
         </div>
         <Slider {...settings}>
            {feedbacks.map(({ text, reviewer, id }) => (
               <blockquote key={id}>
                  <span className="icon">
                     <FaQuoteLeft />
                  </span>
                  <p>{text}</p>
                  <div className="de_testi_by">{reviewer} </div>
               </blockquote>
            ))}
         </Slider>
      </div>
   )
}
export default React.memo(Feedback)
