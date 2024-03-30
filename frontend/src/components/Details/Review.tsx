import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsChatTextFill, BsReply } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { noImage } from "../../assets";

const Review = () => {
  const { colorMode } = useColorMode();

  return (
    <Card marginY={6}>
      <CardBody>
        <Flex>
          <HStack marginBottom={7} gap={3}>
            <BsChatTextFill size={36} color="#cf2e2e" />
            <Heading as="h2" fontFamily="fontBold" fontSize="2xl">
              نظرات
            </Heading>
          </HStack>
          <Spacer />
          <Button
            leftIcon={<FaPlusCircle size={18} />}
            colorScheme="green"
            variant="solid"
            borderRadius="3xl"
            size="md"
            fontFamily="fontBody"
            fontSize="sm"
          >
            ایجاد نظر جدید
          </Button>
        </Flex>
        <SimpleGrid spacing={6}>
          <Card
            borderRadius="xl"
            bg={colorMode === "dark" ? "" : "gray.50"}
            boxShadow="md"
          >
            <CardHeader>
              <Flex alignItems="center">
                <HStack gap={5}>
                  <Image
                    src={noImage}
                    borderRadius="50%"
                    width={70}
                    height={70}
                  />
                  <Box>
                    <Heading as="h4" fontFamily="fontBold" fontSize="md">
                      capamir
                    </Heading>
                    <Text>1403/01/02</Text>
                  </Box>
                </HStack>
                <Spacer />
                <Box
                  border="1px"
                  borderColor="#0693e3"
                  borderRadius="50%"
                  padding={1}
                >
                  <BsReply size={28} color="#0693e3" />
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text fontFamily="fontBody" fontSize="medium">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
                totam sapiente numquam, dolorem accusantium odit tempora aperiam
                vero iste similique sequi mollitia alias eius quasi nostrum
                eaque nam esse provident?
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default Review;
