import { useEffect, useState } from 'react';

import CategoriesContext from './categories.context';

/* (used once, to populate the collection DB)
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
// import SHOP_DATA from '../shop-data.js';
*/

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

const CategoriesProvider = ({ children }) => {
   const [categoriesMap, setcategoriesMap] = useState({});

   /* (used once, to populate the collection DB)
   // Fire the addCollectionAndDocument method to fire just once
   useEffect(() => {
      addCollectionAndDocuments('categories', SHOP_DATA);
   }, []);
   */

   useEffect(() => {
      const getCategoriesMap = async () => {
         const categoryMap = await getCategoriesAndDocuments();
         setcategoriesMap(categoryMap);
      };
      getCategoriesMap();
   });

   const value = { categoriesMap };

   return (
      <CategoriesContext.Provider value={value}>
         {children}
      </CategoriesContext.Provider>
   );
};

export default CategoriesProvider;
