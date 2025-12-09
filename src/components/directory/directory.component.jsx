import CategoryItem from "../category-item/category-item.component"

const Directory = ({categories}) => {
   return (
      <div className="w-full flex flex-wrap justify-center items-center px-1.5">
         {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
         ))}
      </div>
   )
}

export default Directory