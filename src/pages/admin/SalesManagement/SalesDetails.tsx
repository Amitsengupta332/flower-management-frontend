/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button, Col, Modal, Row, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllProductsQuery } from "../../../redux/features/createFlower/createProduct";
import FMForm from "../../../components/form/FMForm";
import FMInput from "../../../components/form/FMInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSalesMutation } from "../../../redux/features/sales/salesApi";
import { TFlowers } from "../../../types/flower.types";

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
        coupon: data.promoCode || null,
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
  const {
    data: AllProducts,
    // isLoading,
    // error,
  } = useGetAllProductsQuery(undefined);
  console.log(error);
  // const { data: AllProducts, isLoading } = useGetAllProductsQuery({});
  // console.log(AllProducts?.data, isLoading);
  const columns: TableColumnsType<TTableData> = [
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
        className="text-center"
        title="Sales Flowers"
        open={isModalOpen} // Change 'open' to 'visible'
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedProduct && (
          <FMForm onSubmit={handleSales}>
            <Row>
              <Col span={24}>
                <FMInput type="text" name="promoCode" label={"Promo Code"} />
              </Col>
            </Row>
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
