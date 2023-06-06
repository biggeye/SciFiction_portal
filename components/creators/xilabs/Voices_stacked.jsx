import { Fragment, useEffect, useState } from 'react';
import React from 'react';
import {
  Container,
  Box,
  chakra,
  Flex,
  Stack,
  VStack,
  HStack,
  Grid,
  Icon,
  Divider,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { IconType } from 'react-icons';
import { FaRegComment, FaRegHeart, FaRegEye } from 'react-icons/fa';


const VoiceList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const [currentName, setCurrentName] = useState("");
  const [currentVoiceId, setCurrentVoiceId] = useState("");
  const [script, setScript] = useState("");
  const [voicesData, setVoicesData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchYourData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

const fetchYourData = async () => {
    const response = await axios.get(
      "https://flask-vercel-silk.vercel.app/api/xilabs/get_voices"
    );
    const voices = response.data.voices;

    const tableData = voices.map((voice) => ({
      name: voice.name,
      voice_id: voice.voice_id,
      preview_url: voice.preview_url,
    }));

    return tableData;
  };

  const handleFormInputChange = (e) => {
    setScript(e.target.value);
  };

  const createTTS = async (event) => {
    event.preventDefault();
    const voice_id = currentVoiceId;
    const data = {
      voice_id: voice_id,
      script: script,
    };
    
    const response = await axios.post(
      "https://flask-vercel-silk.vercel.app/api/xilabs/tts",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }});};


  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <Flex justify="left" mb={3}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          Voices
        </chakra.h3>
      </Flex>
      <VStack border="1px solid" borderColor="brand.400" rounded="md" overflow="hidden" spacing={0}>
        {data.map((article, index) => (
          <Fragment key={index}>
            <Grid
              templateRows={{ base: 'auto auto', md: 'auto' }}
              w="100%"
              templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
              p={{ base: 2, sm: 4 }}
              gap={3}
              alignItems="center"
              _hover={{ bg: useColorModeValue('brand.200', 'brand.700') }}
            >
              <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                <chakra.h3 as={Link} href={article.preview_url} isExternal fontWeight="bold" fontSize="lg">
                  {article.name}
                </chakra.h3>
                           </Box>
              <HStack
                spacing={{ base: 0, sm: 3 }}
                alignItems="center"
                fontWeight="medium"
                fontSize={{ base: 'xs', sm: 'sm' }}
                color={useColorModeValue('brand.600', 'brand.300')}
              >
                <IconButton icon={FaRegComment} />
                <IconButton icon={FaRegHeart} />
                <IconButton icon={FaRegEye}  />
              </HStack>
              <Stack
                spacing={2}
                direction="row"
                fontSize={{ base: 'sm', sm: 'md' }}
                justifySelf="flex-end"
                alignItems="center"
              >
                {['Manage', 'Edit'].map((label, index) => (
                  <ArticleSettingLink key={index} label={label} />
                ))}
              </Stack>
            </Grid>
            {data.length - 1 !== index && <Divider m={0} />}
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};


export default VoiceList;