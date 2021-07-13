import React from "react"
import Contact from "../components/Contact/Contact"
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts"
import Feedback from "../components/Feedback/Feedback"
import Services from "../components/Services/Services"
import Slider from "../components/Slider/Slider"

function Home() {
   return (
      <main>
         <Slider />
         <Services />
         <FeaturedProducts />
         <Feedback />
         <Contact />
      </main>
   )
}

export default React.memo(Home)
