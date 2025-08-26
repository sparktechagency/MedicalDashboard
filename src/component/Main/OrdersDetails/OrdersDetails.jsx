import React from 'react';
import { ArrowLeft } from "lucide-react";
import { useParams } from 'react-router-dom';
import { useDeliveryNowMutation, useDeliveryProductMutation, useGetOrdersSingleQuery } from '../../../redux/features/Orders/Orders';
import { imageBaseUrl } from '../../../config/imageBaseUrl';
import moment from 'moment';
import { message } from 'antd'; 

const OrdersDetails = () => {
    const { id } = useParams();
    const { data, } = useGetOrdersSingleQuery(id);
    console.log(data);

    // Extract order details from the response data
    const order = data?.data?.attributes;
    const bidId = order?.bid?._id;

    // Ensure the necessary data exists
    const bid = order?.bid || {};
    const product = order?.product || {};
    const author = bid?.author || {};

    // Format currency
    const formatCurrency = (amount) => {
        return `$${amount}`;
    };

    const [sendingproduct] = useDeliveryProductMutation();
    const [deliveryNow] = useDeliveryNowMutation();

    // Handle sending product
    const handleSendingProduct = async(id) => {
      try {
        const res = await sendingproduct(id);
        console.log(res);
        if(res?.data?.code === 200){
          message.success(res?.data?.message);
        }
      } catch (error) {
        console.error(error);
        message.error("Something went wrong while sending the product");
      }
    }

    // Handle delivery now
    const handleDeliveryNow = async(id) => {
      try {
        const res = await deliveryNow(id);
        console.log(res);
        if(res?.data?.code === 200){
          message.success(res?.data?.message);
        }
      } catch (error) {
        console.error(error);
        message.error("Something went wrong while processing delivery");
      }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 mt-5 rounded-md">
            <div className="max-w-2xl mx-auto bg-white rounded-lg">
                {/* Header */}
                <div className="flex items-center gap-3 p-6 ">
                    <button className="text-gray-400 hover:text-gray-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-medium text-gray-900">User Order Details</h1>
                </div>

                {/* User Profile Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center overflow-hidden">
                            <img 
                                src={author?.image ? `${author.image}` : `default-avatar.png`}
                                alt={author?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">
                                {author?.name || 'Unknown User'}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="p-6 space-y-0">
                    {/* Bid Amount */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Bid Amount</span>
                        <span className="text-gray-900 font-semibold">
                            {formatCurrency(bid?.bidAmount || 0)}
                        </span>
                    </div>

                    {/* Product Name */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Product Name</span>
                        <span className="text-gray-900">{product?.title || 'N/A'}</span>
                    </div>

                    {/* Product Description */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Product Description</span>
                        <span className="text-gray-900">{product?.description || 'N/A'}</span>
                    </div>

                    {/* Product Price */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Product Price</span>
                        <span className="text-gray-900 font-semibold">
                            {formatCurrency(product?.price || 0)}
                        </span>
                    </div>

                    {/* Bid Time & Date (raw date) */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Bid Time & Date</span>
                        <span className="text-gray-900">
                           {bid?.createdAt ? moment(bid.createdAt).format('YYYY-MM-DD') : 'N/A'}
                        </span>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Status</span>
                        <span className="text-gray-900">{order?.bid?.status || 'N/A'}</span>
                    </div>

                    {/* Payment Status */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Payment Status</span>
                        <span className="text-gray-900">{bid?.paymentStatus || 'N/A'}</span>
                    </div>

                    {/* Location */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Location</span>
                        <span className="text-gray-900">{author?.address || 'N/A'}</span>
                    </div>

                    {/* Status Button */}
                    <div className="pt-6 flex justify-end space-x-4">
                        {order?.bid?.status === 'progress' ? (
                            <button
                            onClick={() => handleSendingProduct(bidId)} // Correct invocation with arrow function
                            className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
                            >
                             Sending Product
                            </button>
                        ) : order?.bid?.status === 'shipped' ? (
                            <button
                            onClick={() => handleDeliveryNow(bidId)} // Correct invocation with arrow function
                            className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
                            >
                             Delivery Now
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersDetails;
