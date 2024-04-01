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
import { FaStar } from "react-icons/fa";
import { IoIosPerson, IoMdTime } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ProductType } from "../../types/Product";
import Toman from "../common/Toman";

interface Props {
  course: ProductType;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const { title, bio, price, image } = course;
  return (
    <Card boxShadow="xl" borderRadius="3xl">
      <Link to="/2">
        <Image src={image} borderRadius="3xl" margin="auto" />
      </Link>
      <CardBody>
        <Link to="/2">
          <Heading
            as="h2"
            fontSize="2xl"
            fontFamily="fontBold"
            marginBottom={4}
          >
            {title}
          </Heading>
        </Link>
        <Text
          fontFamily="fontBold"
          fontSize="sm"
          color="gray"
          paddingBottom={6}
        >
          {bio}
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
            <Text fontFamily="fontBody">39:30</Text>
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
            <Text color="brand-primary" fontFamily="fontBody" fontSize="xl">
              {price}
            </Text>
            <Toman />
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CourseCard;
