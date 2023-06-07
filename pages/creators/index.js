import React from "react";
import {
  RiBriefcase2Line,
  RiChatVoiceLine,
  RiBallPenLine,
  RiVipCrown2Line,
  RiSlideshowLine,
} from "react-icons/ri";
import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";

import Avatars from "../../components/creators/d_id/Avatars";
import Voices from "../../components/creators/xilabs/Voices";
import Voiceovers from "../../components/creators/xilabs/Voiceovers";

import { useState } from "react";
import Layout from "../../components/Layout";

export default function creators() {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue("brand.600", "brand.300");

  const [currentPage, setCurrentPage] = useState("");
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const NavItem = (props) => {
    const { icon, children, onMenuClick, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{ color: "brand.400" }}
        _hover={{
          bg: "brand.50",
          _dark: { bg: "brand.900" },
          color: "brand.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        onClick={onMenuClick} // Add the onClick handler to the component
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="5"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "brand.800" }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="2" py="3" align="center">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{ color: "white" }}

        >
         <Image src="./logoHorizontal.png" alt="logo" w={175} />
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="brand.600"
        aria-label="Main Navigation"
      >
        <NavItem
          icon={RiChatVoiceLine}
          onMenuClick={() => handlePageChange("Voices")}
        >
          Voices
        </NavItem>
        <NavItem
          icon={RiVipCrown2Line}
          onMenuClick={() => handlePageChange("Avatars")}
        >
          Avatars
        </NavItem>
        <NavItem
          icon={RiBallPenLine}
          onMenuClick={() => handlePageChange("Scripts")}
        >
          Scripts
        </NavItem>
        <NavItem icon={RiBriefcase2Line} onClick={integrations.onToggle}>
          Renderings
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem ml="3" pl="6" py="1" onMenuClick={() => handlePageChange("D_ID")}>
            D-ID
          </NavItem>
          <NavItem ml="3" pl="6" py="1" onMenuClick={() => handlePageChange("Voiceovers")}>
            ElevenLabs
          </NavItem>
        </Collapse>

        <NavItem 
          icon={RiSlideshowLine} 
          onMenuClick={() => handlePageChange("Social")}
        >
          Social Media
          </NavItem>
        <NavItem 
          icon={BsGearFill}
          onMenuClick={() => handlePageChange("Social")}
        >
          Settings
          </NavItem>
      </Flex>
    </Box>
  );
  
  return (
    <Layout>
      <Box as="section" bg="brand.200" _dark={{ bg: "brand.800" }} minH="100vh">
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
          size="xs"
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg="white"
            _dark={{ bg: "brand.800" }}
            borderBottomWidth="1px"
            color="inherit"
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", md: "none" }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            />
            <InputGroup w="96" display={{ base: "none", md: "flex" }}>
              <InputLeftElement color="brand.500">
                <FiSearch />
              </InputLeftElement>
              <Input placeholder="Search for assets..." />
            </InputGroup>

            <Flex align="center">
              <Text
              mr="3"
              size="xs"
              >{currentPage}</Text>
              <Icon color="brand.500" as={FaBell} cursor="pointer" />
              <Avatar
                ml="4"
                size="sm"
                name="anubra266"
                src="https://avatars.githubusercontent.com/u/30869823?v=4"
                cursor="pointer"
              />
            </Flex>
          </Flex>

          <Box as="main" p="4">
            {/* Add content here, remove div below  */}
            {currentPage === "Voices" && <Voices />}
            {currentPage === "Voiceovers" && <Voiceovers />}
            {currentPage === "Avatars" && <Avatars />}
          </Box>
        </Box>
      </Box>
    </Layout>
  );

}
