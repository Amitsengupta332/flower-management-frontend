import { Button, Table, TableColumnsType, TableProps } from "antd";
import {
  useDeleteFlowerMutation,
  useGetAllProductsQuery,
} from "../../../redux/features/createFlower/createProduct";
import { TFlowers } from "../../../types/flower.types";
import { useState } from "react";
import { TQueryParam } from "../../../types/global";
import { EditOutlined } from "@ant-design/icons";
import { CopyOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TableRowSelection } from "antd/es/table/interface";

// interface DataType {
//   key: React.Key;
//   productName: string;
//   productQuantity: string;
//   price: string;
//   bloomDate: string;
//   color: string;
//   selectCategory: string;
//   size: string;
//   fragrance: string;
// }
export type TTableData = Pick<
  TFlowers,
  | "productName"
  | "productQuantity"
  | "price"
  | "bloomDate"
  | "color"
  | "selectCategory"
  | "fragrance"
>;

const AllFlower = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: AllProducts } = useGetAllProductsQuery(params);
  console.log(AllProducts);

  const [deleteFlower] = useDeleteFlowerMutation();

  const tableData = AllProducts?.data?.map(
    ({
      _id,
      productName,
      productQuantity,
      price,
      bloomDate,
      color,
      selectCategory,
      size,
      fragrance,
    }) => ({
      key: _id,
      productName,
      productQuantity,
      price,
      bloomDate,
      color,
      selectCategory,
      size,
      fragrance,
    })
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<TTableData> = {
    selectedRowKeys,
    onChange: onSelectChange,
    // selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "productName",
      dataIndex: "productName",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
    },
    // {
    //   title: "Age",
    //   dataIndex: "age",
    //   defaultSortOrder: "descend",
    //   sorter: (a, b) => a.age - b.age,
    // },
    {
      title: "Quantity",
      key: "productQuantity",
      dataIndex: "productQuantity",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "BloomDate",
      key: "bloomDate",
      dataIndex: "bloomDate",
    },
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
    },
    {
      title: "Category",
      key: "selectCategory",
      dataIndex: "selectCategory",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
    },
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
      filters: [
        {
          text: "S",
          value: "s",
        },
        {
          text: "M",
          value: "m",
        },
        {
          text: "L",
          value: "l",
        },
      ],
    },
    {
      title: "Fragrance",
      key: "fragrance",
      dataIndex: "fragrance",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (record) => {
        return (
          <>
            {/* <Link to={`/admin/update-flower/${record._id}`}> */}
            <Button
              onClick={() => {
                handleUpdate(record);
              }}
            >
              <EditOutlined style={{ color: "blue" }} />
            </Button>
            {/* </Link> */}

            <Button
              onClick={() => {
                handleCreateVarient(record);
              }}
              style={{ marginLeft: "10px" }}
            >
              <CopyOutlined
                style={{
                  marginLeft: "px",
                  fontSize: "px",
                  color: "orange",
                }}
              />
            </Button>
            <Button
              onClick={() => {
                handleDelete(record);
              }}
              style={{ marginLeft: "10px" }}
            >
              <DeleteOutlined
                style={{ marginLeft: "px", fontSize: "px", color: "red" }}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const handleCreateVarient = (record: any) => {
    navigate(`/admin/create-variant/${record._id}`);
    // <Link to={`/create-variant/${record._id}`}></Link>;
  };

  const handleUpdate = (record: any) => {
    navigate(`/admin/update-flower/${record._id}`);
  };

  const handleDelete = async (record: any) => {
    const toastId = toast.loading("Deleting flower data ... ");
    const res = await deleteFlower(record._id).unwrap();
    console.log(res);
    toast.success("Product Deleted Successfully", {
      id: toastId,
      duration: 2000,
    });
  };

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.size?.forEach((item) =>
        queryParams.push({ name: "size", value: item })
      );

      // filters.year?.forEach((item) =>
      //   queryParams.push({ name: "year", value: item })
      // );

      setParams(queryParams);
    }
    console.log("params", pagination, filters, sorter, extra);
    // console.log(filters);
  };
  return (
    <Table
      columns={columns}
      // dataSource={AllProducts?.data}
      dataSource={tableData}
      onChange={onChange}
      rowSelection={rowSelection}
    />
  );
};

export default AllFlower;
