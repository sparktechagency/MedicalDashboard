import { useState } from "react";
import { Modal, Space, Table, ConfigProvider } from "antd";
import { FaEye } from "react-icons/fa";
import { useGetAllEarningsQuery } from "../../../redux/features/Earnings/Earnings";
import { imageBaseUrl } from "../../../config/imageBaseUrl";  // Make sure this is correctly set
import { useGetBitAllQuery } from "../../../redux/features/ProductManagement/ProductManagement";
import { useParams } from "react-router-dom";

const Bit = () => {
 const {id} = useParams();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data } = useGetBitAllQuery(id);
  console.log(data)
  const AllData = data?.data?.attributes;

  const allProducts = AllData?.map((product) => ({
    ...product,
    id: product._id,
    name: product.product.title,
    image: product.product.images?.[0],
    status: product.status,
    userName: product.author.name,
    useImage: product.author.image,
    price: product.product.price,
    transactionId: product.transactionId,
    bidPrice: product.amount,
    timeAndDate: new Date(product.createdAt).toLocaleString(),
  })) || [];

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
      render: (_, __, index) => index + 1,
    },
    {
      title: "User Info",
      key: "userInfo",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8"
            src={record.useImage ? `${record.useImage}` : "default-image-path.jpg"}
            alt="User Image"
            style={{ borderRadius: "50%" }}
          />
          <span>{record.userName}</span>
        </div>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Amount",
      dataIndex: "bidPrice",
      key: "bidPrice",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
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
      
      
      <h2 className="font-semibold py-1 text-[20px]">All Bit </h2>
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
            dataSource={allProducts}
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
              <p>{selectedProduct?.name || "N/A"}</p>
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
            {/* Image section removed as requested */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Bit;