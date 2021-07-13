import { services } from "constants/services"
import React from "react"
import "./Services.style.scss"
import { BsFillCircleFill } from "react-icons/bs"
function Services() {
   return (
      <section className="services-container">
         <div className="section-center">
            <article className="header">
               <div className="title">
                  <h3>
                     Custom Furniture <br />
                     Built Only For You
                  </h3>
                  <div className="separator">
                     <span>
                        <BsFillCircleFill
                           style={{ color: "#FAB702", fontSize: 10 }}
                        />
                     </span>
                  </div>
               </div>
               <p>
                  Interior design is the art or process of designing the
                  interior, often including the exterior, of a room or building.
                  An interior designer is someone who coordinates and manages
                  such projects.
               </p>
            </article>
            <div className="services-center">
               {services.map(item => {
                  const { id, icon, text, title } = item
                  return (
                     <article key={id} className={`service bg-service-${id}`}>
                        <div className="services_text">
                           <span className="icon">{icon}</span>
                           <h4>{title}</h4>
                           <p>{text}</p>
                        </div>
                     </article>
                  )
               })}
            </div>
         </div>
      </section>
   )
}

export default React.memo(Services)