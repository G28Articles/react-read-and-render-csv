import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const onDrop = acceptedFiles => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    Papa.parse(file, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data)
      }
    })
  }

  return (
    <div className="App">
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a CSV file here, or click to select a file</p>
        </div>
        {file && <button onClick={handleUpload}>Upload</button>}
        {data.map((item) => (
            <div key={item.id}>
              {item.name} - {item.age}
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
