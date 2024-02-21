import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "../fieldwrapper";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for the password toggle

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "number" | "email" | "password" | "date";
  placeholder?: string;
  focus?: boolean;
  onChange?: (value: any) => void; // Define onChange as a function that takes a string value
  loading?: boolean;
  defaultValue?: string;
  value?:string;
  disabled?: boolean;
  className?: string;
  registration: Partial<UseFormRegisterReturn> |any;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = "text",
    label,
    placeholder,
    defaultValue,
    focus = false,
    loading = false,
    disabled,
    value,
    onChange, // Add onChange prop
    error,
    registration,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle input value changes and call onChange prop
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange && onChange(value); // Call onChange if it's provided
  };

  return (
    <FieldWrapper label={label} error={error}>
      <div className="relative flex w-full flex-wrap items-center mb-3">
        {type === "password" && (
          <span
            className="z-10 h-full leading-snug font-normal absolute text-center text-gray-500 rounded text-base items-center justify-center w-8  py-3 right-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete="off"
          autoFocus={focus ?? true}
          value={value}
          disabled={loading || disabled}
          onChange={handleInputChange} // Use the handleInputChange function
          defaultValue={defaultValue}
          className={clsx(
            "form-input ",
            error?.message && "border-danger focus:border-danger focus:ring-danger",
            type === "password" && "pr-10",
            className
          )}
          {...registration}
        />
      </div>
    </FieldWrapper>
  );
};
