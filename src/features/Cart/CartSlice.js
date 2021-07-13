import { createSlice } from "@reduxjs/toolkit"

const getLocalStorage = () => {
   let cart = localStorage.getItem("cart")
   if (cart) {
      return JSON.parse(localStorage.getItem("cart"))
   } else {
      return []
   }
}
const cartSlice = createSlice({
   name: "cart",
   initialState: {
      cart: getLocalStorage(),
      total_items: 0,
      total_amount: 0,
      shipping_fee: 897
   },
   reducers: {
      addToCart: (state, action) => {
         const { id, color, amount, product } = action.payload
         const tempItem = state.cart.find(i => i.id === id + color)
         if (tempItem) {
            const tempCart = state.cart.map(cartItem => {
               if (cartItem.id === id + color) {
                  let newAmount = cartItem.amount + amount
                  if (newAmount > cartItem.max) {
                     newAmount = cartItem.max
                  }
                  return { ...cartItem, amount: newAmount }
               } else {
                  return cartItem
               }
            })
            return { ...state, cart: tempCart }
         } else {
            const newItem = {
               id: id + color,
               name: product.name,
               color,
               amount,
               image: product.images[0].url,
               price: product.price,
               max: product.stock
            }
            return { ...state, cart: [...state.cart, newItem] }
         }
      },
      clearCart: state => {
         return { ...state, cart: [] }
      },
      removeItem: (state, action) => {
         const tempCart = state.cart.filter(item => item.id !== action.payload)
         return { ...state, cart: tempCart }
      },
      toggleAmount: (state, action) => {
         const { id, value } = action.payload
         const tempCart = state.cart.map(item => {
            if (item.id === id) {
               if (value === "inc") {
                  let newAmount = item.amount + 1
                  if (newAmount > item.max) {
                     newAmount = item.max
                  }
                  return { ...item, amount: newAmount }
               }
               if (value === "dec") {
                  let newAmount = item.amount - 1
                  if (newAmount < 1) {
                     newAmount = 1
                  }
                  return { ...item, amount: newAmount }
               }
            }
            return item
         })
         return { ...state, cart: tempCart }
      },
      totalsCountCart: (state, action) => {
         const { total_items, total_amount } = state.cart.reduce(
            (total, cartItem) => {
               const { amount, price } = cartItem
               total.total_items += amount
               total.total_amount += price * amount
               return total
            },
            { total_items: 0, total_amount: 0 }
         )
         return { ...state, total_items, total_amount }
      }
   }
})

export const {
   addToCart,
   clearCart,
   removeItem,
   toggleAmount,
   totalsCountCart
} = cartSlice.actions
export default cartSlice.reducer
