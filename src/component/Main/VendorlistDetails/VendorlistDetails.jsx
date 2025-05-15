import { Table, Button, ConfigProvider } from "antd";
import { EyeOutlined, LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const VendorlistDetails = () => {
  const user = {
    profileImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png",
    fullName: "Mr. Bashar Islam",
    name: "Bashar islam",
    email: "demo@gmail.com",
    dob: "17 Jan 1995",
    phone: "55555555555555",
    joiningDate: "16 Dec 2024",
  };

  const bidDetails = [
    {
      key: "1",
      sl: "01",
      productName: "GE Vivid S70 Ultrasound Machine",
      category: "Diagnostic Equipment",
      price: "$200",
      date: "14/4/2025",
      image: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
    },
    {
      key: "2",
      sl: "02",
      productName: "GE Vivid S70 Ultrasound Machine",
      category: "Diagnostic Equipment",
      price: "$200",
      date: "14/4/2025",
      image: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
    },
    {
      key: "3",
      sl: "03",
      productName: "GE Vivid S70 Ultrasound Machine",
      category: "Diagnostic Equipment",
      price: "$200",
      date: "14/4/2025",
      image: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
    },
    {
      key: "4",
      sl: "04",
      productName: "GE Vivid S70 Ultrasound Machine",
      category: "Diagnostic Equipment",
      price: "$200",
      date: "14/4/2025",
      image: "https://i.ibb.co/bjzn3zKW/Rectangle-3.png",
    },
  ];

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
      width: 60,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.image}
            alt={record.productName}
            className="w-16 h-12 rounded-md object-cover"
          />
          <span>{text}</span>
        </div>
      ),
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
      width: 100,
    },
    {
      title: " Time & Date",
      dataIndex: "date",
      key: "date",
      width: 140,
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: () => <Button icon={<EyeOutlined />} type="text" />,
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-8">
        <Link to="/Vendorlist" className="text-gray-500 hover:text-gray-800">
          <LeftOutlined style={{ fontSize: 20 }} />
        </Link>
        <h2 className="text-2xl font-semibold">Vendor list Details </h2>
      </div>

      {/* Profile */}
      <div className="flex items-center space-x-6 mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
          <img
            src={user.profileImage}
            alt={user.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">{user.fullName}</h3>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-12 w-full md:max-w-3xl mb-10">
        {[
          { label: "Name", value: user.name },
          { label: "Email", value: user.email },
          { label: "Date of Birth", value: user.dob },
          { label: "Phone number", value: user.phone },
          { label: "Joining date", value: user.joiningDate },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between border-b border-gray-300 pb-2"
          >
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>

      {/* User Bid Details */}
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
          dataSource={bidDetails}
          pagination={{
            pageSize: 8,
          }}
          scroll={{ x: 1000 }}
          bordered
        />
      </ConfigProvider>
    </div>
  );
};

export default VendorlistDetails;
