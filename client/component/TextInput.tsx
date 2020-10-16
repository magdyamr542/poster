import { TextField } from "@material-ui/core";
import * as React from "react";
import { TextInputType } from "../interfaces/types";

interface Props {
  name?: string;
  required?: boolean;
  type?: TextInputType;
  id?: string;
  label: string;
  selector: string;
  onValueChange: (currValue: string) => void;
}

const TextInput: React.FC<Props> = ({
  name = "",
  required = false,
  label,
  type = "",
  id = "default_id",
  selector,
  onValueChange,
}) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required={required}
      fullWidth
      name={name.length !== 0 ? name : label}
      label={label}
      type={type}
      id={id}
      className={selector}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};

export default TextInput;
