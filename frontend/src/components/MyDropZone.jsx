import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const MyDropzone = ({ initialImageLink, onFileUpload }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Reset the file state when the initialImageLink changes
    setFile(null);
  }, [initialImageLink]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];

      // Check file type before setting the file
      if (isImageFile(selectedFile)) {
        setFile(selectedFile);
        onFileUpload(selectedFile);
      } else {
        toast.error('File formats allowed are ".jpg, .jpeg, .png"')
      }
    },
  });
  const isImageFile = (file) => {
    return file.type.startsWith('image/') && /\.(jpg|jpeg|png)$/i.test(file.name);
  };

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
  margin: '10px',
  padding: '3px'
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
