import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Box, Select, FormControl, FormLabel } from '@chakra-ui/react';
import { BsBoxArrowUpRight } from 'react-icons/bs';

function VoiceModelSelector({ onSelect, onOpen, setCurrentName, setCurrentVoiceId }) {
 
  const [voiceModels, setVoiceModels] = useState([]);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState(null);

  useEffect(() => {
    const fetchYourData = async () => {
      const response = await axios.get(
        "/api/xilabs/get_voices"
      );
      const voices = response.data.voices;
      const tableData = voices.map((voice) => ({
        name: voice.name,
        voice_id: voice.voice_id,
        sample: voice.preview_url,
      }));
      setVoiceModels(tableData);
    };

    fetchYourData();
  }, []);

  const handleVoiceModelChange = (event) => {
    const selectedId = event.target.value;
    const selectedModel = voiceModels.find(model => model.voice_id === selectedId);
    setSelectedVoiceModel(selectedModel);
    onSelect(selectedModel);
  };

  const handleButtonClick = () => {
    if (selectedVoiceModel) {
    
      onOpen();
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Select a Voice Model</FormLabel>
        <Select placeholder="Select a voice model" onChange={handleVoiceModelChange}>
          {voiceModels.map((model) => (
            <option key={model.voice_id} value={model.voice_id}>
              {model.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {selectedVoiceModel && (
        <Box mt={4}>
          <h2>Selected Voice Model:</h2>
          <p>ID: {selectedVoiceModel.voice_id}</p>
          <p>Name: {selectedVoiceModel.name}</p>
        </Box>
      )}
      <IconButton
        tooltip="Create Voiceover"
        size="xs"
        colorScheme="blue"
        icon={<BsBoxArrowUpRight />}
        aria-label="Up"
        onClick={handleButtonClick}
      />
    </Box>
  );
}

export default VoiceModelSelector;
