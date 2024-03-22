import { Select } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  defaultValue?: string | number;
};

const SelectInput = ({ name, label, options, defaultValue }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <br />
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            style={{ width: "338px" }}
            className="select-w"
            {...field}
            id={name}
          >
            {options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )}
      />
    </div>
  );
};

export default SelectInput;
