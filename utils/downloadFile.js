function downloadFile(data, filename) {
    const blob = new Blob([data], { type: "audio/mpeg" });
  
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
  