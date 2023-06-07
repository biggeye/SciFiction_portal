function downloadS3Mp4(s3url, filename) {
    const downloadLink = document.createElement("a");
  
    downloadLink.href = s3url;
    downloadLink.download = filename;
    downloadLink.target = "_blank"; // Optional: Open the download link in a new tab
  
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  export { downloadS3Mp4 };
  