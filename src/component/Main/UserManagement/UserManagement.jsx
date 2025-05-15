import { useState } from "react";
import { Table, ConfigProvider, Space, Button, Select } from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [filter, setFilter] = useState("Month");

  // Example dataSource
  const dataSource = [
    {
      key: "1",
      sl: "01",
      userName: "Bashar",
      email: "SupportInfo@Gmail.Com",
      phone: "999-888-666",
      timeAndDate: "11 Oct 24, 11:10 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png", // User image URL
    },
    {
      key: "2",
      sl: "02",
      userName: "Bashar",
      email: "SupportInfo@Gmail.Com",
      phone: "999-888-666",
      timeAndDate: "12 Oct 24, 12:20 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png", // User image URL
    },
    {
      key: "2",
      sl: "02",
      userName: "Bashar",
      email: "SupportInfo@Gmail.Com",
      phone: "999-888-666",
      timeAndDate: "12 Oct 24, 12:20 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png", // User image URL
    },
    {
      key: "2",
      sl: "02",
      userName: "Bashar",
      email: "SupportInfo@Gmail.Com",
      phone: "999-888-666",
      timeAndDate: "12 Oct 24, 12:20 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png", // User image URL
    },
    {
      key: "2",
      sl: "02",
      userName: "Bashar",
      email: "SupportInfo@Gmail.Com",
      phone: "999-888-666",
      timeAndDate: "12 Oct 24, 12:20 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png", // User image URL
    },
    {
      key: "2",
      sl: "02",
      userName: "Bashar",
      email: "SupportInfo@Gmail.Com",
      phone: "999-888-666",
      timeAndDate: "12 Oct 24, 12:20 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png", // User image URL
    },
    {
      key: "2",
      sl: "02",
      userName: "Bashar",
      email: "SupportInfo@Gmail.Com",
      phone: "999-888-666",
      timeAndDate: "12 Oct 24, 12:20 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png", // User image URL
    },
    // Add more items here
  ];

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

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
              src={
                record.userImage || "https://i.ibb.co/0C5x0zk/Ellipse-1232.png"
              }
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
      title: "Time & Date",
      dataIndex: "timeAndDate",
      key: "timeAndDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/users/${record.key}`}>
            <Button
              className="bg-[#48B1DB] text-white"
              icon={<AiFillEye size={20} />}
            ></Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full rounded-lg ">
      {/* Header with Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">User List</h2>
        <Select
          value={filter}
          onChange={handleFilterChange}
          options={[
            { value: "Month", label: "Filter: Month" },
            { value: "Week", label: "Filter: Week" },
            { value: "Year", label: "Filter: Year" },
          ]}
          className="w-32"
        />
      </div>

     <div>
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
    </div>
  );
};

export default UserManagement;
