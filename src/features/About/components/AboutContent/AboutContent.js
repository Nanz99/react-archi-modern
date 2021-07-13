import React from 'react'
import './AboutContent.style.scss'
import aboutImg from'../../../../assets/images/pic_5.jpg'
import { Link } from 'react-router-dom'
function AboutContent() {
   return (
      <div className="aboutcontent__container">
         <div className="img__container">
            <img src={aboutImg} alt="" />
         </div>
         <div className="aboutcontent__text">
            <h2>The Awards Winning</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.</p>
            <Link to="/" className="btn-readmore">Read More</Link>
         </div>
      </div>
   )
}

export default React.memo(AboutContent)
