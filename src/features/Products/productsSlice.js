import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getProducts = createAsyncThunk(
   "products/getProducst",
   async () => {
      const response = await axios.get(
         "https://course-api.com/react-store-products"
      )
      return response.data
   }
)
export const getSingleProduct = createAsyncThunk(
   "products/getSingleProduct",
   async url => {
      const response = await axios.get(url)
      return response.data
   }
)
const productsSlice = createSlice({
   name: "products",
   initialState: {
      isSidebarOpen: false,
      products_loading: false,
      products_error: false,
      products: [],
      featuredProducts: [],
      singleProduct_loading: false,
      singleProduct_error: false,
      singleProduct: {},
      isSticky: false
   },
   reducers: {
      openSidebar(state) {
         state.isSidebarOpen = true
      },
      closeSidebar(state) {
         state.isSidebarOpen = false
      },
      openSticky: state => {
         state.isSticky = true
      },
      closeSticky: state => {
         state.isSticky = false
      }
   },
   extraReducers: {
      [getProducts.pending]: state => {
         state.products_loading = true
      },
      [getProducts.fulfilled]: (state, action) => {
         state.products_loading = false
         state.products = action.payload
         state.featuredProducts = action.payload.filter(
            item => item.featured === true
         )
      },
      [getProducts.rejected]: (state, action) => {
         state.products_loading = false
         state.products_error = action.error
      },
      [getSingleProduct.pending]: state => {
         state.singleProduct_loading = true
      },
      [getSingleProduct.fulfilled]: (state, action) => {
         state.singleProduct_loading = false
         state.singleProduct = action.payload
      },
      [getSingleProduct.rejected]: (state, action) => {
         state.singleProduct_loading = false
         state.singleProduct_error = action.error
      }
   }
})

export const { openSidebar, closeSidebar, openSticky, closeSticky } =
   productsSlice.actions
export default productsSlice.reducer
