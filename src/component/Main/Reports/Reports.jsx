import { Space, Table, ConfigProvider } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useGetAllReportQuery } from "../../../redux/features/report/report";
import moment from "moment";
import { Link } from "react-router-dom"; // ✅ Make sure you import this

const Reports = () => {
  const { data, isLoading } = useGetAllReportQuery(); // Optional loading state
  const allData = data?.data?.attributes || [];

  // ✅ Map your data into Ant Design Table format
  const dataSource = allData.map((item, index) => ({
    key: item._id,
    sl: `${index + 1}`.padStart(2, "0"),
    reportedBy: item.author?.name || "N/A",
    vendorName: item.bid?.author?.name || "N/A",
    type: item.title || "N/A",
    date: moment(item.createdAt).format("DD MMMM, YYYY"),
  }));

  // ✅ Define columns for Ant Table
  const columns = [
    { title: "#SL", dataIndex: "sl", key: "sl" },
    { title: "Reported By", dataIndex: "reportedBy", key: "reportedBy" },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/reports/${record.key}`}>
            <InfoCircleOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full col-span-full md:col-span-6 rounded-lg">
      <h2 className="font-semibold py-1 text-[20px]">Reports List</h2>

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
          loading={isLoading} // ✅ show spinner while loading
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            position: ["bottomRight"],
          }}
          scroll={{ x: 1000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Reports;
