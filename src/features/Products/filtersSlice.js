import { createSlice } from "@reduxjs/toolkit"

const filtersSlice = createSlice({
   name: "filters",
   initialState: {
      filteredProducts: [],
      allProducts: [],
      gridView: true,
      sort: "price-lowest",
      filters: {
         text: "",
         company: "all",
         category: "all",
         color: "all",
         minPrice: 0,
         maxPrice: 0,
         price: 0,
         shipping: false
      }
   },
   reducers: {
      setGridView(state) {
         return {
            ...state,
            gridView: true
         }
      },
      setListView(state) {
         state.gridView = false
      },
      loadProducts(state, action) {
         let maxPrice = action.payload.map(p => p.price)
         maxPrice = Math.max(...maxPrice)
         state.filters.maxPrice = maxPrice
         state.filters.price = maxPrice
         state.allProducts = action.payload
         state.filteredProducts = action.payload
      },
      updateSort: (state, action) => {
         state.sort = action.payload
      },
      sortProducts: state => {
         const { sort, filteredProducts } = state
         let tempProducts = []
         if (sort === "price-lowest") {
            tempProducts = filteredProducts.sort((a, b) => {
               return a.price - b.price
            })
         }
         if (sort === "price-highest") {
            tempProducts = filteredProducts.sort((a, b) => {
               return b.price - a.price
            })
         }
         if (sort === "name-a") {
            tempProducts = filteredProducts.sort((a, b) => {
               return a.name.localeCompare(b.name)
            })
         }
         if (sort === "name-z") {
            tempProducts = filteredProducts.sort((a, b) => {
               return b.name.localeCompare(a.name)
            })
         }
         state.filteredProducts = tempProducts
      },
      clearFilters: state => {
         return {
            ...state,
            filters: {
               ...state.filters,
               text: "",
               company: "all",
               category: "all",
               color: "all",
               price: state.filters.maxPrice,
               shipping: false
            }
         }
      },
      updateFilters: (state, action) => {
         const { name, value } = action.payload
         return {
            ...state,
            filters: {
               ...state.filters,
               [name]: value
            }
         }
      },
      filtersProducts: state => {
         const { allProducts } = state
         const { text, category, company, color, price, shipping } =
            state.filters
         let tempProducts = [...allProducts]
         if (text) {
            tempProducts = tempProducts.filter(product =>
               product.name.toLowerCase().startsWith(text)
            )
         }
         if (category !== "all") {
            tempProducts = tempProducts.filter(
               product => product.category === category
            )
         }
         if (company !== "all") {
            tempProducts = tempProducts.filter(
               product => product.company === company
            )
         }
         if (color !== "all") {
            tempProducts = tempProducts.filter(product => {
               return product.colors.find(c => c === color)
            })
         }
         tempProducts = tempProducts.filter(product => product.price <= price)
         if (shipping) {
            tempProducts = tempProducts.filter(
               product => product.shipping === true
            )
         }
         return { ...state, filteredProducts: tempProducts }
      }
   }
})

export const {
   setGridView,
   setListView,
   loadProducts,
   updateSort,
   sortProducts,
   clearFilters,
   updateFilters,
   filtersProducts
} = filtersSlice.actions
export default filtersSlice.reducer
