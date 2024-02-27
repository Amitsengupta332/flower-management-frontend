import { Button, Col, Divider, Row, Skeleton } from "antd";
import FMForm from "../../../components/form/FMForm";
import FMInput from "../../../components/form/FMInput";
import SelectInput from "../../../components/form/FMSelect";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useGetSingleFlowerQuery,
  useProductMutation,
} from "../../../redux/features/createFlower/createProduct";
import { toast } from "sonner";

const Varient = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleFlowerQuery(id);
  const [product, { error }] = useProductMutation();
  console.log(data);
  console.log(error);

  if (isLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }
  const flower = data?.data;
  const defaultValue = {
    productName: flower?.productName,
    productQuantity: flower?.productQuantity,
    price: flower?.price,
    bloomDate: flower?.bloomDate,
    color: flower?.color,
    selectCategory: flower?.selectCategory,
    size: flower?.size,
    fragrance: flower?.fragrance,
  };

  const handleVariantFlower = async (data: FieldValues) => {
    const toastId = toast.loading("New variant is creating ");
    console.log(data);
    try {
      if (!flower) {
        toast.error("Phone data not available", {
          id: toastId,
          duration: 2000,
        });
        return;
      }

      const products = {
        productName: data.productName ? data.productName : data.productName,
        productQuantity: data.productQuantity,
        price: data.price ? data.price : data.price,
        bloomDate: data.bloomDate,
        color: data.color,
        selectCategory: data.selectCategory,
        size: data.size,
        fragrance: data.fragrance,
      };
      console.log(products);
      const res = await product(products).unwrap();
      console.log(res);
      toast.success("New variant created successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <div>
        <h1 className="text-center my-4">Variant Flower</h1>
      </div>
      <Divider />
      <FMForm onSubmit={handleVariantFlower} defaultValues={defaultValue}>
        <Row justify="space-between" align="top">
          <Col>
            <FMInput
              type="text"
              name="productName"
              label="Product Name"
              // defaultValue={flower?.productName}
            />
          </Col>
          <Col>
            <FMInput
              type="text"
              name="productQuantity"
              label="Product Quantity"
              // defaultValue={flower.productQuantity}
            />
          </Col>
          <Col>
            <FMInput
              type="text"
              name="price"
              label="Price"
              // defaultValue={flower.price}
            />
          </Col>
        </Row>
        <Row justify="space-between" align="top">
          <Col>
            <FMInput
              type="date"
              name="bloomDate"
              label="Bloom Date"
              // defaultValue={flower.bloomDate}
            />
          </Col>
          <Col>
            <FMInput
              type="text"
              name="color"
              label="Color"
              // defaultValue={flower.color}
            />
          </Col>
          <Col>
            <SelectInput
              type="select"
              name="selectCategory"
              label="Select Category"
              // defaultValue={flower?.selectCategory}
              options={[
                { label: "Roses", value: "Roses" },
                { label: "Lilies", value: "Lilies" },
                { label: "Sunflowers", value: "Sunflowers" },
                { label: "Tulips", value: "Tulips" },
                { label: "Orchids", value: "Orchids" },
              ]}
            />
          </Col>
        </Row>
        <Row justify="space-evenly" align="top">
          <Col>
            <SelectInput
              type="select"
              name="size"
              label="Size"
              // defaultValue={flower?.size}
              options={[
                { label: "S", value: "s" },
                { label: "M", value: "m" },
                { label: "L", value: "l" },
              ]}
            />
          </Col>
          <Col>
            <SelectInput
              type="select"
              name="fragrance"
              label="Fragrance"
              // defaultValue={flower?.fragrance}
              options={[
                { label: "Rose", value: "Rose" },
                { label: "Lily", value: "Lily" },
                { label: "Jasmine", value: "Jasmine" },
                { label: "Lavender", value: "Lavender" },
                { label: "Citrus", value: "Citrus" },
              ]}
            />
          </Col>
        </Row>
        <Button htmlType="submit">Create Variant</Button>
      </FMForm>
    </div>
  );
};

export default Varient;
