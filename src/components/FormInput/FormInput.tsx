import React from "react";
import { Form, Input } from "antd";
import type { Rule } from "antd/es/form";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  rules?: Rule[];
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  rules = [],
}) => {
  const inputComponent =
    type === "password" ? (
      <Input.Password placeholder={placeholder} className="h-[50px] text-md" />
    ) : (
      <Input placeholder={placeholder} className="h-[50px] text-md" />
    );

  return (
    <Form.Item
      label={
        <span className="font-bold text-lg">
          {label} <span className="text-red-500">*</span>
        </span>
      }
      name={name}
      rules={rules}
    >
      {inputComponent}
    </Form.Item>
  );
};

export default FormInput;
