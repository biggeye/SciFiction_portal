import React from "react";
import { useState, useEffect } from "react";
import {
  ButtonGroup,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiCloseCircleLine, RiDownloadCloud2Line } from "react-icons/ri";
import axios from "axios";
import sliceWords from "../../../utils/sliceWords";
import convertDate from "../../../utils/convertDate";

export default function Voiceovers() {
  const [currentVoiceover, setCurrentVoiceover] = useState("");
  const [data, setData] = useState([]);
  const header = ["Voice", "Date", "Script", "Actions"];
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  const apiKey = process.env.XI_API_KEY;

  useEffect(() => {
    fetchYourData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  const fetchYourData = async () => {
    const response = await axios.get(
      "https://flask-vercel-silk.vercel.app/api/xilabs/get_history"
    );
    const voiceovers = response.data;

    const tableData = voiceovers.map((vo) => ({
      voice: vo.voice_name,
      date: convertDate(vo.date_unix),
      script: sliceWords(vo.text),
      voiceover_id: vo.history_item_id,
    }));

    return tableData;
  };

  const downloadRow = async (voiceoverId) => {
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/history/download",
      {
      headers: {
        "xi-api-key": apiKey,
      },
        "history_item_ids": [
         voiceoverId
        ]
      }
      );
    console.log(response);
  };
  
  const deleteRow = async (voiceoverId) => {
    try {
      const response = await axios.delete(
        `https://api.elevenlabs.io/v1/history/${voiceoverId}`,
        {
          headers: {
            Accept: "audio/json",
            "xi-api-key": apiKey,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Table
        w="full"
        bg="white"
        _dark={{ bg: "gray.800" }}
        display={{
          base: "block",
          md: "table",
        }}
        sx={{
          "@media print": {
            display: "table",
          },
        }}
      >
        <Thead
          display={{
            base: "none",
            md: "table-header-group",
          }}
          sx={{
            "@media print": {
              display: "table-header-group",
            },
          }}
        >
          <Tr>
            {header.map((x) => (
              <Th key={x}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          display={{
            base: "block",
            lg: "table-row-group",
          }}
          sx={{
            "@media print": {
              display: "table-row-group",
            },
          }}
        >
          {data.map((token, tid) => {
            return (
              <Tr
                key={tid}
                display={{
                  base: "grid",
                  md: "table-row",
                }}
                sx={{
                  "@media print": {
                    display: "table-row",
                  },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
              >
                {Object.keys(token).map((x) => {
                  return (
                    <React.Fragment key={`${tid}${x}`}>
                      <Td
                        display={{
                          base: "table-cell",
                          md: "none",
                        }}
                        sx={{
                          "@media print": {
                            display: "none",
                          },
                          textTransform: "uppercase",
                          color: color1,
                          fontSize: "xs",
                          fontWeight: "bold",
                          letterSpacing: "wider",
                          fontFamily: "heading",
                        }}
                      >
                        {x}
                      </Td>
                      <Td
                        color={"gray.500"}
                        fontSize="md"
                        fontWeight="hairline"
                      >
                        {token[x]}
                      </Td>
                    </React.Fragment>
                  );
                })}
                <Td
                  display={{
                    base: "table-cell",
                    md: "none",
                  }}
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                    textTransform: "uppercase",
                    color: color2,
                    fontSize: "xs",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    fontFamily: "heading",
                  }}
                >
                  Actions
                </Td>
                <Td>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton
                      colorScheme="blue"
                      icon={<RiDownloadCloud2Line />}
                      aria-label="Up"
                      onClick={() => downloadRow(token["voiceover_id"])}
                    />
                    <IconButton
                      colorScheme="red"
                      icon={<RiCloseCircleLine />}
                      aria-label="Up"
                      onClick={() => deleteRow(token["voiceover_id"])}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}
