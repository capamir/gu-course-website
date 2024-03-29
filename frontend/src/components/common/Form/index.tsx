import { Button, Card, CardBody, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../../hooks";
import { LoginResponse } from "../../../types/Auth";
import InputField from "./InputField";

interface FormProps {
  formClass: string;
  onSubmit: (data: LoginResponse) => void;
  mutateError?: Error | null;
}

const Form: React.FC<FormProps> = ({ formClass, onSubmit, mutateError }) => {
  const { title, fields, label, register, handleSubmit, errors, isSubmitting } =
    useAuth(formClass);

  return (
    <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
      <Card maxWidth="640px" boxShadow="lg">
        <CardBody>
          <Heading as="h1" marginBottom={7}>
            {mutateError ? mutateError.message : title}
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map(({ key, type, label }) => (
              <InputField
                key={key}
                label={label}
                type={type}
                register={register(key)}
                error={errors[key]}
              />
            ))}
            <Button
              width="100%"
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              {label}
            </Button>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Form;
