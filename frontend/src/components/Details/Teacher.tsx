import React from "react";
import { Card, CardBody, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { TeacherType } from "../../types/Product";

interface Props {
  info: TeacherType;
}

const Teacher: React.FC<Props> = ({ info }) => {
  return (
    <Card borderRadius="2xl" boxShadow="lg" marginY={7}>
      <CardBody>
        <Flex direction="column" alignItems="center" gap={3} paddingY={2}>
          <Image src={info.image} borderRadius="50%" width={100} height={100} />
          <Heading as="h3" fontFamily="fontBody" fontSize="lg">
            {info.name}
          </Heading>
          <Text fontFamily="fontBody" fontSize="md">
            {info.title}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Teacher;
