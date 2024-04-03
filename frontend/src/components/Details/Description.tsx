/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Card,
  CardBody,
  Collapse,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { GiNotebook } from "react-icons/gi";

interface Props {
  description: string;
}

const description: React.FC<Props> = ({ description }) => {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <Card marginY={6}>
      <CardBody>
        <HStack marginBottom={7} alignItems="center" gap={2}>
          <GiNotebook size={38} color="#fcb900" />
          <Heading as="h2" fontFamily="fontBold" fontSize="2xl">
            توضیحات
          </Heading>
        </HStack>
        <Collapse startingHeight={150} in={show}>
          <Text>{description}</Text>
        </Collapse>
        <Button
          onClick={handleToggle}
          mt="1rem"
          colorScheme="green"
          variant="solid"
          borderRadius="3xl"
          size="md"
          fontFamily="fontBold"
          fontSize="sm"
        >
          نمایش {show ? "کمتر" : "بیشتر"}
        </Button>
      </CardBody>
    </Card>
  );
};

export default description;
