import { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useGetRecentUserQuery } from "../../../redux/features/user/userApi";
import image from "../../../assets/user.png"; // Default image path
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const RecentTransactions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch data from the Redux API
  const { data } = useGetRecentUserQuery();
  // console.log(data?.attributes?.results); // Log data for debugging
  const dataSource = (data?.attributes?.results || []).slice(0, 6);
  // console.log(dataSource); // Log dataSource for debugging

  // Show modal with user details
  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
      render: (_, record, index) => index + 1, // Generate sequential numbers for each row
    },
    {
      title: "Name & Image",
      dataIndex: "nameAndImage",
      key: "nameAndImage",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.image ? `${imageBaseUrl}/${record.image}` : `${image}`}
            alt="user"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => new Date(record.createdAt).toLocaleDateString(), // Format date
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <InfoCircleOutlined
          onClick={() => showModal(record)} // Open modal when clicked
          style={{ fontSize: "18px", cursor: "pointer" }}
        />
      ),
    },
  ];

  return (
    <div>
      <h2>Recent Users</h2>
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
          dataSource={dataSource}
          columns={columns}
          rowKey="email"
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </ConfigProvider>

      {/* Modal for displaying user details */}
      <Modal
        title="User Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <p className="flex justify-between border-b border-gray-500 py-5 "><strong>Email:</strong> {selectedUser?.email || "N/A"}</p>
          <p className="flex justify-between border-b border-gray-500 py-5 "><strong>Phone:</strong> {selectedUser?.phone || "N/A"}</p>
          <p className="flex justify-between border-b border-gray-500 py-5 "><strong>Name:</strong> {selectedUser?.name || "N/A"}</p>
          <p className="py-5">
            <img 
              src={selectedUser?.image ? `${imageBaseUrl}/${selectedUser.image}` : `${image}`}
              alt="user" 
              className="w-40 h-40 object-cover rounded-lg"
            />
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default RecentTransactions;

