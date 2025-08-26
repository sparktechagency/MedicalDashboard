import { useState } from "react";
import { Table, ConfigProvider, Space, Button } from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetAllVendorQuery } from "../../../redux/features/Vendor/Vendor";
import moment from "moment";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const Vendorlist = () => {
  const { data } = useGetAllVendorQuery({ role: "seller" });

 
  const dataSource =
    data?.data?.attributes?.results.map((user, index) => ({
      key: user.id, 
      sl: String(index + 1),
      userName: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      createdAt: moment(user.createdAt).format("YYYY-MM-DD"), // Format date
      currentBalance: user.currentBalance,
      totalIncome: user.totalIncome,
      userImage: user.image,
    })) || []; 

  
  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            <img
              src={`${record.userImage}`}
              alt={record.userName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium">{record.userName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Time & Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
    },
    {
      title: "Total Income",
      dataIndex: "totalIncome",
      key: "totalIncome",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/Vendorlist/${record.key}`}>
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
        <h2 className="font-semibold text-xl">Vendor list</h2>
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

export default Vendorlist;
