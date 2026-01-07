const ProductDetailsLoader = () => {
  return (
    <div className="animate-pulse p-6 bg-gray-100 min-h-[70vh]">
      <div className="grid md:grid-cols-2 lg:md:grid-cols-3 items-start gap-5 mx-6 lg:mx-10 xl:mx-16 bg-gray-200 rounded-lg w-full">

        <div className="flex flex-col items-center justify-start gap-5 md:flex-row-reverse">

          <div className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] bg-gray-300 rounded-lg"></div>


          <div className="flex flex-row md:flex-col gap-5">
            <div className="h-20 w-20 rounded-lg bg-gray-300"></div>
            <div className="h-20 w-20 rounded-lg bg-gray-300"></div>
            <div className="h-20 w-20 rounded-lg bg-gray-300"></div>
            <div className="h-20 w-20 rounded-lg bg-gray-300"></div>
          </div>



        </div>

        <div className="flex flex-col gap-4">
          <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-7 w-full bg-gray-300 rounded"></div>
          <div className="h-7 w-1/3 bg-gray-300 rounded"></div>
          <div className="flex gap-4">
            <div className="bg-gray-300 h-10 w-24 rounded-lg"></div>
            <div className="bg-gray-300 h-10 w-24 rounded-lg"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsLoader;
