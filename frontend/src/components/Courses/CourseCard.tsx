import {
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosPerson, IoMdTime } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { noImage } from "../../assets";
import { Link } from "react-router-dom";
import Toman from "../commpn/Toman";

const CourseCard = () => {
  return (
    <Card boxShadow="xl" borderRadius="3xl">
      <Link to="/2">
        <Image src={noImage} borderRadius="3xl" />
      </Link>
      <CardBody>
        <Link to="/2">
          <Heading
            as="h2"
            fontSize="2xl"
            fontFamily="fontBold"
            marginBottom={4}
          >
            آموزش شبکه عصبی
          </Heading>
        </Link>
        <Text
          fontFamily="fontBold"
          fontSize="sm"
          color="gray"
          paddingBottom={6}
        >
          همه میدونیم که هوش مصنوعی چقدر مورد توجه قرار گرفته
        </Text>
        <Flex
          minWidth="max-content"
          alignItems="center"
          marginTop={3}
          fontFamily="fontBold"
          fontSize="sm"
          color="gray"
        >
          <HStack marginLeft={2}>
            <IoIosPerson size={18} />
            <Text>صادق اسکندری</Text>
          </HStack>

          <HStack>
            <IoMdTime />
            <Text>39:30</Text>
          </HStack>
          <Spacer />
          <HStack>
            <Text color="#fcb900">5.0</Text>
            <FaStar color="#fcb900" size={16} />
          </HStack>
        </Flex>
        <hr />
        <Flex minWidth="max-content" alignItems="center">
          <HStack fontFamily="fontBody">
            <IoPersonSharp />
            <Text>147</Text>
          </HStack>
          <Spacer width="100%" />
          <HStack>
            <Text color="brand-primary" fontFamily="fontBold" fontSize="lg">
              3,500,000
            </Text>
            <Toman />
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CourseCard;
