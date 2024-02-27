import { Divider, Skeleton, Table, TableColumnsType } from "antd";
import { useGetAllSalesQuery } from "../../../redux/features/sales/salesApi";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const SalesHistory = () => {
  const { data, isLoading } = useGetAllSalesQuery(undefined);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      width: 100,
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 100,
    },
    {
      title: "Sales Date",
      dataIndex: "salesDate",
      width: 100,
    },
  ];

  if (isLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }

  return (
    <div>
      <p
        style={{
          fontSize: "28px",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        Smartphones Sales History
      </p>
      <Divider style={{ backgroundColor: "red" }} />

      <Table
        style={{
          borderRadius: "10px",
          boxShadow: "2px 2px 2px 1px rgba(0.5, 0, 0, 0.4)",
        }}
        columns={columns}
        dataSource={data?.data}
        scroll={{ y: 300 }}
      />
    </div>
  );
};

export default SalesHistory;
