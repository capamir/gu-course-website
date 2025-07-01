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
import { IoIosPerson } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ProductType } from "../../types/Product";
import Toman from "../common/Toman";

interface Props {
  course: ProductType;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const { id, title, bio, price, image, rate, members_count, teachers } =
    course;
  return (
    <Card boxShadow="xl" borderRadius="3xl">
      <Link to={`/${id}`}>
        <Image
          src={image}
          borderRadius="3xl"
          margin="auto"
          objectFit="cover"
          w="90%"
        />
      </Link>
      <CardBody>
        <Link to={`/${id}`}>
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
            <Text>{teachers.at(0)?.name}</Text>
          </HStack>
          <Spacer />
          <HStack alignItems="center">
            <Text color="#fcb900">{rate}</Text>
            <FaStar color="#fcb900" size={16} />
          </HStack>
        </Flex>
        <hr />
        <Flex minWidth="max-content" alignItems="center">
          <HStack fontFamily="fontBody">
            <IoPersonSharp />
            <Text>{members_count}</Text>
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
