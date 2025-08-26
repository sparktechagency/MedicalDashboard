import { useState } from "react";
import { Table, ConfigProvider, Space, Button } from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetOrdersAllQuery } from "../../../redux/features/Orders/Orders";

const OrderList = () => {
  const { data } = useGetOrdersAllQuery();
  console.log(data);

  const dataSource = data?.data?.attributes.map((item, index) => ({
      key: item._id,
      sl: String(index + 1),
      bidderName: item.name,
      email: item.email,
      userImage: item.image, 
      productName: item.product.title,
      productId: item.product._id,
      bidPrice: `$${item.product.price}`, 
      bidTimeDate: moment(item.createdAt).format("DD MMM YYYY, hh:mm A"),
      status: item.status,
    })) || [];

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Bidder Name",
      dataIndex: "bidderName",
      key: "bidderName",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            <img
              src={record.userImage ? `${record.userImage}` : `default-avatar.png`} 
              alt={record.bidderName}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = `default-avatar.png`; }} 
            />
          </div>
          <span className="font-medium">{record.bidderName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Bid Price",
      dataIndex: "bidPrice",
      key: "bidPrice",
    },
    {
      title: "Bid Time & Date",
      dataIndex: "bidTimeDate",
      key: "bidTimeDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={
            status === "shipped"
              ? "bg-green-500 text-white rounded-full px-2 py-1"
              : status === "pending"
              ? "bg-orange-500 text-white rounded-full px-2 py-1"
              : "bg-red-500 text-white rounded-full px-2 py-1"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/Orders/Details/${record.productId}`}>
            <Button
              className="bg-[#48B1DB] text-white"
              icon={<AiFillEye size={20} />}
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full rounded-lg">
      {/* Header with Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Order list</h2>
      </div>
      {/* User Table */}
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#EEF9FE",
            colorPrimary: "#1890ff",
          },
          components: {
            Table: {
              headerBg: "#48B1DB",
              headerColor: "#000000",
              headerBorderRadius: 2,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
          scroll={{ x: 1000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default OrderList;