import React, { useState } from "react";
import { Pagination, Button } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    id: "1",
    name: "Hisham Islam",
    location: "New York, US",
    productName: "GE Vivid S70 Ultrasound Machine",
    productCategory: "Diagnostic Equipment",
    bidPrice: "$200",
    time: "2 Day 2 Hour",
    productList: 5,
    imageUrl: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
  },
  {
    id: "1",
    name: "Hisham Islam",
    location: "New York, US",
    productName: "GE Vivid S70 Ultrasound Machine",
    productCategory: "Diagnostic Equipment",
    bidPrice: "$200",
    time: "2 Day 2 Hour",
    productList: 5,
    imageUrl: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
  },
  {
    id: "1",
    name: "Hisham Islam",
    location: "New York, US",
    productName: "GE Vivid S70 Ultrasound Machine",
    productCategory: "Diagnostic Equipment",
    bidPrice: "$200",
    time: "2 Day 2 Hour",
    productList: 5,
    imageUrl: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
  },
  {
    id: "1",
    name: "Hisham Islam",
    location: "New York, US",
    productName: "GE Vivid S70 Ultrasound Machine",
    productCategory: "Diagnostic Equipment",
    bidPrice: "$200",
    time: "2 Day 2 Hour",
    productList: 5,
    imageUrl: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
  },
  {
    id: "1",
    name: "Hisham Islam",
    location: "New York, US",
    productName: "GE Vivid S70 Ultrasound Machine",
    productCategory: "Diagnostic Equipment",
    bidPrice: "$200",
    time: "2 Day 2 Hour",
    productList: 5,
    imageUrl: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
  },
  // ... other data items
];

const VendorRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginateData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full mx-auto px-2  py-6 md:py-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 md:gap-6 lg:gap-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
           Product  Request List
        </h1>
        <div className="flex items-center bg-blue-100 p-2 rounded w-full sm:w-auto max-w-xs lg:max-w-xs">
          <label htmlFor="filter" className="mr-2 text-sm lg:text-base">
            Filter:
          </label>
          <select
            id="filter"
            className="p-1.5 rounded bg-blue-100 text-sm lg:text-base w-full"
            aria-label="Filter vendor requests"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        {paginateData.map((record) => (
          <div
            key={record.id}
            className="flex flex-col sm:flex-row justify-between items-start p-4 sm:p-5 md:p-2 lg:p-6 bg-[#EEF9FE] rounded-lg transition-transform transform"
          >
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 md:mr-2 lg:mr-6 self-start">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden aspect-square">
                <img
                  src={record.imageUrl}
                  alt={`${record.productName} image`}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src = "https://i.ibb.co/bjzn3zKW/Rectangle-3.png")
                  }
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="border-b border-gray-200 pb-2 mb-2 lg:pb-3 lg:mb-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-base md:text-lg lg:text-xl">
                    {record.name}
                  </div>
                  <div className="text-sm md:text-base lg:text-lg text-gray-500">
                    {record.location.split(" ").slice(0, 3).join(" ")}...
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm sm:text-base md:text-base lg:text-lg truncate">
                    <h1 className="font-medium">Product Name</h1>
                    <span className="text-gray-500">
                      {" "}
                      {record.productName.split(" ").slice(0, 3).join(" ")}...
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 md:gap-2 lg:gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 flex-1">
                  <div className="text-sm sm:text-base md:text-base lg:text-lg md:mr-2 lg:mr-0">
                    <h1 className="font-medium">Category</h1>
                    <span className="text-gray-500">
                      {record.productCategory.split(" ").slice(0, 3).join(" ")}
                      ...
                    </span>
                  </div>
                  <div className="text-sm sm:text-base md:text-base lg:text-lg">
                    <h1 className="font-medium">Bid</h1>
                    <span className="text-gray-500">{record.bidPrice}</span>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:space-x-2 xl:space-x-36">
                  <div className="text-sm sm:text-base md:text-base lg:text-lg">
                    <h1 className="font-medium">Time</h1>
                    <span className="text-gray-500">{record.time}</span>
                  </div>
                  {/* <div className="text-sm sm:text-base md:text-sm lg:text-lg lg:text-center">
                    <h1 className="font-medium">Product</h1>
                    <span className="text-gray-500">{record.productList}</span>
                  </div> */}
                  <Link to={`/VendorRequest/${record.id}`}>
                    <Button
                      type="primary"
                      className="h-12 text-xs sm:text-sm md:text-base w-full sm:w-auto lg:px-2 md:px-0"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6 px-0 lg:px-0">
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          className="text-center text-sm md:text-base lg:text-lg"
          showSizeChanger={false}
          size="default"
        />
      </div>
    </div>
  );
};

export default VendorRequest;
