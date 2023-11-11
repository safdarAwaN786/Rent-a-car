import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = ({ initialImageLink, onFileUpload }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Reset the file state when the initialImageLink changes
    setFile(null);
  }, [initialImageLink]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      // Set the file state when a file is dropped
      setFile(acceptedFiles[0]);
      onFileUpload(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt="Uploaded Preview"
          style={previewImageStyles}
        />
      ) : initialImageLink ? (
        <img src={initialImageLink} alt="Initial Image" style={previewImageStyles} />
      ) : (
        <p style={dropzoneTextStyles}>{isDragActive ? 'Drop the image here' : 'Click or drag a file here to upload'}</p>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '150px',
  width: '150px',
  cursor: 'pointer',
  position: 'relative',
  margin : '10px',
  padding  : '3px'
};

const previewImageStyles = {
  maxWidth: '100%',
  maxHeight: '150px',
  borderRadius: '4px',
};

const dropzoneTextStyles = {
  textAlign: 'center',
};

export default MyDropzone;
