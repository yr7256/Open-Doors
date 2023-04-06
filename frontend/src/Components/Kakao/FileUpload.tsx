import React, { ChangeEvent, useState } from 'react';

const FileUpload: React.FC = () => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const filesArray = Array.from(event.target.files || []);
		setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...filesArray]);
	};

	const handleFileDelete = (file: File) => {
		setSelectedFiles((prevSelectedFiles) => prevSelectedFiles.filter((prevFile) => prevFile !== file));
	};

	const handleFileUpload = () => {
		// do something with the selected files
		// console.log(selectedFiles);
	};

  return (
    <div>
      <input type="file" multiple onChange={handleFileSelect} />
      <button onClick={handleFileUpload}>Upload</button>
      {selectedFiles.length > 0 && (
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              <img src={URL.createObjectURL(file)} alt={file.name} />
              {file.name}
              <button onClick={() => handleFileDelete(file)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
