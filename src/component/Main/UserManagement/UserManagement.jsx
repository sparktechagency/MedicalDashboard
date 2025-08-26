
import { Table, ConfigProvider, Space, Button } from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { useGetAllUserQuery } from "../../../redux/features/user-management/user-management";
import { imageBaseUrl } from "../../../config/imageBaseUrl";


const UserManagement = () => {
  const { data, error, isLoading } = useGetAllUserQuery({ role: "user", limit: 10, page: 1 });

  // Define loading and error states for handling API data
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users!</div>;

  // Dynamically mapping data from the API response
  const dataSource = data?.data?.attributes?.results.map((user, index) => ({
    key: user.id, // Unique key for each user (using 'id' from the API response)
    sl: String(index + 1), // Serial number
    userName: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    createdAt: moment(user.createdAt).format("YYYY-MM-DD"), 
    currentBalance: user.currentBalance,
    totalIncome: user.totalIncome,
    userImage: user.image , 
  })) || []; 

  // Columns for the Ant Design Table
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
              src={`${record.userImage}`}
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
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
    <div className="w-full rounded-lg">
      {/* Header with Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">User List</h2>
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
            rowKey="key"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default UserManagement;
