import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./index.scss"
import App from "./App"
import { store } from "./app/store"
import { Provider } from "react-redux"
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.render(
   <Auth0Provider
      domain="maxtrix.us.auth0.com"
      clientId="M9IvGKhBcxWkWhifDFWCJiP8CDzuyOER"
      redirectUri={window.location.origin}
   >
      <Provider store={store}>
         <App />
      </Provider>
   </Auth0Provider>,
   document.getElementById("root")
)
