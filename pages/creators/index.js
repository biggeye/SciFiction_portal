import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import {
  RiBriefcase2Line,
  RiChatVoiceLine,
  RiBallPenLine,
  RiVipCrown2Line,
  RiSlideshowLine,
} from "react-icons/ri";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";

import D_ID from "../../components/creators/D_ID";
import Voices from "../../components/creators/xilabs/Voices";
import Voiceovers from "../../components/creators/xilabs/Voiceovers";
import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout";

export default function creators() {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");

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
        _dark={{ color: "gray.400" }}
        _hover={{
          bg: "gray.100",
          _dark: { bg: "gray.900" },
          color: "gray.900",
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
            boxSize="4"
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
      _dark={{ bg: "gray.800" }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="2" py="3" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{ color: "white" }}
          fontWeight="semibold"
        >
          SciFiction
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
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
          <NavItem pl="6" py="1" onMenuClick={() => handlePageChange("D_ID")}>
            D-ID
          </NavItem>
          <NavItem pl="6" py="1" onMenuClick={() => handlePageChange("Voiceovers")}>
            ElevenLabs
          </NavItem>
        </Collapse>

        <NavItem icon={RiSlideshowLine}>Social Media</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );
  return (
    <Layout>
      <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
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
            _dark={{ bg: "gray.800" }}
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
              <InputLeftElement color="gray.500">
                <FiSearch />
              </InputLeftElement>
              <Input placeholder="Search for assets..." />
            </InputGroup>

            <Flex align="center">
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
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
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}