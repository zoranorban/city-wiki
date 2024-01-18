import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

interface TextFieldProps {
  label?: string;
  onChange?: (event: any) => void;
}

const TextField: FC<TextFieldProps> = ({ label, onChange }) => {
  const id = `text-field-${uuidv4()}`; //random generated string

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} onChange={onChange} type="text" />
    </div>
  );
};

export default TextField;
