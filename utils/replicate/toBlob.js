const toBlob = async (fileUrl) => {
const response = await fetch(fileUrl);
const imgBlob = await response.blob();

return imgBlob;
};
export default toBlob;