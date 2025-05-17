import { useState } from "react";
import { Table, ConfigProvider, Space, Button, Select, Modal } from "antd";
import { AiFillEye } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

const Message = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const dataSource = [
    {
      key: "1",
      sl: "01",
      userName: "Bashar",
      email: "info@gmail.com",
      phone: "089999******",
      time: "11 April, 2025, 10AM",
      userImage: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
      message:
        "Hi, I'd like to exchange this dress.I'd like to exchange this dress.I'd like to exchange this dress.",
    },
    {
      key: "2",
      sl: "02",
      userName: "Bashar",
      email: "info@gmail.com",
      phone: "089999******",
      time: "11 April, 2025, 10AM",
      userImage: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
      message:
        "Hi, I'd like to exchange this dress.I'd like to exchange this dress.I'd like to exchange this dress.",
    },
    // Add more rows as needed...
  ];

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const showModal = (record) => {
    setSelectedMessage(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedMessage(null);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
      width: 60,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            <img
              src={record.userImage}
              alt={record.userName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium">{record.userName}</span>
        </div>
      ),
      width: 180,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 180,
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => showModal(record)}
            className="bg-[#48B1DB] text-white hover:bg-[#3399cc] border-none"
            icon={<FaEye  size={20} />}
            shape="circle"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Message</h2>
      </div>

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
            pageSize: 9,
            showSizeChanger: false,
          }}
          scroll={{ x: 700 }}
          bordered={false}
        />
      </ConfigProvider>

      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="read"
            type="primary"
            onClick={() => {
              // You can add your "Read" logic here
              handleModalClose();
            }}
            style={{ backgroundColor: "#48B1DB", borderColor: "#48B1DB" }}
          >
            Read
          </Button>,
          <Button
            key="unread"
            onClick={() => {
              // You can add your "Unread" logic here
              handleModalClose();
            }}
            style={{
              backgroundColor: "#48B1DB",
              borderColor: "#48B1DB",
              color: "white",
            }}
          >
            Unread
          </Button>,
        ]}
        centered
        bodyStyle={{ borderRadius: "16px", padding: "20px" }}
        style={{ borderRadius: "16px" }}
        width={360}
        title={<h3 className="font-semibold text-lg">Message</h3>}
      >
        {selectedMessage && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedMessage.userImage}
                alt={selectedMessage.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">{selectedMessage.userName}</span>
            </div>
            <p className="mb-4 whitespace-pre-wrap">
              {selectedMessage.message}
            </p>
            <p className="mb-1">{selectedMessage.email}</p>
            <p className="mb-4">{selectedMessage.phone}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Message;
