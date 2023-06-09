async function downloadUrl(url, filename, type) {
  const options = {
    method: "GET",
    mode: "no-cors", // Add the "no-cors" mode option
  }; 
  
  const response = await fetch(url, options);
    const data = await response.blob();
  
    if (typeof window.navigator.msSaveBlob !== "undefined") {
      // For Internet Explorer and Edge
      window.navigator.msSaveBlob(data, filename);
    } else {
      // For other browsers
      const downloadLink = document.createElement("a");
      const fileUrl = URL.createObjectURL(data);
  
      downloadLink.href = fileUrl;
      downloadLink.download = filename;
      downloadLink.click();
  
      URL.revokeObjectURL(fileUrl);
    }
  }
  
  export { downloadUrl };
  