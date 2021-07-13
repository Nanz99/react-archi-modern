import React from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import "./SingleProduct.style.scss"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getSingleProduct } from "features/Products/productsSlice"
import { useSelector } from "react-redux"
import Breadcrumb from "components/Breadcrumb/Breadcrumb"
import singleProductImg from "../../../assets/images/bread3.jpg"
import ProductImage from "../components/ProductImage/ProductImage"
import Stars from "../components/Stars/Stars"
import { formatPrice } from "helpers/helpers"
import Loading from "components/Loading/Loading"
import AddToCart from "../components/AddToCart/AddToCart"
function SingleProduct() {
   const { id } = useParams()
   const history = useHistory()
   const dispatch = useDispatch()
   const {
      singleProduct_error: error,
      singleProduct_loading: loading,
      singleProduct
   } = useSelector(state => state.products)

   useEffect(() => {
      dispatch(
         getSingleProduct(
            `https://course-api.com/react-store-single-product?id=${id}`,
            singleProduct
         )
      )// eslint-disable-next-line
   }, [dispatch, id])
   useEffect(() => {
      if (error) {
         setTimeout(() => {
            history.push("/")
         }, 3000)
      }
   }, [error, history])

   if (loading) {
      return <Loading />
   }
   const {
      name,
      images,
      price,
      description,
      stock,
      stars,
      reviews,
      id: sku,
      company
   } = singleProduct
   return (
      <main className="singleproduct__container">
         <Breadcrumb title={name} product bgImg={singleProductImg} />
         <div className="section section-center page">
            <Link to="/products" className="btn__product">
               back to products
            </Link>
            <div className="product__center">
               {images && <ProductImage images={images} />}
               <section className="content">
                  <h2>{name}</h2>
                  <Stars stars={stars} reviews={reviews} />
                  <h5 className="price">{formatPrice(price)}</h5>
                  <p className="desc">{description}</p>
                  <p className="info">
                     <span>Available : </span>
                     {stock > 0 ? "In stock" : "out of stock"}
                  </p>
                  <p className="info">
                     <span>SKU :</span>
                     {sku}
                  </p>
                  <p className="info">
                     <span>Brand :</span>
                     {company}
                  </p>
                  <hr />
                  {stock > 0 && <AddToCart product={singleProduct} />}
               </section>
            </div>
         </div>
      </main>
   )
}

export default React.memo(SingleProduct)
