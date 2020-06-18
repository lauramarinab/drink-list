import * as React from "react";
import { Select as MaterialSelect, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 } from "uuid";
import { capitalize } from "lodash";

const useStyles = (minWidth?: number) =>
  makeStyles((theme) => ({
    formControl: {
      minWidth: minWidth || 200,
      fontFamily: "Lato, sans-serif",
    },
    inputBase: {
      height: 50,
    },
  }));

type Props = {
  options: Array<string>;
  placeholder: string;
  handleChange: (option: string) => void;
  selectedOption: string | null;
  label?: string;
  minWidth?: number;
};

const Select: React.FC<Props> = ({ options, placeholder, handleChange, selectedOption, label, minWidth }) => {
  const id = React.useRef<string>(v4());
  const classes = useStyles(minWidth);

  return (
    <FormControl className={classes().formControl}>
      {label && <InputLabel id={id.current}>{capitalize(label)}</InputLabel>}
      <MaterialSelect
        id={id.current}
        placeholder={placeholder}
        value={selectedOption || ""}
        onChange={(e) => handleChange(String(e.target.value))}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </MaterialSelect>
    </FormControl>
  );
};

export { Select };
