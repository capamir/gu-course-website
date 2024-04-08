import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useClipboard,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FaCopy } from "react-icons/fa";

interface Props {
  title: string;
  license_code: string;
}

const CourseItem: React.FC<Props> = ({ title, license_code }) => {
  const { colorMode } = useColorMode();
  const { hasCopied, onCopy } = useClipboard(license_code);
  return (
    <Card
      borderRadius="xl"
      bg={colorMode === "dark" ? "" : "gray.50"}
      boxShadow="md"
      marginBottom={3}
    >
      <CardBody>
        <Flex gap={5} alignItems="center">
          <Heading as="h4" fontSize="md" fontFamily="fontBold">
            {title}
          </Heading>
          <Spacer />

          <Box
            borderWidth="1px"
            borderRadius="md"
            p="2"
            paddingRight={12}
            position="relative"
          >
            <IconButton
              aria-label="Copy text"
              icon={<FaCopy />}
              onClick={onCopy}
              position="absolute"
              top="0"
              right="0"
            />
            {license_code}
            {hasCopied && (
              <span style={{ color: "green", marginLeft: "1rem" }}>
                Copied!
              </span>
            )}
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CourseItem;
