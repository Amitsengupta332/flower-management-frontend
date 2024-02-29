/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, Skeleton, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  useDeleteFlowerMutation,
  useGetAllProductsQuery,
} from "../../../redux/features/createFlower/createProduct";
import { EditOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TableRowSelection } from "antd/es/table/interface";

interface DataType {
  key: React.Key;
  productName: string;
  productQuantity: string;
  price: string;
  bloomDate: string;
  color: string;
  selectCategory: string;
  size: string;
  fragrance: string;
}
const AllFlower = () => {
  const navigate = useNavigate();
  const { data: AllProducts, isLoading, error } = useGetAllProductsQuery({});
  console.log(AllProducts?.data, isLoading, error);
  const [deleteFlower] = useDeleteFlowerMutation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    // selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "BloomDate",
      dataIndex: "bloomDate",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Category",
      dataIndex: "selectCategory",
    },
    {
      title: "Size",
      dataIndex: "size",
    },
    {
      title: "Fragrance",
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

  if (isLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={AllProducts?.data}
        // scroll={{ x: 1500, y: 350 }}
        rowSelection={rowSelection}
      />
      ;
    </div>
  );
};

export default AllFlower;
