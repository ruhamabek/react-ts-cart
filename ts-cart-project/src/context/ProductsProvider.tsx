import { useEffect ,createContext , useState, ReactElement } from "react";

type ProductsType = {
  sku: string;
  name: string;
  price: number;
};

const initState: ProductsType[] = [];
type useProductsContextType = {
  products: ProductsType[];
}

const initContext: useProductsContextType = {
  products: [],
}

export const ProductsContext = createContext<useProductsContextType>(initContext);

type Children = {
  children: ReactElement | ReactElement[];
}

export const ProductsProvider = ( {children} : Children ): ReactElement => {

  const [products, setProducts] = useState<ProductsType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductsType[]> => {
      const data = await fetch("https://localhost:3500/products")
       .then((res) => res.json())
       .catch((err) => {
         if (err instanceof Error) console.log(err.message);
       })
       return data
   }
        fetchProducts().then(products => setProducts(products));
  }, [])
    
  return (
    <ProductsContext.Provider value={{products}}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContext