const VendorRequestsDetails = () => {
  return (
    <div>
      <div className="w-full col-span-full md:col-span-6 rounded-lg bg-[#EEF9FE] p-5">
        {/* Vendor Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex space-x-4 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white cursor-pointer">
                {/* Replace with actual image */}
                <img
                  onClick={() => showModal(dataSource[0])}
                  src="/path_to_image/your_image.jpg"
                  alt="Vendor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2
                  className="font-semibold text-xl cursor-pointer hover:underline"
                  // Clicking the name will open modal with first product's data
                >
                  Hisham Islam
                </h2>
                <p className="text-gray-700">Location: New York, US</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 py-4 text-sm md:text-base">
              <p className="font-semibold min-w-[150px]">
                Product Name: <br />{" "}
                <span className="text-gray-700 font-normal">GE Vivid S70</span>
              </p>
              <p className="font-semibold min-w-[150px]">
                Product Category: <br />{" "}
                <span className="text-gray-700 font-normal">
                  Diagnostic Equipment
                </span>
              </p>
              <p className="font-semibold min-w-[150px]">
                Bid Price: <br />{" "}
                <span className="text-gray-700 font-normal">$200</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-10 py-2 text-sm md:text-base">
              <div>
                <h1 className="font-semibold">
                  Time <br />{" "}
                  <span className="text-gray-700 font-normal">
                    11 Oct 24, 11:10 PM
                  </span>
                </h1>
              </div>
              <div>
                <h1 className="font-semibold">
                  Product list <br />{" "}
                  <span className="text-gray-700 font-normal">200</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[30%] flex justify-center md:justify-end">
            <img
              src="https://i.ibb.co/bjzn3zKW/Rectangle-3.png"
              alt="Product"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        </div>

        <div className="py-3 text-sm md:text-base">
          <h3 className="font-semibold mb-1">Product Details</h3>
          <p className="text-gray-600 leading-relaxed">
            Advanced cardiovascular ultrasound system with crystal-clear imaging
            and intuitive workflow. Combines high performance with portability
            for efficient diagnostics anytime, anywhere.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-5">
        <button className="bg-[#48B1DB] text-white px-5 py-2  rounded-md">
          Approve
        </button>
        <button className="bg-[#EEF9FE] border border-[#48B1DB] text-black px-5 py-2 rounded-md">
          Decline
        </button>
      </div>
    </div>
  );
  rounded - md;
};

export default VendorRequestsDetails;
