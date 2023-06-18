import React, { useState } from "react";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", videoFile);

    try {
      const res = await fetch("/api/uploadVideo", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw Error(data.message);
      }

      console.log(data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Video File:
        <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
