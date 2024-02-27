import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string | number;
};

const FMInput = ({ type, name, label, defaultValue }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              className="select-w"
              type={type}
              id={name}
              defaultValue={defaultValue}
              style={{ width: "338px" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FMInput;
