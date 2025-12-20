import ProductCard from '../product-card/product-card.component';

import {
   CategoryPreviewContainer,
   Title,
   Preview,
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
   return (
      <CategoryPreviewContainer>
         <h2>
            <Title to={title}>{title.toUpperCase()}</Title>
         </h2>
         <Preview>
            {
               // _ (underline) -> means we are not going to use the first argument of the function (ie. the current value)
               products
                  .filter((_, idx) => idx < 4)
                  .map((product) => (
                     <ProductCard key={product.id} product={product} />
                  ))
            }
         </Preview>
      </CategoryPreviewContainer>
   );
};

export default CategoryPreview;
