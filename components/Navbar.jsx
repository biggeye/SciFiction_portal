import {
  chakra,
  CloseButton,
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Icon,
  Image,
  Button,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Spacer,
  Stack,
  Tabs,
  Tab,
  TabList,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  RiChatVoiceLine,
  RiVipCrown2Line,
  RiBallPenLine,
  RiBriefcase2Line,
  RiSlideshowLine,
  BsGearFill,
  RiArrowDownSLine,
} from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { useState, useEffect } from "react";
import AccountForm from "./auth/AccountForm";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useProfile } from '../contexts/UserContext';






 export default function Navbar({ handlePageChange }) {
  
  const { profile, updateProfile } = useProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobileNav = useDisclosure();
  const userProfileModalDisclosure = useDisclosure();
   const [currentTab, setTabList] = useState("");
  const supabaseClient = useSupabaseClient();

/*
   const [session, setSession] = useState(null);
   const profileSession = async () => {
    const session = await supabaseClient.auth.getSession();
    setSession(session);
  };
*/

   const headerItems = [
    {
      name: "Social Media",
      icon: RiVipCrown2Line,
      action: () => {
        setTabList("Social");
        handlePageChange("DashBoard");
      },
    },
    {
      name: "Assets",
      icon: RiBriefcase2Line,
      action: () => {
        setTabList("Assets");
        handlePageChange("Avatars");
      },
    },
    {
      name: "Vendors",
      icon: RiBallPenLine,
      action: () => {
        setTabList("Vendors"),
          handlePageChange("ElevenLabs");
      },
    },
  ];
  const tabs = [
    {
      name: "Social",
      tabList: [
        {
          name: "TikTok",
          action: () => handlePageChange("TikTok"),
        },
      ],
    },
    {
      name: "Assets",
      tabList: [
        {
          name: "Avatars",
          action: () => handlePageChange("Avatars"),
        },
        {
          name: "Voiceovers",
          action: () => handlePageChange("Voiceovers"),
        },
        {
          name: "Scripts",
          action: () => handlePageChange("Scripts"),
        },
        {
          name: "Videos",
          action: () => handlePageChange("Videos"),
        },
      ],
    },
    {
      name: "Vendors",
      tabList: [
        {
          name: "Eleven Labs",
          action: () => handlePageChange("ElevenLabs"),
        },
        {
          name: "D-ID",
          action: () => handlePageChange("DID"),
        }
      ],
    },
  ];
   const selectedTab = tabs.find((tab) => tab.name === currentTab);


   return (
    <Box>
      <chakra.header
        borderColor="brand.700"
        borderBottomWidth={1}
        w="full"
        px={{ base: 1, sm: 3 }}
        py={2}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack color="brand.900" spacing={4} display="flex" alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="brand.900"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                mt={15}
                bg="brand.200"
                spacing={3}
                rounded="sm"
                shadow="sm"
                zIndex="2"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                {headerItems.map((item, index) => (
                  <Button
                    key={index}
                    size="sm"
                    w="full"
                    variant="ghost"
                    onClick={() => {
                      item.action();
                      mobileNav.onClose();
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="SciFiction Content Creation Portal"
              display="flex"
              alignItems="center"
            >
              <Image
                alt="logo"
                src="https://promo.scifiction.com/IMG_1872.png"
                h={7}
              />
            </chakra.a>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            <HStack color="brand.900" spacing={3} display={{ base: "none", md: "inline-flex" }}>
              {headerItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={item.action}
                  color="brand.900"
                  layerStyle="navHeader"
                >
                  {item.name}
                </Button>
              ))}
            </HStack>
             <Avatar
             src={profile?.avatar_url} alt="User avatar"
              onClick={userProfileModalDisclosure.onOpen}
              zIndex="1"
              size="sm"
            />
          </HStack>
        </Flex>
      </chakra.header>
      <Flex
      layerStyle="navSubMenu"
      >
        <Tabs
          defaultIndex={0}
          borderBottomColor="transparent"
          layerStyle="navSubMenu"
          colorScheme="darkGray"
        >
          {selectedTab && (
            <TabList>
              {selectedTab.tabList.map(
                (
                  item,
                  index
                ) => (
                  <Tab
                    size="xs"
                    key={index}
                    py={1}
                    m={0}
                    _focus={{ boxShadow: "none" }}
                    onClick={item.action}
                  >
                    {item.name}
                  </Tab>
                )
              )}
            </TabList>
          )}
        </Tabs>
        <Spacer />
      </Flex>
      <Modal
        onClose={userProfileModalDisclosure.onClose}
        isOpen={userProfileModalDisclosure.isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <AccountForm  />
          </ModalBody>
          <ModalFooter>
            <Button onClick={userProfileModalDisclosure.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
