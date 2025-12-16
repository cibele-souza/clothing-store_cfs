import { useState } from 'react';

import ProductsContext from './products.context';

import PRODUCTS from '../shop-data.json';

const ProductsProvider = ({ children }) => {
   const [products, setProducts] = useState(PRODUCTS);
   const value = { products };

   return (
      <ProductsContext.Provider value={value}>
         {children}
      </ProductsContext.Provider>
   );
};

export default ProductsProvider;
