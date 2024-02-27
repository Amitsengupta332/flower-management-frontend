import { Button, Col, Divider, Row, Skeleton } from "antd";
import FMForm from "../../../components/form/FMForm";
import FMInput from "../../../components/form/FMInput";
import SelectInput from "../../../components/form/FMSelect";
import {
  useGetSingleFlowerQuery,
  useUpdateFlowerMutation,
} from "../../../redux/features/createFlower/createProduct";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateFlower = () => {
  const id = useParams().id;
  // console.log(id.id);
  const { data, isLoading } = useGetSingleFlowerQuery(id);
  const [productUpdate] = useUpdateFlowerMutation();
  console.log(data);

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
  // console.log(flower);
  // console.log(id);
  const handleUpdateFlower = async (data: FieldValues) => {
    console.log(data);

    const toastId = toast.loading("Updating Flower... ");
    try {
      if (!flower) {
        toast.error("Flower data not available", {
          id: toastId,
          duration: 2000,
        });
        return;
      }

      const updatedFlowerInfo = {
        productName: data.productName ? data.productName : data.productName,
        productQuantity: data.productQuantity,
        price: data.price ? data.price : data.price,
        bloomDate: data.bloomDate,
        color: data.color,
        selectCategory: data.selectCategory,
        size: data.size,
        fragrance: data.fragrance,
      };
      console.log(updatedFlowerInfo);
      const id = flower._id;
      const res = await productUpdate({ id, updatedFlowerInfo }).unwrap();

      console.log(res);
      toast.success("Flower updated Successfully", {
        id: toastId,
        duration: 2000,
      });
      // console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <h1 className="text-center my-4">Update Flower</h1>
      <Divider />
      <FMForm onSubmit={handleUpdateFlower} defaultValues={defaultValue}>
        <Row justify="space-between" align="top">
          <Col>
            <FMInput
              // defaultValue={flower?.productName}
              type="text"
              name="productName"
              label="Product Name"
            />
          </Col>
          <Col>
            <FMInput
              type="text"
              name="productQuantity"
              label="Product Quantity"
              // defaultValue={flower?.productQuantity}
            />
          </Col>
          <Col>
            <FMInput
              defaultValue={flower?.price}
              type="text"
              name="price"
              label="Price"
            />
          </Col>
        </Row>
        <Row justify="space-between" align="top">
          <Col>
            <FMInput
              defaultValue={flower?.bloomDate}
              type="date"
              name="bloomDate"
              label="Bloom Date"
            />
          </Col>
          <Col>
            <FMInput
              type="text"
              name="color"
              label="Color"
              defaultValue={flower?.color}
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

        <Button htmlType="submit">Update</Button>
      </FMForm>
    </div>
  );
};

export default UpdateFlower;
