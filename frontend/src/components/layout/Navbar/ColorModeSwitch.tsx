import { Box, HStack, useColorMode } from "@chakra-ui/react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Box
        whiteSpace="nowrap"
        bg="gray.100"
        borderRadius="3xl"
        padding={2}
        onClick={toggleColorMode}
      >
        {colorMode === "dark" ? (
          <BsFillMoonStarsFill size={20} color="black" />
        ) : (
          <MdWbSunny size={20} color="black" />
        )}
      </Box>
    </HStack>
  );
};

export default ColorModeSwitch;
