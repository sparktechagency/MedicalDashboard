import { useState } from "react";
import { Space, Table, Form, ConfigProvider, Button, Spin, Modal } from "antd";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/user-management/user-management";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";

const UserManagement = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState(""); // Search text state

  const [removeUser] = useDeleteUserMutation();

  const { data: userData, isLoading, error } = useGetAllUsersQuery();

  const allUserDatas = userData?.data?.attributes?.results || [];

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filteredData = allUserDatas
    .filter((user) => {
      return (
        user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    })
    .map((user, index) => ({
      si: index + 1,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      subscription: user.subscription,
      profileImage: user.profileImage,
      _id: user.id,
    }));

  // Function to remove user
  const handleremoveUser = async () => {
    if (user) {
      const data = { userId: user.id }; // Ensure that you're using the correct user ID
      try {
        const response = await removeUser(data); // Remove user API call
        if (response.data) {
          toast.success(response?.data?.message || "User removed successfully");
          handleCancel(); // Close the modal after successful deletion
        }
      } catch (error) {
        toast.error("Failed to remove user");
      }
    }
  };

  const columns = [
    {
      title: <span>{t("S.No")}</span>,
      dataIndex: "si",
      key: "si",
    },
    {
      title: <span>{t("User Name")}</span>,
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <div className="flex items-center space-x-2 ">
          <img
            src={`${imageBaseUrl}/${record.profileImage}`}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <h1>{record.fullName}</h1>
        </div>
      ),
    },
    {
      title: <span>{t("Email")}</span>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: <span>{t("Joining Date")}</span>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: <span>{t("Subscription Status")}</span>,
      dataIndex: "subscription",
      key: "subscription",
      render: (subscription) => subscription?.status || "None",
    },
    {
      title: <span>{t("Action")}</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <IoEyeSharp
            onClick={() => handleView(record)}
            size={22}
            className="text-gray-500 cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  // Filter the data based on search text

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Update search term on input change
  };

  return (
    <section className="mr-2">
      <div className="md:flex justify-between items-center mt-2">
        <h1 className="md:text-2xl font-semibold py-2">{t("User List")}</h1>
        <Form className="w-full md:w-[15%] flex items-center border border-gray-300 rounded-md p-2 shadow-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder={t("Search...")}
            className="flex-1 outline-none bg-transparent border-none focus:border-none"
            value={searchText}
            onChange={handleSearchChange} // Call handleSearchChange on input change
          />
        </Form>
      </div>

      <br />

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">Error fetching users.</p>
      ) : (
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#F4F5F7",
              colorPrimary: "#1890ff",
            },
            components: {
              Table: {
                headerBg: "#EDD9B7",
                headerColor: "#000000",
                headerBorderRadius: 1,
              },
            },
          }}
        >
          <Table
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              onChange: setCurrentPage,
            }}
            columns={columns}
            dataSource={filteredData} // Use filtered data here
            rowKey="id"
            scroll={{ x: 500 }}
          />
        </ConfigProvider>
      )}

      {/* Modal to show all details of the user */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="modal-container"
      >
        <h1 className="text-2xl font-semibold text-center">
          {t("User Details")}
        </h1>
        <div className="modal-content mt-4">
          {/* User Name */}
          <div className="flex justify-between mt-2 border-b border-black py-2">
            <div className="font-semibold">{t("User Name")}</div>
            <div>{user?.fullName}</div>
          </div>

          {/* Email */}
          <div className="flex justify-between mt-2 border-b border-black py-2">
            <div className="font-semibold">{t("Email")}</div>
            <div>{user?.email}</div>
          </div>

          {/* Phone */}
          <div className="flex justify-between mt-2 border-b border-black py-2">
            <div className="font-semibold">{t("Phone")}</div>
            <div>{user?.phoneNumber}</div>
          </div>

          {/* Subscription Status */}
          <div className="flex justify-between mt-2 border-b border-black py-2">
            <div className="font-semibold">{t("Subscription Status")}</div>
            <div>{user?.subscription?.status || "None"}</div>
          </div>

          {/* Joining Date */}
          <div className="flex justify-between mt-2 border-b border-black py-2">
            <div className="font-semibold">{t("Joining Date")}</div>
            <div>{new Date(user?.createdAt).toLocaleDateString()}</div>
          </div>

          <div className="flex justify-center mt-6 space-x-6">
            <Button onClick={handleremoveUser}>Remove</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default UserManagement;
