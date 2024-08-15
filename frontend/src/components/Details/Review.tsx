import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChatTextFill } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { useCreateReview, useGetRiviews } from "../../hooks/useReview";
import { useAuthStore } from "../../store";
import { ReviewType } from "../../types/Review";

const styles = {
  selectOptions: {
    background: "#38B2AC",
  },
};

interface Props {
  id: string;
}

const Review: React.FC<Props> = ({ id }) => {
  const { colorMode } = useColorMode();
  const user = useAuthStore((s) => s.user);
  const { data: reviews } = useGetRiviews(id);
  const [rate, setRate] = useState(5);
  const [description, setDescription] = useState("");
  const data: ReviewType = { rate, name: user.name!, description };

  const createReviewMutation = useCreateReview(id, data);

  const { isOpen, onToggle } = useDisclosure();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.id) {
      createReviewMutation.mutate(data, {
        onSuccess: () => {
          // Optionally, clear the form or provide user feedback
          setRate(5);
          setDescription("");
        },
        onError: (error) => {
          // Handle error (e.g., show error message)
          console.error("Failed to submit review:", error);
        },
      });
    }
  };

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
          {user.id && (
            <Button
              leftIcon={<FaPlusCircle size={18} />}
              colorScheme="green"
              variant="solid"
              borderRadius="3xl"
              size="md"
              fontFamily="fontBold"
              fontSize="sm"
              onClick={onToggle}
              cursor="pointer"
            >
              ایجاد نظر جدید
            </Button>
          )}
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box m={2}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="description">
                  از 1 تا 5 چه نمره ای میدهید
                </FormLabel>
                <Select
                  placeholder="از 1 تا 5 چه نمره ای میدهید"
                  boxShadow="md"
                  value={rate}
                  p={3}
                  onChange={(e) => setRate(Number(e.target.value))}
                >
                  <option style={styles.selectOptions} value="1">
                    1
                  </option>
                  <option style={styles.selectOptions} value="2">
                    2
                  </option>
                  <option style={styles.selectOptions} value="3">
                    3
                  </option>
                  <option style={styles.selectOptions} value="4">
                    4
                  </option>
                  <option style={styles.selectOptions} value="5">
                    5
                  </option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="description">نظر</FormLabel>
                <Input
                  type="text"
                  boxShadow="md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <Button
                leftIcon={<MdFileDownloadDone size={22} />}
                type="submit"
                colorScheme="green"
                variant="solid"
                borderRadius="3xl"
                size="md"
                fontFamily="fontBold"
                fontSize="sm"
                onClick={onToggle}
                cursor="pointer"
                mt={3}
              >
                ثبت نظر
              </Button>
            </form>
          </Box>
        </Collapse>
        <SimpleGrid spacing={6}>
          {reviews?.map((review) => (
            <Card
              borderRadius="xl"
              bg={colorMode === "dark" ? "" : "gray.50"}
              boxShadow="md"
            >
              <CardHeader>
                <Flex alignItems="center">
                  <HStack gap={5}>
                    <Box>
                      <Heading as="h4" fontFamily="fontBold" fontSize="md">
                        {review.name}
                      </Heading>
                    </Box>
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text fontFamily="fontBody" fontSize="medium">
                  {review.description}
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default Review;
