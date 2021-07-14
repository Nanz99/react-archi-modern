import React from "react"
import "./ContactForm.style.scss"

function ContactForm() {
   return (
      <div className="contactform__container">
         <div className="contactform__wrapper section-center">
            <div className="contact__form">
               <h3>SEND US MESSAGE</h3>
               <div className="contact__form__content">
                  <div>
                     <div>
                        <input
                           type="text"
                           name="Your Name"
                           placeholder="Your Name"
                           className="form-control"
                        />
                     </div>
                     <div>
                        <input
                           type="text"
                           name="Your Email"
                           placeholder="Your Email"
                           className="form-control"
                        />
                     </div>
                     <div>
                        <input
                           type="text"
                           name="Your Phone"
                           placeholder="Your Phone"
                           className="form-control"
                        />
                     </div>
                  </div>
                  <div>
                     <textarea
                        name="message"
                        cols="40"
                        rows="7"
                        className="form-control"
                        aria-required="true"
                        aria-invalid="false"
                        placeholder="Your Message"
                     ></textarea>
                  </div>
               </div>
               <button type="button" className="submit-btn">
                  SUBMIT FORM
               </button>
            </div>

            <div className="contact__info">
               <h3>CONTACT INFO</h3>
               <address>
                  <div>97 Trần Thái Tông, P.15, Tân Bình, Hồ Chí Minh</div>
                  <div>
                     <strong>Phone:</strong>037 519 74640{" "}
                  </div>
                  <div>
                     <strong>Facebook</strong>
                     <a
                        href="https://facebook.com/anhnhut.0101"
                        target="_blank"
                        rel="noreferrer"
                     >
                        anhnhut.0101
                     </a>
                  </div>
                  <div>
                     <strong>Email:</strong>
                     <a href="https://gmail.com">iamanhnhut.0101@gmail.com</a>
                  </div>
                  <div>
                     <strong>Web: </strong>
                     <a href="https://nguyenanhnhut-projects.netlify.app">
                        https://nguyenanhnhut-projects.netlify.app
                     </a>
                  </div>
                  <div>
                     <strong>Open</strong>Sunday – Friday 08:00 – 18:00
                  </div>
               </address>
            </div>
         </div>
      </div>
   )
}
export default React.memo(ContactForm)
