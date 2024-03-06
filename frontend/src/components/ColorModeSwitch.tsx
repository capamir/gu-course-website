import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";

const ColorModeSitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text whiteSpace="nowrap">
        {colorMode === "dark" ? <BsFillMoonStarsFill /> : <MdWbSunny />}
      </Text>
    </HStack>
  );
};

export default ColorModeSitch;
