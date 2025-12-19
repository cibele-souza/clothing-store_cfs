import { Link } from 'react-router';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
   return (
      <div className='category-preview-container'>
         <h2>
            <Link className='title' to={title}>
               {title.toUpperCase()}
            </Link>
         </h2>
         <div className='preview'>
            {
               // _ (underline) -> means we are not going to use the first argument of the function (ie. the current value)
               products
                  .filter((_, idx) => idx < 4)
                  .map((product) => (
                     <ProductCard key={product.id} product={product} />
                  ))
            }
         </div>
      </div>
   );
};

export default CategoryPreview;
