import React from "react"
import "./Sort.style.scss"
import { BsFillGridFill, BsList } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import {
   setGridView,
   setListView,
   updateSort
} from "features/Products/filtersSlice"
function Sort() {
   const dispatch = useDispatch()
   const sort = useSelector(state => state.filters.sort)
   const products = useSelector(state => state.filters.filteredProducts)
   const gridView = useSelector(state => state.filters.gridView)
   const handleSortValue = e => {
      const value = e.target.value
      dispatch(updateSort(value))
   }
   return (
      <div className="sort__container">
         <div className="btn__conatiner">
            <button
               onClick={() => dispatch(setGridView())}
               className={`${gridView ? "active" : null}`}
            >
               <BsFillGridFill />
            </button>
            <button
               onClick={() => dispatch(setListView())}
               className={`${!gridView ? "active" : null}`}
            >
               <BsList />
            </button>
         </div>
         <p>{products.length} Products Found</p>
         <hr />
         <form action="">
            <label htmlFor="sort">Sort By:</label>
            <select
               name="sort"
               value={sort}
               onChange={(e) => handleSortValue(e)}
               className="sort__input"
               id="sort"
            >
               <option value='price-lowest'>price (lowest)</option>
               <option value='price-highest'>price (highest)</option>
               <option value='name-a'>name (a - z)</option>
               <option value='name-z'>name (z - a)</option>
            </select>
         </form>
      </div>
   )
}

export default React.memo(Sort)
