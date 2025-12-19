const DirectoryItem = ({ category }) => {
   const { imageUrl, title } = category;
   return (
      <div className='min-w-[30%] h-60 w-80 flex flex-auto flex-col items-center justify-center border border-black mx-2 my-0 mb-4 overflow-hidden group hover:cursor-pointer'>
         <div
            className='w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-6000 ease-[cubic-bezier(0.25, 0.45, 0.45, 0.95)]'
            style={{
               backgroundImage: `url(${imageUrl})`,
            }}
         />
         <div className='h-24 px-6 py-0 flex flex-col items-center justify-center border border-black bg-white opacity-70 absolute group-hover:opacity-90'>
            <h2 className='font-bold my-0 mx-1.5 text-2xl text-gray-700'>
               {title}
            </h2>
            <p className='font-light text-base'>Shop Now</p>
         </div>
      </div>
   );
};

export default DirectoryItem;
