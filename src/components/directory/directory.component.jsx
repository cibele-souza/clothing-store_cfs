import DirectoryItem from '../directory-item/directory-item.component';

const Directory = ({ categories }) => {
   return (
      <div className='w-full flex flex-wrap justify-center items-center px-1.5'>
         {categories.map((category) => (
            <DirectoryItem key={category.id} category={category} />
         ))}
      </div>
   );
};

export default Directory;
