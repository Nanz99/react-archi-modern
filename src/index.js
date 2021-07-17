import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "antd/dist/antd.css"
import "@progress/kendo-theme-default/dist/all.css"
import "./index.scss"
import App from "./App"
import { store } from "./app/store"
import { Provider } from "react-redux"

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById("root")
)
