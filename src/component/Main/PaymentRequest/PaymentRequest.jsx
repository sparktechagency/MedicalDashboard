import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button, Upload, message } from "antd";
import { FaEye } from "react-icons/fa";
import { CameraOutlined } from "@ant-design/icons";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetPaymentRequestQuery, useMakeApprovePaymentMutation } from "../../../redux/features/PaymentRequest/PaymentRequest";

const PaymentRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  
  const { data } = useGetPaymentRequestQuery();
  const allData = data?.data;
  const [makeApprovePayment] = useMakeApprovePaymentMutation();

  const allProducts = allData?.map((product) => ({
    ...product,
    id: product._id,
    name: product.author.name,
    phone: product.author.phone,
    status: product.status,
    userName: product.author.name,
    useImage: product.image,
    price: product.amount,
    transactionId: product.transactionId,
    bidPrice: product.amount,
    timeAndDate: new Date(product.createdAt).toLocaleString(),
    MainBalance: `$${product.author.currentBalance}`,
    WithdrawalBalance: `$${product.amount}`,
    AvailableBalance: `$${product.availableAmount}`,
  })) || [];

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
    setUploadedFile(null);
    setFileList([]);
  };

  const handleApprove = async () => {
    const status = "approve";
    const formData = new FormData();
    formData.append("status", status);
    
    if (uploadedFile) {
      formData.append("image", uploadedFile);
    }
    const { id } = selectedProduct;
    try {
      const res = await makeApprovePayment({ id, data: formData }).unwrap();
      console.log("Approval response:", res);
      message.success("Payment request approved successfully!");
      handleCancel();
    } catch (error) {
      console.error("Error approving request:", error?.data?.message);
      const errorMessage = error?.data?.message || "Failed to approve payment request";
      message.error(errorMessage);
    }
  };

  const handleDecline = async () => {
    const status = "decline";
    const formData = new FormData();
    formData.append("status", status);
    if (uploadedFile) {
      formData.append("image", uploadedFile);
    }
    const { id } = selectedProduct;
    try {
      const res = await makeApprovePayment({ id, data: formData }).unwrap();
      console.log("Decline response:", res);
      message.success("Payment request declined successfully!");
      handleCancel();
    } catch (error) {
      console.error("Error declining request:", error?.data?.message);
      const errorMessage = error?.data?.message || "Failed to decline payment request";
      message.error(errorMessage);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: fileList,
    beforeUpload: (file) => {
      // Check file type
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      
      // Check file size (limit to 5MB)
      const isLessThan5M = file.size / 1024 / 1024 < 5;
      if (!isLessThan5M) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }
      
      setUploadedFile(file);
      setFileList([file]);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setUploadedFile(null);
      setFileList([]);
    },
    onChange: (info) => {
      console.log("Upload info:", info);
      setFileList(info.fileList);
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
      title: "Seller Name",
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
            scroll={{ x: 800 }}
          />
        </ConfigProvider>
      </div>

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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Receipt/Proof (Optional)
              </label>
              <Upload.Dragger {...uploadProps} className="bg-blue-50 rounded-lg">
                <div className="flex flex-col items-center justify-center py-8">
                  <CameraOutlined className="text-3xl text-blue-500 mb-3" />
                  <span className="text-blue-600 font-medium text-base">
                    Click or drag file to upload
                  </span>
                  <span className="text-gray-500 text-sm mt-2">
                    Support: JPG, PNG,  
                  </span>
                </div>
              </Upload.Dragger>
            </div>
            
            
            
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