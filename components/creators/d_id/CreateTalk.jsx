import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  AddIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Textarea,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Flex
} from '@chakra-ui/react';
import {
  ChevronDownIcon
} from '@chakra-ui/icons';
import PreviewTalk from './PreviewTalk';

export default function CreateTalk()  {
  const [title, setTitle] = useState("Working Title");
  return (
    <>
    <PreviewTalk />
    <Input placeholder="Title"
    onClick={setTitle}
    />
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    
      <AccordionButton bg="brand.500"
      borderRadius="1">
        <Box as="span" flex='1' textAlign='left'>
          Script 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    
    <AccordionPanel pb={4}>
    <Textarea placeholder='Here is a sample placeholder' />
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton bg="brand.500"
      borderRadius="1">
      <Box as="span" flex='1' textAlign='left'>
      Configuration 
        </Box>

        
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Flex direction="row">
    <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Avatar
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
    <Box as="span" flex='1' textAlign='left'>
          <RadioGroup defaultValue='2'>
  <Stack spacing={5} direction='row'>
    <Radio colorScheme='red' value='1'>
      Enter Text
    </Radio>
    <Radio colorScheme='green' value='2'>
      Upload Audio File
    </Radio>
  </Stack>
</RadioGroup>
        </Box>
    </Flex>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
</>)
    }