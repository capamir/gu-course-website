import { Box, useColorMode } from "@chakra-ui/react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box
      whiteSpace="nowrap"
      bg="gray.100"
      borderRadius="3xl"
      padding={2}
      cursor="pointer"
      onClick={toggleColorMode}
    >
      {colorMode === "dark" ? (
        <BsFillMoonStarsFill size={20} color="black" />
      ) : (
        <MdWbSunny size={20} color="black" />
      )}
    </Box>
  );
};

export default ColorModeSwitch;
