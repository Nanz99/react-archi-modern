import { configureStore } from "@reduxjs/toolkit"
import CartReducer from "features/Cart/CartSlice"
import filtersReducer from "features/Products/filtersSlice"
import productsReducer from "features/Products/productsSlice"
import usersReducer  from 'features/Auth/userSlice';
export const store = configureStore({
   reducer: {
      products: productsReducer,
      filters: filtersReducer,
      cart: CartReducer,
      users: usersReducer
   }
})
