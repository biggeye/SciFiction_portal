import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  RiCloseCircleLine,
  RiDownloadCloud2Line,
  RiPlayCircleLine,
} from "react-icons/ri";
import axios from "axios";
import sliceWords from "../../../utils/sliceWords";
import convertDate from "../../../utils/convertDate";
import { downloadFile } from "../../../utils/downloadFile";
import { downloadUrl } from "../../../utils/downloadUrl";

export default function Talks() {
  const [data, setData] = useState([]);
  const [talkId, setTalkId] = useState("");

  useEffect(() => {
    fetchYourData().then((fetchedData) => {
      const filteredData = fetchedData.filter((item) => {
        return item.status !== "error" && !item.result_url?.startsWith("s3");
      });
      setData(filteredData);
    });
  }, []);

  const fetchYourData = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.d-id.com/talks?limit=100',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY0MjhiNjgyMWU2MDA2YjY1N2VhZTNmOSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NjY2ODc3MSwiZXhwIjoxNjg2NzU1MTcxLCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.3FnKv2-Ysi_pTQwu56EINMnNnp1VE1oanbrRMkz7hGwVWshR--9xsdvegRzPX0_CGVEbVVUV3raVKAt-mMsrA-nY16s0BjqBrYdCEnrDCgChg2vN84k0wqGMT-TfAP8HkxU1BHLXt3v4LLmhgbyjCjuWGi0QLTuqGgmC-rOL8VRz81brIiJI2x3UuXU6u6Ggt-27UBWiNIkf4gHi-5wV5OgETB6iqzeArSJV400xOumfu4KCQgyO2_fkwG3bp0-swCYFJaEp3WVlMqnfIcsNt6VmNPf5Irdzd2_5JQrN36QDjO7BsE7p_VmuuX2uLQSB23E14qLxz4JP-C84nkhQHQ'
  
      },
    };
  
    let response;
    try {
      response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;  // Propagate the error
    }
  
    const talks = response.data.talks;
  
    const tableData = talks.map((talk) => {
      return {
        name: talk.name,
        date: talk.modified_at,
        length: talk.duration,
        talk_id: talk.id,
        status: talk.status
      };
    });
  
    return tableData;
  };
  
  const downloadRow = async (talk_id) => {
    const options = {
      method: 'GET',
      url: `https://api.d-id.com/talks/${talk_id}`,
      headers: {
        accept: 'application/json',
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY0MjhiNjgyMWU2MDA2YjY1N2VhZTNmOSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NjY2ODc3MSwiZXhwIjoxNjg2NzU1MTcxLCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.3FnKv2-Ysi_pTQwu56EINMnNnp1VE1oanbrRMkz7hGwVWshR--9xsdvegRzPX0_CGVEbVVUV3raVKAt-mMsrA-nY16s0BjqBrYdCEnrDCgChg2vN84k0wqGMT-TfAP8HkxU1BHLXt3v4LLmhgbyjCjuWGi0QLTuqGgmC-rOL8VRz81brIiJI2x3UuXU6u6Ggt-27UBWiNIkf4gHi-5wV5OgETB6iqzeArSJV400xOumfu4KCQgyO2_fkwG3bp0-swCYFJaEp3WVlMqnfIcsNt6VmNPf5Irdzd2_5JQrN36QDjO7BsE7p_VmuuX2uLQSB23E14qLxz4JP-C84nkhQHQ'
  
      },
    };
  
    try {
      const response = await axios.request(options);
      if (response.data.status === 'error') {
        console.log('Video is corrupt');
      } else if (response.data.status === 'done') {
        const filename = `${talk_id}.mp4`;
        const videoUrl = response.data.result_url;
        downloadUrl(videoUrl, filename, 'video/mp4');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRow = async (talk_id) => {
    setTalkId(talk_id);
    const options = {
      method: "DELETE",
      url: `https://api.d-id.com/talks/${talkId}`,
      headers: {
        accept: "application/json",
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY0MjhiNjgyMWU2MDA2YjY1N2VhZTNmOSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NjY2ODc3MSwiZXhwIjoxNjg2NzU1MTcxLCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.3FnKv2-Ysi_pTQwu56EINMnNnp1VE1oanbrRMkz7hGwVWshR--9xsdvegRzPX0_CGVEbVVUV3raVKAt-mMsrA-nY16s0BjqBrYdCEnrDCgChg2vN84k0wqGMT-TfAP8HkxU1BHLXt3v4LLmhgbyjCjuWGi0QLTuqGgmC-rOL8VRz81brIiJI2x3UuXU6u6Ggt-27UBWiNIkf4gHi-5wV5OgETB6iqzeArSJV400xOumfu4KCQgyO2_fkwG3bp0-swCYFJaEp3WVlMqnfIcsNt6VmNPf5Irdzd2_5JQrN36QDjO7BsE7p_VmuuX2uLQSB23E14qLxz4JP-C84nkhQHQ'
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    fetchYourData().then((fetchedData) => {
      setData(fetchedData);
    });
  };

  return (
    <Flex
      w="full"
      bg="#gray.700"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      {" "}
      {data.map((token, tid) => (
        <Box
          key={tid}
          bg="white"
          _dark={{ bg: "brand.800" }}
          m={4} // some margin for separation
          borderRadius="md" // rounded corners
          overflow="hidden" // keep child boundaries within card
          boxShadow="sm" // small shadow for 3D effect
          textAlign="center"
        >
          <Box p={4}>
            {Object.keys(token).map((x) => {
              if (x === "talk_id" || x === "script") return null;

              return (
                <Text size="xs" key={`${tid}${x}`}>
                  <b>{x}: </b>
                  {token[x]}
                </Text>
              );
            })}
          </Box>

          <Flex justifyContent="flex-end" p={1}>
            <IconButton
              size="xs"
              colorScheme="green"
              icon={<RiPlayCircleLine />}
            />
            <IconButton
              size="xs"
              colorScheme="blue"
              icon={<RiDownloadCloud2Line />}
              aria-label="Up"
              onClick={() => downloadRow(token["talk_id"])}
            />
            <IconButton
              size="xs"
              colorScheme="red"
              icon={<RiCloseCircleLine />}
              aria-label="Up"
              onClick={() => deleteRow(token["talk_id"])}
            />
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}
