import React from "react"
import "./AboutCounter.style.scss"
import about2 from "../../../../assets/images/pic_6.jpg"
import CountUp from "react-countup"
function AboutCounter() {
   return (
      <div className="aboutcounter__container">
         <div className="counter__container">
            <div className="counter__item">
               <h3>
                  <CountUp end={2350} duration={3} />{" "}
               </h3>
               <p>HOURS OF WORKS</p>
            </div>
            <div className="counter__item">
               <h3>
                  <CountUp end={128} duration={3} />
               </h3>
               <p>PROJECTS COMPLETE</p>
            </div>
            <div className="counter__item">
               <h3>
                  <CountUp end={750} duration={3} />
               </h3>
               <p>PSLICE OF PIZZA</p>
            </div>
            <div className="counter__item">
               <h3>
                  <CountUp end={520} duration={3} />
               </h3>
               <p>CUPS OF COFFEE</p>
            </div>
         </div>
         <div className="img__container">
            <img src={about2} alt="about-2" />
         </div>
      </div>
   )
}

export default React.memo(AboutCounter)
