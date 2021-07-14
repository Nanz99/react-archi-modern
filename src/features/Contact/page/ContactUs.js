import Breadcrumb from "components/Breadcrumb/Breadcrumb"
import React from "react"
import contactImg from "../../../assets/images/bread5.jpg"
import ContactForm from "../components/ContactForm/ContactForm"

function ContactUs() {
   return (
      <main>
         <Breadcrumb title="contact" bgImg={contactImg} />
         <ContactForm />
      </main>
   )
}

export default React.memo(ContactUs)
