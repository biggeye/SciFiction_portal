import {
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
    Stack
  } from '@chakra-ui/react';
  import {
    RiChatVoiceLine,
    RiVipCrown2Line,
    RiBallPenLine,
    RiBriefcase2Line,
    RiSlideshowLine,
    BsGearFill,
    RiArrowDownSLine
  } from 'react-icons/ri';
  import { GiHamburgerMenu } from 'react-icons/gi';
  import { AiOutlineClose } from 'react-icons/ai';
  

  export default function Navbar({ handlePageChange }) { 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const data = [
        {
          name: 'Voices',
          icon: RiChatVoiceLine,
          action: () => handlePageChange('Voices'),
        },
        {
          name: 'Avatars',
          icon: RiVipCrown2Line,
          action: () => handlePageChange('Avatars'),
        },
        {
          name: 'Create',
          icon: RiBallPenLine,
          action: () => handlePageChange('CreateTalk'),
        },
        {
          name: 'Archives',
          icon: RiBriefcase2Line,
          action: null,
          dropdownLinks: [
            {
              name: 'Video',
              action: () => handlePageChange('Talks'),
            },
            {
              name: 'Audio',
              action: () => handlePageChange('Voiceovers'),
            },
          ],
        },
 /*      {
          name: 'Social Media',
          icon: RiSlideshowLine,
          action: () => handlePageChange('Social'),
        },
        {
          name: 'Settings',
          icon: BsGearFill,
          action: () => handlePageChange('Settings'),
        },*/
      ];

  
    return (
      <Box px={4} bg={"gray.400"}>
        <Flex h={12} alignItems="center" justifyContent="space-between" mx="auto">
        <Image src="/IMG_1870.png" alt="Logo" h={10}/>
        <Spacer />
          <HStack spacing={8} alignItems="center">
            <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }} alignItems="center">
              {data.map((item, index) =>
                item.dropdownLinks ? (
                  <DropdownMenu key={index} item={item} handlePageChange={handlePageChange} />
                ) : (
                  <Button size="sm" key={index} leftIcon={<Icon as={item.icon} />} onClick={item.action}>
                    {item.name}
                  </Button>
                ),
              )}
            </HStack>
          </HStack>
  <Spacer />
  <Avatar />
          <IconButton
            size="md"
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label="Open Menu"
            display={{ base: 'inherit', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
  
        {/* Mobile Screen Links */}
        {isOpen ? (
          <Box pb={4} display={{ base: 'inherit', md: 'none' }}>
            <Stack as="nav" spacing={2}>
              {data.map((item, index) =>
                item.dropdownLinks ? (
                  <DropdownMenu key={index} item={item} handlePageChange={handlePageChange} />
                ) : (
                  <Button key={index} leftIcon={<Icon as={item.icon} />} onClick={item.action}>
                    {item.name}
                  </Button>
                ),
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    );
  }
  
  const DropdownMenu = ({ item, handlePageChange }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Menu autoSelect={false} isLazy>
        {({ isOpen, onClose }) => (
          <>
            <MenuButton onClick={item.action ? item.action : onOpen}>
              <Flex alignItems="center">
                <Text>{item.name}</Text>
                <Icon
                  as={RiArrowDownSLine}
                  h={5}
                  w={5}
                  ml={1}
                  transition="all .25s ease-in-out"
                  transform={isOpen ? 'rotate(180deg)' : ''}
                />
              </Flex>
            </MenuButton>
            <MenuList zIndex={5} bg={useColorModeValue('white', 'brand.800')} border="none">
              {item.dropdownLinks.map((link, index) => (
                <MenuItem
                  key={index}
                  _hover={{ color: 'brand.400', bg: useColorModeValue('brand.200', 'brand.700') }}
                  onClick={link.action}
                >
                  {link.name}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    );
  };
  
