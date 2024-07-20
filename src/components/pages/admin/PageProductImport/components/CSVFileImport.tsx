import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { axiosInstance } from "~/utils/api";
// import axios from "axios";


type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const token = localStorage.getItem('authorization_token');

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    if(!file) {
      return;
    }

    try {
      // Get the presigned URL
    const response = await axiosInstance({
      method: "GET",
      url,
      params: {
        name: encodeURIComponent(file.name),
      },
      ...(token ? {
          headers:{
            Authorization: `Basic ${token}`
          }
        } : {})
    });
    console.log("File to upload: ", file.name);
    console.log("Uploading to: ", response.data);

    const result = await fetch(response.data, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "text/csv",
      },
    });

    console.log("Result: ", result);
    setFile(undefined);
    } catch(err) {
      console.error("Uploading Error:", err);
    }

    
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
