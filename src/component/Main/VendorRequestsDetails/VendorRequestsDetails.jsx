import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetProductSinglesQuery, useUpdateApproveProductMutation, useUpdatedeclineProductMutation } from "../../../redux/features/VendorRequests/VendorRequests";
import moment from "moment/moment";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { message } from "antd";

const VendorRequestsDetails = () => {
  const { id } = useParams();
  const { data } = useGetProductSinglesQuery(id);
  const product = data?.data;
  
  const [UpdatedeclineProduct] = useUpdatedeclineProductMutation();
  const [UpdateApproveProduct] = useUpdateApproveProductMutation();

  // Fix: Using the Navigate component correctly.
  const navigate = useNavigate();

  const handleDeclineProduct = async (id) => {
    try {
      const res = await UpdatedeclineProduct(id).unwrap();
      if (res.code === 200) {
        message.success("Product declined successfully");
        navigate("/vendorRequest");
      }
    } catch (error) {
      console.error("Failed to decline product:", error);
    }
  };

  const handleAproveProduct = async (id) => {
    try {
      const res = await UpdateApproveProduct(id).unwrap();
      if (res.code === 200) {
        message.success("Product approved successfully");
        navigate("/vendorRequest");
      }
    } catch (error) {
      console.error("Failed to approve product:", error);
    }
  };

  return (
    <div>
      <div className="w-full col-span-full md:col-span-6 rounded-lg bg-[#EEF9FE] p-5">
        {/* Vendor Details */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex space-x-2 md:space-x-4 items-center">
              <div className="w-auto overflow-hidden cursor-pointer">
                <img
                  src={`${imageBaseUrl}/${product?.attributes?.author?.image}`}
                  alt="Vendor"
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col w-full">
                <h2 className="font-semibold text-xl cursor-pointer hover:underline">
                  {product?.attributes?.author?.name}
                </h2>
                <p className="text-gray-700">
                  Location: {product?.attributes?.author?.address || "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 py-4 text-sm md:text-base">
              <p className="font-semibold min-w-[150px]">
                Product Name: <br />
                <span className="text-gray-700 font-normal">
                  {product?.attributes?.title}
                </span>
              </p>
              <p className="font-semibold min-w-[150px]">
                Product Category: <br />
                <span className="text-gray-700 font-normal">
                  {product?.attributes?.category?.name}
                </span>
              </p>
              <p className="font-semibold min-w-[150px]">
                Bid Price: <br />
                <span className="text-gray-700 font-normal">
                  ${product?.attributes?.price}
                </span>
              </p>
              <p className="font-semibold min-w-[150px]">
                Time <br />
                <span className="text-gray-700 font-normal">
                  {moment(product?.attributes?.date).format('MMMM Do YYYY')}
                </span>
              </p>
              <p className="font-semibold min-w-[150px]">
                Product list <br />
                <span className="text-gray-700 font-normal">
                  {product?.attributes?.images?.length || 0}
                </span>
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[30%] flex justify-center md:justify-end">
            <img
              src={`${imageBaseUrl}/${product?.attributes?.images?.[0]}`}
              alt="Product"
              className="max-w-full h-[300px] rounded-md"
            />
          </div>
        </div>

        <div className="xl:-mt-10 lg:-mt-2 -mt-0 pt-8 md:py-0 text-sm md:text-base">
          <h3 className="font-semibold mb-1">Product Details</h3>
          <p className="text-gray-600 leading-relaxed">
            {product?.attributes?.description}
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-5">
        <button onClick={() => handleAproveProduct(id)} className="bg-[#48B1DB] text-white px-5 py-2 rounded-md">
          Approve
        </button>
        <button onClick={() => handleDeclineProduct(id)} className="bg-[#EEF9FE] border border-[#48B1DB] text-black px-5 py-2 rounded-md">
          Decline
        </button>
      </div>
    </div>
  );
};

export default VendorRequestsDetails;
