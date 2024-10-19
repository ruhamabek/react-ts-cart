import Product from "./Product"
import useProduct from "../hooks/useProduct"
import useCart from "../hooks/useCart"
import { ReactElement } from "react";

const ProductList = () => {
  const { products } = useProduct();
  const {REDUCER_ACTIONS , dispatch, cart} = useCart();
   let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>
  if(products?.length){
   pageContent = products.map((product) => {
    const inCart = cart.some((item) => item.sku === product.sku)
    return (
      <Product
        key={product.sku}
        product={product}
        dispatch={dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
        inCart={inCart}
      />
           )
        })
      }

    const content = <main className="main main--products">
                        {pageContent}
                    </main>

    return content
}

export default ProductList
