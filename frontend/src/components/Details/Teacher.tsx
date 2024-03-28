import { Card, CardBody, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { noImage } from "../../assets";

const Teacher = () => {
  return (
    <Card borderRadius="2xl" boxShadow="lg" marginY={7}>
      <CardBody>
        <Flex direction="column" alignItems="center" gap={3} paddingY={2}>
          <Image src={noImage} borderRadius="50%" width={100} height={100} />
          <Heading as="h3" fontFamily="fontBody" fontSize="lg">
            صادق اسکندری
          </Heading>
          <Text fontFamily="fontBody" fontSize="md">
            مدرس دامشگاه گیلان
          </Text>
          {/* <Button colorScheme="green" variant="outline"></Button> */}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Teacher;
