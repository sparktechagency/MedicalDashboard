import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const VendorRequestsDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Example dataSource
  const dataSource = [
    {
      key: "1",
      sl: "01",
      productName: "GE Vivid S70 Ultrasound Machine",
      category: "Diagnostic Equipment",
      price: "$200",
      bidPrice: "$210",
      timeAndDate: "11 Oct 24, 11:10 PM",
    },
    {
      key: "2",
      sl: "02",
      productName: "GE Vivid S70 Ultrasound Machine",
      category: "Diagnostic Equipment",
      price: "$200",
      bidPrice: "$210",
      timeAndDate: "12 Oct 24, 12:20 PM",
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
          <Button className="bg-[#48B1DB] text-white">Approve</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full col-span-full md:col-span-6 rounded-lg bg-[#EEF9FE] p-5">
      {/* Vendor Details */}
      <div>
        <div className="flex space-x-2 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
            {/* Placeholder image, replace with actual image */}
            <img
              onClick={() => showModal(dataSource[0])}
              src="/path_to_image/your_image.jpg"
              alt="Vendor"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2
              className="font-semibold text-xl cursor-pointer"
              // Clicking the name will open modal with first product's data
            >
              Hisham Islam
            </h2>
            <p className="text-gray-700">Location: New York, US</p>
          </div>
        </div>
        <div className="flex space-x-5 py-3">
          <p className="font-semibold">
            Product Name: <br /> <span className="text-gray-700">GE Vivid S70</span>
          </p>
          <p className="font-semibold">
            Product Category: <br /> <span className="text-gray-700">Diagnostic Equipment</span>
          </p>
          <p className="font-semibold">
            Bid Price: <br /> <span className="text-gray-700">$200</span>
          </p>
        </div>
        <div className="flex items-center space-x-10">
          <h1 className="font-semibold">
            Time <br /> <span className="text-gray-700">11 Oct 24, 11:10 PM</span>
          </h1>
          <h1 className="font-semibold">
            Product list <br /> <span className="text-gray-700">200</span>
          </h1>
        </div>
        <div className="py-3">
          <h3 className="font-semibold">Product Details</h3>
          <p className="text-gray-600">
            Advanced cardiovascular ultrasound system with crystal-clear imaging
            and intuitive workflow. Combines high performance with portability
            for efficient diagnostics anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Product Table */}
      <h3 className="font-semibold py-3 text-lg">Product List</h3>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#EEF9FE",
            colorPrimary: "#1890ff",
          },
          components: {
            Table: {
             headerBg: "#48B1DB",
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

      {/* Modal */}
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VendorRequestsDetails;
