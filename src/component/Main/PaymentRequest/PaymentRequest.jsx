import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button, Upload } from "antd";
import { FaEye } from "react-icons/fa";
import { CameraOutlined } from "@ant-design/icons";
import { imageBaseUrl } from "../../../config/imageBaseUrl"; 
import { useGetPaymentRequestQuery } from "../../../redux/features/PaymentRequest/PaymentRequest";

const PaymentRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data } = useGetPaymentRequestQuery();
  const AllData = data?.data?.attributes;

  const allProducts = AllData?.map((product) => ({
    ...product,
    id: product._id,
    name: product.product.title,
    status: product.status,
    userName: product.author.name,
    useImage: product.author.image,
    price: product.product.price,
    transactionId: product.transactionId,
    bidPrice: product.amount,
    timeAndDate: new Date(product.createdAt).toLocaleString(),
    MainBalance: "$1000", // Static for demo; replace with actual data
    WithdrawalBalance: "$900", // Static for demo; replace with actual data
    AvailableBalance: "$100", // Static for demo; replace with actual data
  })) || [];

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleApprove = () => {
    // Implement approval logic (e.g., API call)
    console.log("Approved:", selectedProduct);
    handleCancel();
  };

  const handleDecline = () => {
    // Implement decline logic (e.g., API call)
    console.log("Declined:", selectedProduct);
    handleCancel();
  };

  // Upload props for Ant Design Upload component
  const uploadProps = {
    name: "file",
    action: "https://api.example.com/upload", // Replace with your upload endpoint
    headers: {
      authorization: "authorization-text", // Replace with actual auth if needed
    },
    onChange(info) {
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Seller  Name",
      key: "userInfo",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8"
            src={record.useImage ? `${imageBaseUrl}/${record.useImage}` : "default-image-path.jpg"}
            alt="User Image"
            style={{ borderRadius: "50%" }}
          />
          <span>{record.userName}</span>
        </div>
      ),
    },
    
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Main Balance",
      dataIndex: "MainBalance",
      key: "MainBalance",
    },
    {
      title: "Withdrawal Balance",
      dataIndex: "WithdrawalBalance",
      key: "WithdrawalBalance",
    },
    {
      title: "Available Balance",
      dataIndex: "AvailableBalance",
      key: "AvailableBalance",
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
      <h2 className="font-semibold py-1 text-[20px]">Payment Request</h2>
      <div>
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

      {/* Withdrawal Request Modal */}
      <Modal
        title="Withdrawal Request"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={500}
        className="withdrawal-modal"
        centered
      >
        {selectedProduct && (
          <div className="space-y-6 pt-4">
            {/* Withdrawal Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Withdrawal Balance
              </label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <span className="text-xl font-semibold text-gray-800">
                  {selectedProduct.WithdrawalBalance}
                </span>
              </div>
            </div>

            {/* Balance Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Main Balance
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <span className="text-lg font-semibold text-gray-800">
                    {selectedProduct.MainBalance}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Available Balance
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <span className="text-lg font-semibold text-gray-800">
                    {selectedProduct.AvailableBalance}
                  </span>
                </div>
              </div>
            </div>

            {/* Upload Photo */}
            <div>
              <Upload.Dragger {...uploadProps} className="bg-blue-50 rounded-lg">
                <div className="flex flex-col items-center justify-center py-8">
                  <CameraOutlined className="text-3xl text-blue-500 mb-3" />
                  <span className="text-blue-600 font-medium text-base">
                    Upload Photo
                  </span>
                </div>
              </Upload.Dragger>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <Button
                onClick={handleDecline}
                className="px-8 py-2 h-10 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 rounded-lg font-medium"
              >
                Decline
              </Button>
              <Button
                type="primary"
                onClick={handleApprove}
                className="px-8 py-2 h-10 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg font-medium"
              >
                Approved
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentRequest;