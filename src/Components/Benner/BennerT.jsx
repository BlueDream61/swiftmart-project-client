
import React from 'react';

const BennerT = ({img}) => {
  return (
    <div
      className="bg-cover bg-center md:w-full md:min-h-[860px] h-[425px]  flex justify-center items-center  md:bg-opacity-90"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="text-center md:flex  md:min-h-[860px] items-center w-[90%] mx-auto">
        <div className="max-w-xl md:w-3/4 ml-auto ">
          <i className="md:text-5xl text-4xl font-thin  text-red-600">Fashion Sale</i>
          <h1 className="md:text-6xl text-3xl font-semibold my-4 text-black">Minimal Men's Style</h1>
          <p className="mb-5 ">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <a href="#_" className="relative px-6 py-3 font-medium text-white group">
<span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#007a72] -500 group-hover:bg-[#16655f] -700 group-hover:skew-x-12"></span>
<span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-[#125751]  -700 group-hover:bg-[#007a72] -500 group-hover:-skew-x-12"></span>
<span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-[#007a72] -600 -rotate-12"></span>
<span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-[#007a72] -400 -rotate-12"></span>
<span className="relative">Shop Now</span>
</a>
        </div>
      </div>
    </div>
  );
};

export default BennerT;
