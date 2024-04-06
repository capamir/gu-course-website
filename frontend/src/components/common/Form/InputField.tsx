import React from "react";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";

interface Props {
  label: string;
  type: string;
  register: any;
  error?: any;
}

const InputField: React.FC<Props> = ({ label, type, register, error }) => {
  return (
    <>
      {type === "checkbox" ? (
        <FormControl marginTop={3}>
          <HStack>
            <Checkbox id="terms" {...register} />
            <FormLabel
              htmlFor="terms"
              ml={2}
              mb={2}
              fontSize="sm"
              fontWeight="bold"
            >
              {label}
            </FormLabel>
          </HStack>
          {error && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {error.message}
            </Text>
          )}
        </FormControl>
      ) : (
        <FormControl isInvalid={error}>
          <FormLabel htmlFor="name">{label}</FormLabel>
          <Input type={type} {...register} boxShadow="md" />
          {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
      )}
    </>
  );
};

export default InputField;
