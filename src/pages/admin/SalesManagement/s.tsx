/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, Modal, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllProductsQuery } from "../../../redux/features/createFlower/createProduct";
import FMForm from "../../../components/form/FMForm";
import FMInput from "../../../components/form/FMInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";

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
const SalesDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sales, { error }] = useCreateSalesMutation();
  console.log(error);
  type TFlower = {
    productName: string;
    productQuantity: string;
    price: string;
    bloomDate: string;
    color: string;
    selectCategory: string;
    size: string;
    fragrance: string;
    _id: string;
  };
  const showModal = (record: TFlower) => {
    setSelectedProduct(record._id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSales = async (data: FieldValues) => {
    const toastId = toast.loading("Selling flower ... ");

    try {
      const salesInfo = {
        productId: selectedProduct,
        quantity: parseInt(data.quantity, 10),
        buyerName: data.buyerName,
        salesDate: data.salesDate,
      };
      const res = await sales(salesInfo).unwrap();
      toast.success("Sales Created Successfully", {
        id: toastId,
        duration: 2000,
      });
      console.log(res);
      // dispatch(addSales(res.data));
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
    setIsModalOpen(false);
  };

  const { data: AllProducts, isLoading } = useGetAllProductsQuery({});
  console.log(AllProducts?.data, isLoading);
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
      width: 120,
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => {
                showModal(record);
              }}
              style={{ backgroundColor: "#5173FA", color: "white" }}
            >
              Sell
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={AllProducts?.data} />;
      <Modal
        title="Sales Flowers"
        open={isModalOpen} // Change 'open' to 'visible'
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedProduct && (
          <FMForm onSubmit={handleSales}>
            <FMInput
              type="text"
              name="buyerName"
              label="Buyer Name"
              // placeholder="buyer name"
            />
            <FMInput
              type="text"
              name="quantity"
              label="Product Quantity"
              // placeholder="product quantity"
            />
            <FMInput
              type="date"
              name="salesDate"
              label="Sale Date"
              // placeholder="Sale Date"
            />

            <Button htmlType="submit">Flower Sale</Button>
          </FMForm>
        )}
      </Modal>
    </div>
  );
};

export default SalesDetails;