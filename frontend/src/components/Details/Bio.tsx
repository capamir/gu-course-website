import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { noImage } from "../../assets";
import Toman from "../common/Toman";

const Bio = () => {
  return (
    <Flex
      gap={7}
      marginBottom={8}
      direction={{ base: "column-reverse", md: "row" }}
      justifyContent="space-between"
    >
      <Box flex="1">
        <Heading as="h1" marginY={5} fontSize="2xl" fontFamily="fontBold">
          آموزش Docker از صفر مطلق!
        </Heading>
        <Text fontFamily="fontBody" fontSize="lg">
          داکر یک پلتفرم متن باز برای طراحی؛ انتقال؛ استقرار و اجرای نرم افزار
          ها تحت مفهومی به نام Container می‌باشد، در این دوره به صورت تخصصی
          مفاهیم و مباحث داکر را فرا خواهیم گرفت.
        </Text>
        <Flex
          paddingLeft={3}
          marginTop={{ base: 10, md: "100px" }}
          direction={{ base: "column-reverse", md: "row" }}
        >
          <Button
            leftIcon={<HiOutlineAcademicCap size={24} />}
            colorScheme="green"
            variant="solid"
            borderRadius="3xl"
            size="md"
          >
            ثبت نام در دوره
          </Button>
          <Spacer />
          <HStack marginX="auto" marginBottom={{ base: 4, md: "0" }}>
            <Text color="brand-primary" fontFamily="fontBold" fontSize="lg">
              3,500,000
            </Text>
            <Toman />
          </HStack>
        </Flex>
      </Box>
      <Box>
        <Image src={noImage} borderRadius="3xl" />
      </Box>
    </Flex>
  );
};

export default Bio;
