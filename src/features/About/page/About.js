import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import React from 'react'
import aboutImg from 'assets/images/bread1.jpg'
import AboutContent from '../components/AboutContent/AboutContent'
import AboutCounter from '../components/AboutCounter/AboutCounter'
export default function About() {
   return (
      <main>
         <Breadcrumb title="About" bgImg={aboutImg}/>
         <AboutContent/>
         <AboutCounter/>
      </main>
   )
}
