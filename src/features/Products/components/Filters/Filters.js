import React from "react"
import "./Filters.style.scss"
import { FaCheck } from "react-icons/fa"
import { formatPrice, getUniqueValues } from "helpers/helpers"
import { useDispatch, useSelector } from "react-redux"
import { clearFilters, updateFilters } from "features/Products/filtersSlice"

function Filters() {
   const dispatch = useDispatch()
   const allProducts = useSelector(state => state.filters.allProducts)
   const filters = useSelector(state => state.filters.filters)
   const {
      text,
      category,
      company,
      color,
      minPrice,
      price,
      maxPrice,
      shipping
   } = filters
   const categories = getUniqueValues(allProducts, "category")
   const companies = getUniqueValues(allProducts, "company")
   const colors = getUniqueValues(allProducts, "colors")
   const handleUpdateFilters = e => {
      let name = e.target.name
      let value = e.target.value
      if (name === "category") {
         value = e.target.textContent
      }
      if (name === "color") {
         value = e.target.dataset.color
      }
      if (name === "price") {
         value = Number(value)
      }
      if (name === "shipping") {
         value = e.target.checked
      }
      dispatch(updateFilters({ name, value }))
   }
   return (
      <section className="filters-container">
         <div className="content">
            <form onSubmit={e => e.preventDefault()}>
               <div className="form-control">
                  <input
                     type="text"
                     name="text"
                     className="search-input"
                     placeholder="search ..."
                     value={text}
                     onChange={handleUpdateFilters}
                  />
               </div>

               <div className="form-control">
                  <h5>category</h5>
                  <div>
                     {categories.map((c, index) => {
                        return (
                           <button
                              key={index}
                              onClick={handleUpdateFilters}
                              type="button"
                              name="category"
                              className={`${
                                 category === c.toLowerCase() ? "active" : null
                              }`}
                           >
                              {c}
                           </button>
                        )
                     })}
                  </div>
               </div>

               <div className="form-control">
                  <h5>company</h5>
                  <select
                     name="company"
                     value={company}
                     className="company"
                     onChange={handleUpdateFilters}
                  >
                     {companies.map((c, index) => {
                        return (
                           <option key={index} value={c}>
                              {c}
                           </option>
                        )
                     })}
                  </select>
               </div>

               <div className="form-control">
                  <h5>colors</h5>
                  <div className="colors">
                     {colors.map((c, index) => {
                        if (c === "all") {
                           return (
                              <button
                                 key={index}
                                 name="color"
                                 onClick={handleUpdateFilters}
                                 data-color="all"
                                 className={`${
                                    color === "all"
                                       ? "all-btn active"
                                       : "all-btn"
                                 }`}
                              >
                                 all
                              </button>
                           )
                        }
                        return (
                           <button
                              key={index}
                              name="color"
                              style={{ background: c }}
                              className={`${
                                 color === c ? "color-btn active" : "color-btn"
                              }`}
                              data-color={c}
                              onClick={handleUpdateFilters}
                           >
                              {color === c ? <FaCheck /> : null}
                           </button>
                        )
                     })}
                  </div>
               </div>

               <div className="form-control">
                  <h5>price</h5>
                  <p className="price">{formatPrice(price)}</p>
                  <input
                     type="range"
                     name="price"
                     min={minPrice}
                     max={maxPrice}
                     value={price}
                     onChange={handleUpdateFilters}
                  />
               </div>

               <div className="form-control shipping">
                  <label htmlFor="shipping">free shipping</label>
                  <input
                     type="checkbox"
                     name="shipping"
                     id="shipping"
                     checked={shipping}
                     onChange={handleUpdateFilters}
                  />
               </div>
            </form>
            <button
               type="button"
               className="clear-btn"
               onClick={() => dispatch(clearFilters())}
            >
               clear filters
            </button>
         </div>
      </section>
   )
}

export default React.memo(Filters)
