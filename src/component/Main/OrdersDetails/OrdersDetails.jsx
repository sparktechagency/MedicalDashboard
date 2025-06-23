import React from 'react';
import { ArrowLeft } from "lucide-react";
import { useParams } from 'react-router-dom';
import { useGetOrdersSingleQuery } from '../../../redux/features/Orders/Orders';

const OrdersDetails = () => {
    const { id } = useParams();
    const { data,  } = useGetOrdersSingleQuery(id);

    

    // Extract order details from the response data
    const order = data?.data?.attributes;

    // Ensure the necessary data exists
    const bid = order?.bid || {};
    const product = order?.product || {};
    const author = bid?.author || {};

    // Format currency
    const formatCurrency = (amount) => {
        return `$${amount}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
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
                                src={author?.image ? `${imageBaseUrl}/${author.image}` : `${imageBaseUrl}/default-avatar.png`}
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

                    {/* Product Images */}
                    <div className="flex flex-wrap gap-4 py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Product Images</span>
                        <div className="flex gap-2">
                            {product?.images?.map((image, index) => (
                                <img 
                                    key={index}
                                    src={`${imageBaseUrl}/${image}`}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bid Time & Date (raw date) */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Bid Time & Date</span>
                        <span className="text-gray-900">
                            {bid?.createdAt || 'N/A'}
                        </span>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Status</span>
                        <span className="text-gray-900">{order?.status || 'N/A'}</span>
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
                    <div className="pt-6 flex justify-end">
                        <button 
                            className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
                        >
                            {order?.status === 'shipped' ? 'Product Shipped' : 'Product Not Shipped'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersDetails;
