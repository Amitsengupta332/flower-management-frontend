import { Button, Skeleton, Table, TableColumnsType, TableProps } from "antd";
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

type TAllFlowerProps = {
  subRoute?: string;
};

const AllFlower = ({ subRoute }: TAllFlowerProps) => {
  console.log(subRoute);
  const navigate = useNavigate();
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: AllProducts,
    isLoading,
    error,
  } = useGetAllProductsQuery(params);
  console.log(error);

  const [deleteFlower] = useDeleteFlowerMutation();

  // const tableData = AllProducts?.data?.map(
  //   ({
  //     _id,
  //     productName,
  //     productQuantity,
  //     price,
  //     bloomDate,
  //     color,
  //     selectCategory,
  //     size,
  //     fragrance,
  //   }) => ({
  //     key: _id,
  //     productName,
  //     productQuantity,
  //     price,
  //     bloomDate,
  //     color,
  //     selectCategory,
  //     size,
  //     fragrance,
  //   })
  // );

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
      filters: [
        {
          text: "Red",
          value: "Red",
        },
        {
          text: "Orange",
          value: "Orange",
        },
        {
          text: "Yellow",
          value: "Yellow",
        },
        {
          text: "Green",
          value: "Green",
        },
        {
          text: "Blue",
          value: "Blue",
        },
      ],
    },
    {
      title: "Category",
      key: "selectCategory",
      dataIndex: "selectCategory",
      filters: [
        {
          text: "Roses",
          value: "Roses",
        },
        {
          text: "Lilies",
          value: "Lilies",
        },
        {
          text: "Sunflowers",
          value: "Sunflowers",
        },
        {
          text: "Tulips",
          value: "Tulips",
        },
        {
          text: "Orchids",
          value: "Orchids",
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
      filters: [
        {
          text: "Rose",
          value: "Rose",
        },
        {
          text: "Lily",
          value: "Lily",
        },
        {
          text: "Jasmine",
          value: "Jasmine",
        },
        {
          text: "Lavender",
          value: "Lavender",
        },
        {
          text: "Citrus",
          value: "Citrus",
        },
      ],
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
    navigate(`/${subRoute}/create-variant/${record._id}`);
    // <Link to={`/create-variant/${record._id}`}></Link>;
  };

  const handleUpdate = (record: any) => {
    navigate(`/${subRoute}/update-flower/${record._id}`);
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
      filters.selectCategory?.forEach((item) =>
        queryParams.push({ name: "selectCategory", value: item })
      );
      filters.fragrance?.forEach((item) =>
        queryParams.push({ name: "fragrance", value: item })
      );
      filters.color?.forEach((item) =>
        queryParams.push({ name: "color", value: item })
      );

      // filters.year?.forEach((item) =>
      //   queryParams.push({ name: "year", value: item })
      // );

      setParams(queryParams);
    }
    console.log("params", pagination, filters, sorter, extra);
    // console.log(filters);
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }
  return (
    <Table
      columns={columns}
      dataSource={AllProducts?.data}
      // dataSource={tableData}
      onChange={onChange}
      rowSelection={rowSelection}
    />
  );
};

export default AllFlower;
