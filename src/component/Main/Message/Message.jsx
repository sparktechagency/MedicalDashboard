import { useState } from "react";
import { Table, ConfigProvider, Space, Button, Modal, message } from "antd";
import { FaEye } from "react-icons/fa";
import moment from "moment"; 
import { useGetAllMessageQuery, useUpdateMessageMutation } from "../../../redux/features/message/message";

const Message = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  console.log(selectedMessage?._id);


  // Fetch messages from the API
  const { data, refetch } = useGetAllMessageQuery();
  const alldata = data?.data?.attributes || [];

  // Map the API data to the dataSource for the table
  const dataSource = alldata.map((message, index) => ({
    key: message._id,
    sl: (index + 1).toString().padStart(2, "0"),
    userName: message.name,
    email: message.email,
    phone: message.phone,
    time: moment(message.createdAt).format("YYYY-MM-DD"), 
    userImage: message.userImage, 
    message: message.message,
    isRead: message.isRead, 
  }));

  const [UpdateMessage] = useUpdateMessageMutation();

  // Handle message update (mark as read/unread)
  const handleUpdate = async (id) => {
    try {
    
      const res = await UpdateMessage(id)
      if (res.code === 200) {
        message.success("Message updated successfully");
        refetch(); 
      }
    } catch (error) {
      console.error("Error updating message:", error);
      message.error("Error updating message");
    }
  };


  const showModal = (record) => {
    setSelectedMessage(record);
    setModalVisible(true);
  };

  // Close the modal
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
            onClick={() => showModal(record)} // Open modal on button click
            className="bg-[#48B1DB] text-white hover:bg-[#3399cc] border-none"
            icon={<FaEye size={20} />}
            shape="circle"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Messages</h2>
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
              // handleUpdate(id); 
              handleModalClose();
            }}
            style={{ backgroundColor: "#48B1DB", borderColor: "#48B1DB" }}
          >
            Read
          </Button>,
          <Button
            key="unread"
            onClick={() => {
              // handleUpdate(id); 
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
        style={{ borderRadius: "16px" }}
        width={360}
        title={<h3 className="font-semibold text-lg">Message</h3>}
      >
        {selectedMessage && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-medium">{selectedMessage.userName}</span>
            </div>
            <p className="mb-4 whitespace-pre-wrap">{selectedMessage.message}</p>
            <p className="mb-1">{selectedMessage.email}</p>
            <p className="mb-4">{selectedMessage.phone}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Message;
