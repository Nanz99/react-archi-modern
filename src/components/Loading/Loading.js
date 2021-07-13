import React from "react"
import "./Loading.scss"

const Loading = () => {
   return (
      <div className="loading-container">
         <div className="loader">
            <div className="inner one" />
            <div className="inner two" />
            <div className="inner three" />
         </div>
      </div>
   )
}

export default React.memo(Loading)
