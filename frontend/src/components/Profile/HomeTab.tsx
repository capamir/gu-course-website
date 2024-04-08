import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
} from "@chakra-ui/react";
import { BsInfoSquare } from "react-icons/bs";
import { useAuthStore } from "../../store";

const HomeTab = () => {
  const { name, email, phone_number } = useAuthStore((s) => s.user);
  return (
    <Box>
      <HStack marginBottom={5}>
        <BsInfoSquare size={36} color="#0693e3" />
        <Heading as="h3" fontFamily="fontBold" fontSize="xl">
          مشخصات
        </Heading>
      </HStack>
      <FormControl>
        <FormLabel>نام</FormLabel>
        <Input type="text" defaultValue={name} isDisabled />
      </FormControl>
      <FormControl>
        <FormLabel>ایمیل</FormLabel>
        <Input type="email" defaultValue={email} isDisabled />
      </FormControl>
      <FormControl>
        <FormLabel>شماره تلفن</FormLabel>
        <Input type="text" defaultValue={phone_number} isDisabled />
      </FormControl>
    </Box>
  );
};

export default HomeTab;
