import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface Props {
  label: string;
  type: string;
  register: any;
  error?: any;
}

const InputField: React.FC<Props> = ({ label, type, register, error }) => {
  return (
    <FormControl isInvalid={error}>
      <FormLabel htmlFor="name">{label}</FormLabel>
      <Input type={type} {...register} />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
