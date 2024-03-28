import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Show,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { noImage } from "../assets";
import { Toman } from "../components";

const arr = [1, 2, 3, 4, 5, 6];

const Details = () => {
  return (
    <Box paddingX={{ base: "0", md: "5%" }} paddingY={{ base: "0", md: 4 }}>
      <Flex
        gap={6}
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
            marginTop={10}
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
        <Box flex="1">
          <Image src={noImage} borderRadius="3xl" />
        </Box>
      </Flex>

      <Grid
        templateAreas={{ base: `"main"`, lg: `"main aside"` }}
        templateColumns={{ base: "1fr", lg: "3fr 1fr" }}
        gap={6}
      >
        <GridItem>
          <SimpleGrid columns={{ sm: 2, md: 2, lg: 3, xl: 3 }} spacing={6}>
            {arr.map((i) => (
              <Card key={i} borderRadius="xl" boxShadow="lg">
                <CardBody>
                  <HStack>
                    <HiOutlineAcademicCap size={36} color="green" />
                    <Box>
                      <Heading as="h4" fontSize="lg" fontFamily="fontBold">
                        وضعیت دوره
                      </Heading>
                      <Text>16 ساعت</Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
          <Card marginY={6}>
            <CardBody>
              <HStack marginBottom={7}>
                <HiOutlineAcademicCap size={42} />
                <Heading as="h2" fontFamily="fontBold" fontSize="2xl">
                  توضیحات
                </Heading>
              </HStack>
              <Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
                aperiam porro, numquam perferendis nulla nam, hic veniam
                recusandae, laborum sit error quam dolorum asperiores deleniti
                dolores odit dicta! In, exercitationem! Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Eum ut quasi cumque debitis
                dolore nesciunt, laudantium nisi natus non cum. Cumque quisquam
                sunt aliquam expedita voluptatibus porro similique ipsa debitis?
              </Text>
            </CardBody>
          </Card>
          <Card marginY={6}>
            <CardBody>
              <HStack marginBottom={7}>
                <HiOutlineAcademicCap size={42} color="blue" />
                <Heading as="h2" fontFamily="fontBold" fontSize="2xl">
                  سرفصل ها
                </Heading>
              </HStack>
              <SimpleGrid spacing={6}>
                {arr.map((i) => (
                  <Card key={i} borderRadius="xl" bg="gray.50">
                    <CardBody>
                      <Flex>
                        <Heading as="h4" fontSize="lg" fontFamily="fontBold">
                          وضعیت دوره
                        </Heading>
                        <Spacer />
                        <Text>
                          <span>0 </span>
                          جلسه،
                          <span>0 </span>
                          دقیقه
                        </Text>
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>
          <Card marginY={6}>
            <CardBody>
              <Flex>
                <HStack marginBottom={7}>
                  <HiOutlineAcademicCap size={42} />
                  <Heading as="h2" fontFamily="fontBold" fontSize="2xl">
                    نظرات
                  </Heading>
                </HStack>
                <Spacer />
                <Button
                  leftIcon={<HiOutlineAcademicCap size={24} />}
                  colorScheme="green"
                  variant="solid"
                  borderRadius="3xl"
                  size="sm"
                  fontFamily="fontBody"
                  fontSize="sm"
                >
                  ایجاد نظر جدید
                </Button>
              </Flex>
              <SimpleGrid spacing={6}>
                {arr.map((i) => (
                  <Card key={i} borderRadius="xl" bg="gray.50">
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
                            <Heading
                              as="h4"
                              fontFamily="fontBold"
                              fontSize="md"
                            >
                              capamir
                            </Heading>
                            <Text>1403/01/02</Text>
                          </Box>
                        </HStack>
                        <Spacer />
                        <Box
                          border="1px"
                          borderColor="blue"
                          borderRadius="50%"
                          padding={1}
                        >
                          <HiOutlineAcademicCap size={32} color="blue" />
                        </Box>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text fontFamily="fontBody" fontSize="medium">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Est totam sapiente numquam, dolorem accusantium
                        odit tempora aperiam vero iste similique sequi mollitia
                        alias eius quasi nostrum eaque nam esse provident?
                      </Text>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>
        </GridItem>
        <Show above="lg">
          <GridItem area="aside">
            <Card borderRadius="2xl" boxShadow="md">
              <CardBody>
                <Flex gap={2} marginBottom={9}>
                  <Box
                    bg="gray.200"
                    paddingX={5}
                    paddingY={4}
                    borderRadius="xl"
                  >
                    <HStack>
                      <HiOutlineAcademicCap size={42} color="green" />
                      <Box>
                        <Heading as="h4" fontSize="lg" fontFamily="fontBody">
                          45
                        </Heading>
                        <Text fontSize="sm">دانشجو</Text>
                      </Box>
                    </HStack>
                  </Box>
                  <Spacer />
                  <Box
                    bg="gray.200"
                    paddingX={5}
                    paddingY={4}
                    borderRadius="xl"
                  >
                    <HStack>
                      <HiOutlineAcademicCap size={42} color="green" />
                      <Box>
                        <Heading as="h4" fontSize="lg" fontFamily="fontBody">
                          45
                        </Heading>
                        <Text fontSize="sm">دانشجو</Text>
                      </Box>
                    </HStack>
                  </Box>
                </Flex>
                <Flex>
                  <Text>درصد تکمیل دوره</Text>
                  <Spacer />
                  <Text>0%</Text>
                </Flex>
              </CardBody>
            </Card>
            <Card borderRadius="2xl" boxShadow="lg" marginY={7}>
              <CardBody>
                <Flex
                  direction="column"
                  alignItems="center"
                  gap={3}
                  paddingY={2}
                >
                  <Image
                    src={noImage}
                    borderRadius="50%"
                    width={100}
                    height={100}
                  />
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
          </GridItem>
        </Show>
      </Grid>
    </Box>
  );
};

export default Details;
