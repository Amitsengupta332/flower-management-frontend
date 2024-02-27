import { Button, Col, Divider, Row } from "antd";
import FMForm from "../../../components/form/FMForm";
import FMInput from "../../../components/form/FMInput";
import { useProductMutation } from "../../../redux/features/createFlower/createProduct";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import SelectInput from "../../../components/form/FMSelect";

const CreateFlower = () => {
  const [product] = useProductMutation();
  const handleFlower = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("CreateFlower... ");
    try {
      const products = {
        productName: data.productName,
        productQuantity: data.productQuantity,
        price: data.price,
        bloomDate: data.bloomDate,
        color: data.color,
        selectCategory: data.selectCategory,
        size: data.size,
        fragrance: data.fragrance,
      };

      const res = await product(products).unwrap();
      toast.success("Product Created Successfully", {
        id: toastId,
        duration: 2000,
      });
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <h1 className="text-center my-4">Add New Flower</h1>
      <Divider />
      <FMForm onSubmit={handleFlower}>
        <Row justify="space-between" align="top">
          <Col>
            <FMInput type="text" name="productName" label="Product Name" />
          </Col>
          <Col>
            <FMInput
              type="text"
              name="productQuantity"
              label="Product Quantity"
            />
          </Col>
          <Col>
            <FMInput type="text" name="price" label="Price" />
          </Col>
        </Row>
        <Row justify="space-between" align="top">
          <Col>
            <FMInput type="date" name="bloomDate" label="Bloom Date" />
          </Col>
          <Col>
            <FMInput type="text" name="color" label="Color" />
          </Col>
          <Col>
            {/* <FMInput
              type="text"
              name="selectCategory"
              label="Select Category"
            /> */}
            <SelectInput
              type="select"
              name="selectCategory"
              label="Select Category"
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
          {/* <Col>
            <SelectInput
              type="select"
              name="selectCategory"
              label="Select Category"
              options={[
                { label: "Roses", value: "roses" },
                { label: "Lilies", value: "lilies" },
                { label: "Sunflowers", value: "sunflowers" },
                { label: "Tulips", value: "tulips" },
                { label: "Orchids", value: "orchids" },
              ]}
            />
          </Col> */}
          <Col>
            <SelectInput
              type="select"
              name="size"
              label="Size"
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
        <Button htmlType="submit">Create</Button>
      </FMForm>
    </div>
  );
};

export default CreateFlower;
