import React, { ReactNode } from "react";

interface SelectProps {
  placeholder?: string;
  className?: string;
  registration?: any;
  name?: string;
  id?: string;
  errors?: string;
  options?: (string | { value: string | number; text: string })[];
  required?: boolean;
  children?: ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // New prop
}
const Select: React.FC<SelectProps> = ({
  placeholder,
  className = "",
  registration = null,
  name = "",
  id = "",
  value = "",
  errors,
  options = [],
  required,
  children,
  onChange,
}) => {
  return (
    <select
      placeholder={placeholder}
      required={required}
      name={name}
      id={id}
      value={value}
      {...registration}
      data-testid="select-element"
      onChange={onChange}
      className="form-select"
    >
      {placeholder && (
        <option value="" disabled className="placeholder">
          {placeholder}
        </option>
      )}
      {options && Array.isArray(options) && options.length > 0
        ? options.map((option: any) => (
            <option
              value={
                option && typeof option === "object" ? option.value : option
              }
              key={
                option && typeof option === "object" ? option.value : option
              }
            >
              {option && typeof option === "object" ? option.text : option}
            </option>
          ))
        : React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement<any>, {
              className: `${
                (child as React.ReactElement<any>).props.className
              } img-special-class`,
            })
          )}
    </select>
  );
};

export default Select