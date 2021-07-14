import React from "react"
import { useSelector } from "react-redux"
import GridView from "../GridView/GridView"
import ListView from "../ListView/ListView"

function ProductList() {
   const { gridView, filteredProducts } = useSelector(state => state.filters)
   if (!gridView) return <ListView filteredProducts={filteredProducts} />
   return <GridView filteredProducts={filteredProducts} />
}

export default React.memo(ProductList)
