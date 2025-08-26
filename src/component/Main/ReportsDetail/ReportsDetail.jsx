import { useParams, useNavigate } from "react-router-dom";
import {  useDeleteReportMutation, useGetSingleReportQuery } from "../../../redux/features/report/report";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { message } from "antd";

const ReportsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleReportQuery(id);

  const report = data?.data?.attributes;
  const reporter = report?.author;
  const reportedUser = report?.bid?.author;
  const product = report?.bid?.product;

  const [deleteReport] = useDeleteReportMutation();

  const handleReportDelete = async (reportId) => {
    try {
      const res = await deleteReport(reportId);
      if (res?.data?.code === 200) {
        message.success("Report deleted successfully");
        navigate("/Reports");
      } else {
        message.error("Failed to delete report");
      }
    } catch (error) {
      message.error("Error deleting report");
      console.error("Failed to delete report:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Back Button */}
      <div className="flex items-center mb-4 cursor-pointer" onClick={() => navigate(-1)}>
        <IoIosArrowBack className="text-xl mr-2" />
        <h2 className="text-xl font-semibold">Reports Details</h2>
      </div>

      {/* Product Info Box */}
      <div className="bg-[#50C5F3] text-white rounded-md flex justify-between items-center p-4 mb-6">
        <div className="flex items-start space-x-4">
          <img
            src={`${product?.images[0]}`}
            alt="Product"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <div className="mb-1">
              <span className="font-semibold">Product Name</span>: {product?.title || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Details</span>: {product?.description || "N/A"}
            </div>
          </div>
        </div>
        {/* Use an arrow function to pass `id` to the handler */}
        <FaTrashAlt onClick={() => handleReportDelete(id)} className="text-white cursor-pointer text-lg" />
      </div>

      {/* Reporter & Reported User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-md bg-white p-4">
        {/* Reporter */}
        <div className="flex flex-col space-y-4 border-b md:border-b-0 md:border-r border-[#E8D0B8] md:pr-4">
          <div className="flex items-center space-x-4">
            <img
              src={`${reporter?.image}`}
              alt="Reporter"
              className="w-20 h-20 rounded-full object-cover"
            />
            <h3 className="font-semibold text-lg">Mr. {reporter?.name || "N/A"}</h3>
          </div>
          <div className="text-sm space-y-1">
            <p className="py-2 border-b border-[#C9EDFB]">
              <span className="font-semibold">Report By</span>: {reporter?.name || "N/A"}
            </p>
            <p className="py-2 border-b border-[#C9EDFB]">
              <span className="font-semibold">Email</span>: {reporter?.email || "N/A"}
            </p>
            <p className="py-2 border-b border-[#C9EDFB]">
              <span className="font-semibold">Phone Number</span>: {reporter?.phone || "N/A"}
            </p>
          </div>
        </div>

        {/* Reported User */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={`${reportedUser?.image}`}
              alt="Reported User"
              className="w-20 h-20 rounded-full object-cover"
            />
            <h3 className="font-semibold text-lg">Mr. {reportedUser?.name || "N/A"}</h3>
          </div>
          <div className="text-sm space-y-1">
            <p className="py-2 border-b border-[#C9EDFB]">
              <span className="font-semibold">Report User</span>: {reportedUser?.name || "N/A"}
            </p>
            <p className="py-2 border-b border-[#C9EDFB]">
              <span className="font-semibold">Email</span>: {reportedUser?.email || "N/A"}
            </p>
            <p className="py-2 border-b border-[#C9EDFB]">
              <span className="font-semibold">Phone Number</span>: {reportedUser?.phone || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDetail;

