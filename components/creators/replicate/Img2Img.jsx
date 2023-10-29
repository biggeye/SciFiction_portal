import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  chakra,
  Flex,
  Card,
  CardBody,
  CardFooter,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  CircularProgress,
  IconButton,
  Image,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { SettingsIcon, ArrowRightIcon } from "@chakra-ui/icons";
import uploadPrediction from "../../../utils/replicate/uploadPrediction";
import { img2img } from "../../../data/replicate/img2img";
import ModelSelect from "./ModelSelect";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const convertToDataURI = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Img2Img({ currentPage }) {
  // ******STATE
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [predictionProgress, setPredictionProgress] = useState(0);
  const [delayToast, setDelayToast] = useState(null);
  const [error, setError] = useState(null);
  // Prediction preparation
  const [userInFile, setUserInFile] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [negativeUserInput, setNegativeUserInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedModel, setSelectedModel] = useState({
    modelId: "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
    friendlyName: "Remove Background",
    shortDesc: "Remove image's background",
    example:
      "https://replicate.delivery/pbxt/2hczaMwD9xrsIR8h3Cl8iYGbHaCdFhIOMZ0LfoYfHlKuuIBQA/out.png",
  });
  // Prediction production
  const [prediction, setPrediction] = useState(null);
  const [newPrediction, setNewPrediction] = useState(null);
  // *********VARIABLES
  const session = useSession();
  const supabase = useSupabaseClient();
  const userId = session.user.id;
  const toast = useToast();
  // FUNCTIONS
  const sortedImg2Img = [...img2img].sort((a, b) =>
    a.friendlyName.localeCompare(b.friendlyName, "en", { sensitivity: "base" })
  );

  const handleModelChange = (modelId, friendlyName, shortDesc, example) => {
    setSelectedModel({ modelId, friendlyName, shortDesc, example });
    if (newPrediction) {
      handleImageReset();
    }
  };
  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setSelectedImage(imagePreview);
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
    }
  };
  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const image = userInFile;
      const requestBody = {
        image: image,
        prompt: userInput,
        version: selectedModel.modelId,
      };
      const response = await fetch("api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      let prediction = await response.json();
      if (response.status !== 201) {
        throw new Error(prediction.detail);
      }
      setPrediction(prediction);
      const startTime = new Date();
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        const currentTime = new Date();
        const timeElapsed = (currentTime - startTime) / 1000; // convert to seconds
        // If more than 15 seconds have passed, show toast
        if (timeElapsed > 15) {
          setDelayToast("Please be patient, model is booting!");
        }
        await sleep(2500);
        const predictionResponse = await fetch(
          "/api/replicate/" + prediction.id
        );
        prediction = await predictionResponse.json();
        if (predictionResponse.status !== 200) {
          setError(prediction.detail);
          return;
        }
        const logs = prediction.logs;
        const regex = /(\d+)%/g;
        let matches;
        let highestPercentage = 0;
        while ((matches = regex.exec(logs)) !== null) {
          const percentage = parseInt(matches[1], 10);
          highestPercentage = Math.max(highestPercentage, percentage);
        }
        if (highestPercentage > 0) {
          setPredictionProgress(highestPercentage);
        }
        setPrediction(prediction);
      }
      if (prediction.status === "succeeded") {
        const predictionId = prediction.id;
        const modelId = prediction.version;
        // Make sure output is always an array
        let output = Array.isArray(prediction.output)
          ? prediction.output
          : [prediction.output];
        // If there is a second element in the array, use it as the file. Otherwise, use the first element.
        let file = output.length > 1 ? output[1] : output[0];
        const prompt = prediction.input.prompt;
        const imageUrl = await uploadPrediction(
          file,
          userId,
          modelId,
          predictionId,
          prompt,
          supabase
        );
        setNewPrediction(imageUrl);
      } else if (prediction.status === "failed") {
        console.log(prediction.error);
        setError(prediction.error);
      }
    } finally {
      setIsLoading(false);
      setUserInput("");
      setPrediction(null);
    }
  };
  const handleImageReset = (imageUrl) => {
    toast.closeAll();
    toast({
      title: "Image stored in EyeGallery",
      description: "Your image is stored in EyeGallery",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setNewPrediction(null);
    setSelectedImage(null);
  };
  useEffect(() => {
    if (error) {
      toast.closeAll();
      toast({
        title: "img2img Failed",
        description: `Process failed: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  }, [error, toast]);
  useEffect(() => {
    if (delayToast) {
      toast.closeAll();
      toast({
        title: "Delay Notice",
        description: delayToast,
        status: "info",
        duration: 10000,
        isClosable: false,
      });
    }
  }, [delayToast, toast]);

  return (
    <Box
      bgGradient="linear(to-b, white 0%, gray.200 40%, white 60%, white 100%)"
      overflowY="none"
      fontSize={["sm", "md", "lg", "xl"]}
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <VStack mb={100}>
        <Box
          fontSize={["sm", "md", "lg", "xl"]}
          p={[".25rem", ".5rem"]}
          width="100%"
          opacity={0.9}
          backdropFilter="blur(10px)"
        >
          <Input size="md" type="file" accept="image/*" onChange={handleImageChange} />
          <ModelSelect
            handleModelChange={handleModelChange}
            models={sortedImg2Img}
          />
          
          <InputGroup>
          <Input
            color="black"
            name="prompt"
            placeholder="Describe modifications..."
            size="md"
            resize="none"
            value={userInput}
            onChange={handleUserInputChange}
          />
            <InputRightAddon>
              <IconButton
                icon={<ArrowRightIcon />}
                isLoading={isLoading}
                onClick={handleUserInputSubmit}
                size="xs"
              />
            </InputRightAddon>
          </InputGroup>
        </Box>
        <Card w="80vw" mt={5}>
          <Box display="flex" justifyContent="center">
            <Flex
              justifyContent="space-between"
              direction="column"
              alignItems="center"
            >
              {prediction && (
                <Box>
                  <CircularProgress
                    isIndeterminate={prediction.status === "starting"}
                    value={predictionProgress}
                    color="green.300"
                  />
                  <br />
                  {prediction.status}
                </Box>
              )}
            </Flex>
          </Box>

          <Card align="center">
            <CardBody>
              {newPrediction ? (
                <Box
                  mx="auto"
                  rounded="lg"
                  shadow="md"
                  bg="white"
                  _dark={{ bg: "gray.800" }}
                  maxW="80vw"
                >
                  <Image
                    roundedTop="lg"
                    src={newPrediction}
                    alt="output"
                    w="full"
                    h="40vh"
                    onClick={handleImageReset}
                  />
                  <Box p={6}>
                    <Box>
                      <chakra.span
                        fontSize="xs"
                        textTransform="uppercase"
                        color="brand.600"
                        _dark={{ color: "brand.400" }}
                      >
                        img2img
                      </chakra.span>
                      <chakra.p
                        display="block"
                        color="gray.800"
                        _dark={{ color: "white" }}
                        fontWeight="bold"
                        fontSize="2xl"
                        mt={2}
                        _hover={{ color: "gray.600", textDecor: "underline" }}
                      >
                        {selectedModel.friendlyName}
                      </chakra.p>
                      <chakra.p
                        mt={2}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                      >
                        {selectedModel.shortDesc}
                      </chakra.p>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  mx="auto"
                  rounded="lg"
                  shadow="md"
                  bg="white"
                  _dark={{ bg: "gray.800" }}
                  maxW="80vw"
                >
                  {selectedImage ? (
                    <Image
                      roundedTop="lg"
                      fit="cover"
                      src={selectedImage}
                      alt="Image To Modify"
                      w="full"
                      h="40vh"
                    />
                  ) : (
                    <Image
                      roundedTop="lg"
                      w="full"
                      h="40vh"
                      fit="cover"
                      src={selectedModel.example}
                      alt="Article"
                    />
                  )}
                  <Box p={6}>
                    <Box>
                      <chakra.span
                        fontSize="xs"
                        textTransform="uppercase"
                        color="brand.600"
                        _dark={{ color: "brand.400" }}
                      >
                        img2img
                      </chakra.span>
                      <chakra.p
                        display="block"
                        color="gray.800"
                        _dark={{ color: "white" }}
                        fontWeight="bold"
                        fontSize="2xl"
                        mt={2}
                        _hover={{ color: "gray.600", textDecor: "underline" }}
                      >
                        {selectedModel.friendlyName}
                      </chakra.p>
                      <chakra.p
                        mt={2}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                      >
                        {selectedModel.shortDesc}
                      </chakra.p>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Card>
      </VStack>
    </Box>
  );
}
