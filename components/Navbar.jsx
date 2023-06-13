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
import { useState } from "react";
import AccountForm from "./auth/AccountForm";

export default function Navbar({ handlePageChange, supabaseClient, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [session, setSession] = useState(null);
  const mobileNav = useDisclosure();
  const userProfileModalDisclosure = useDisclosure(); // New instance for the modal

  const [currentTab, setTabList] = useState(""); // Added state hook here

  const profileSession = async () => {
    const session = await supabaseClient.auth.getSession();
    setSession(session);
    if (!session) {
      console.log("no supabase client")
    }
  };
  

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
      }, // Capitalized here
    },
    {
      name: "Content",
      icon: RiBallPenLine,
      action: () => {
        setTabList("Content"), // Capitalized here
          handlePageChange("Videos");
      },
    },
  ];
  const tabs = [
    {
      name: "Social",
      tabList: [
        {
          name: "Dashboard",
          action: () => handlePageChange("DashBoard"),
        },
        {
          name: "Twitter",
          action: () => handlePageChange("Twitter"),
        },
        {
          name: "YouTube",
          action: () => handlePageChange("YouTube"),
        },
        {
          name: "Facebook",
          action: () => handlePageChange("Facebook"),
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
          name: "Voice Models",
          action: () => handlePageChange("VoiceModels"),
        },
        {
          name: "Voiceovers",
          action: () => handlePageChange("Voiceovers"),
        },
        {
          name: "Scripts",
          action: () => handlePageChange("Scripts"),
        },
      ],
    },
    {
      name: "Content",
      tabList: [
        {
          name: "Videos",
          action: () => handlePageChange("Videos"),
        },
        {
          name: "Campaigns",
          action: () => handlePageChange("Campaigns"),
        },
      ],
    },
  ];

  const selectedTab = tabs.find((tab) => tab.name === currentTab); // Get the current selected tab

  return (
    <Box>
      <chakra.header
        bg="gray.500"
        borderColor="gray.200"
        borderBottomWidth={1}
        w="full"
        px={{ base: 1, sm: 3 }}
        py={2}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack spacing={4} display="flex" alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.900"
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
                bg="gray.300"
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
            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              {headerItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={item.action}
                >
                  {item.name}
                </Button>
              ))}
            </HStack>

            <Avatar
              onClick={userProfileModalDisclosure.onOpen}
              zIndex="1"
              size="sm"
            />
          </HStack>
        </Flex>
      </chakra.header>
      <Flex
        w="100vw"
        bg="gray.700"
        color="gray.200"
        alignItems="center"
        justifyContent="space-between"
        borderWidth={0}
        overflowX="auto"
      >
        <Tabs
          defaultIndex={0}
          borderBottomColor="transparent"
          colorScheme="gray.200"
        >
          {selectedTab && (
            <TabList>
              {selectedTab.tabList.map(
                (
                  item,
                  index // We use selectedTab here
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
          <AccountForm supabaseClient={supabaseClient} user={user} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={userProfileModalDisclosure.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}