import { useState } from 'react';
import { storage } from '../api/Firebase';
import { ref, uploadBytes } from 'firebase/storage';

export default function UploadFile() {
  const [file, setFile] = useState(null);

  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadFileToStorage = () => {
    if (file) {
      const fileName = `${Date.now()}_${file.name}`; // Generate a unique file name using current timestamp
      const storageRef = ref(storage, `files/${fileName}`); // Set a unique path using the file name

      uploadBytes(storageRef, file).then(() => {
        alert('File uploaded successfully!');
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <>
      <input type='file' onChange={handleUploadFile} />
      <button onClick={handleUploadFileToStorage}>Upload File</button>
    </>
  );
}
