function downloadFile(data, filename) {

      const decodedData = atob(data);

      const uint8Array = new Uint8Array(decodedData.length);

      for (let i = 0; i < decodedData.length; i++) {
        uint8Array[i] = decodedData.charCodeAt(i);
      }
  
      const blob = new Blob([uint8Array], { type: "audio/mpeg" });
  
    if (typeof window.navigator.msSaveBlob !== "undefined") {
      // For Internet Explorer and Edge
      window.navigator.msSaveBlob(blob, filename);
    } else {
      // For other browsers
      const downloadLink = document.createElement("a");
      const url = URL.createObjectURL(blob);
  
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
  
      URL.revokeObjectURL(url);
    }
  }
  
  export { downloadFile };
  