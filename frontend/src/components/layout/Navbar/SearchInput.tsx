import { useRef } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
// import useGameQueryStore from "../store";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  //   const setSearchText = useGameQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const border = colorMode == "light" && {
    border: "1px",
    borderColor: "gray.200",
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (ref.current) {
      //   setSearchText(ref.current.value);
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup borderRadius="3xl" {...border} w="90%">
        <InputLeftElement cursor="pointer" children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="دنبال چه دوره ای هستی؟..."
          variant="field"
          fontFamily="fontBody"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
