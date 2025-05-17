
import React, { useState } from "react";
import { Modal, Space, Table, ConfigProvider } from "antd";
import { FaEye } from "react-icons/fa";

const Earnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Example dataSource with user image and user name
  const dataSource = [
    {
      key: "1",
      sl: "01",
      productName: "GE Vivid S70 Ultrasound Machine",
      category: "Diagnostic Equipment",
      price: "$200",
      bidPrice: "$210",
      timeAndDate: "11 Oct 24, 11:10 PM",
      useImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png",
      userName: "John Doe",
    },
    {
      key: "2",
      sl: "02",
      productName: "GE Vivid S70 Ultrasound Machine",
      category: "Diagnostic Equipment",
      price: "$200",
      bidPrice: "$210",
      timeAndDate: "11 Oct 24, 11:10 PM",
      useImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png",
      userName: "Jane Smith",
    },
    // Add more items here
  ];

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "User Info",
      key: "userInfo",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8"
            src={record.useImage}
            alt="User Image"
            style={{ borderRadius: "50%" }}
          />
          <span>{record.userName}</span>
        </div>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Bid Price",
      dataIndex: "bidPrice",
      key: "bidPrice",
    },
    {
      title: "Time & Date",
      dataIndex: "timeAndDate",
      key: "timeAndDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <FaEye 
            onClick={() => showModal(record)}
            style={{ fontSize: "18px", cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full col-span-full md:col-span-6 rounded-lg">
      <h2 className="font-semibold py-1 text-[20px]">Earnings</h2>
      <div className="">
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
              pageSize: 10,
              position: ["bottomRight"],
            }}
            scroll={{ x: 1000 }}
          />
        </ConfigProvider>
      </div>

      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-black p-2">
          <h1 className="text-center text-xl font-semibold my-2 text-gray-500">
            Product Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>Product Name :</p>
              <p>{selectedProduct?.productName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>Category:</p>
              <p>{selectedProduct?.category || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>Price :</p>
              <p>{selectedProduct?.price || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>Bid Price:</p>
              <p>{selectedProduct?.bidPrice || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>Time & Date :</p>
              <p>{selectedProduct?.timeAndDate || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>User Name:</p>
              <p>{selectedProduct?.userName || "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Earnings;
