import React from 'react';
import { Link } from 'react-router-dom';

const Cetegory = ({data}) => {
   const { image,title ,Cetegoryname} = data
   return (
      <div className='mb-3 md:mb-0'>
         <div

            className="relative  bg-white rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-transform duration-700"
         >
            <div className="group">
               <img
                  src={image}
                  alt=""
                  className="w-full  h-auto object-cover opacity-100 scale-100 group-hover:scale-125 transition-transform group-hover:opacity-80 duration-1000"
               />

               <div className="p-4 absolute bottom-0  left-0 right-0  transform translate-y-full group-hover:translate-y-0 transition-all duration-1000">
                  <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-3 md:mb-5">{title}</h3>
                  <span className='flex justify-center'>
                  <Link to={"/home"} className='text-center'>
                     <span  class="relative md:px-5 px-4 py-1 md:py-2 font-medium text-white group">
                        <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-pink-700 group-hover:bg-pink-500 group-hover:skew-x-12"></span>
                        <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-pink-500 group-hover:bg-pink-600 group-hover:-skew-x-12"></span>
                        <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-pink-600 -rotate-12"></span>
                        <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-pink-400 -rotate-12"></span>
                        <span class="relative">Shop Now</span>
                     </span>
                  </Link>
                  </span>

               </div>
            </div>
         </div>
      </div>

   );
};

export default Cetegory;