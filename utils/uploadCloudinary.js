import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// Function to upload the file
const uploadCloudinary = async (filePath) => {
  const url = 'http://localhost:5000/upload';
  const form_data = new FormData();

  // Append the file to the form
  form_data.append('file', fs.createReadStream(filePath));

  // Config for axios, including headers required for form-data
  const config = {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
    },
  };

  try {
    const response = await axios.post(url, form_data, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default uploadCloudinary;
