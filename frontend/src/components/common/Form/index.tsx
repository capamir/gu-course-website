import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";
// import { LoginResponse } from "../../../types/Auth";
import InputField from "./InputField";

interface FormProps {
  formClass: string;
  onSubmit: (data: any) => void;
  mutateError?: Error | null;
}

const Form: React.FC<FormProps> = ({ formClass, onSubmit, mutateError }) => {
  const location = useLocation();
  const { title, fields, label, register, handleSubmit, errors, isSubmitting } =
    useAuth(formClass);

  return (
    <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
      <Card maxWidth="640px" boxShadow="lg" padding={1}>
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
          {label === "ثبت نام" && (
            <HStack marginTop={4} fontFamily="fontBold" fontSize="lg">
              <Text>ثبت نام کردی؟ </Text>
              <Link to="/auth/login">
                <Text color="teal">ورود</Text>
              </Link>
            </HStack>
          )}
          {label === "ورود" && (
            <>
              <HStack marginTop={4} fontFamily="fontBold" fontSize="lg">
                {location.pathname === "/auth/login" ? (
                  <>
                    <Text>ورود با رمز یکبار مصرف </Text>
                    <Link to="/auth/signin">
                      <Text color="teal">رمز یکبار مصرف</Text>
                    </Link>
                  </>
                ) : (
                  <>
                    <Text>ورود با رمز عبور </Text>
                    <Link to="/auth/login">
                      <Text color="teal">رمز عبور</Text>
                    </Link>
                  </>
                )}
              </HStack>
              <HStack marginTop={4} fontFamily="fontBold" fontSize="lg">
                <Text>ثبت نام نکردی؟ </Text>
                <Link to="/auth/signup">
                  <Text color="teal">ثبت نام</Text>
                </Link>
              </HStack>
            </>
          )}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Form;
