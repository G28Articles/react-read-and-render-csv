import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const onDrop = acceptedFiles => {
    setFile(acceptedFiles[0]);
    const text = document.getElementById("dropText")
    text.innerText = acceptedFiles[0].name
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    Papa.parse(file, {
      header: false,
      download: true,
      skipEmptyLines: true,
      complete: results => {
        setData(results.data)
      },
      error: err => {
        const text = document.getElementById("erroText")
        text.innerText = err
      }
    })
  }

  const renderRow = (row, header) => {
    return row.map(column => {
      return header ? 
        <th scope="col" className="px-8 py-4">{column}</th> 
        : 
        <td className="px-8 py-4">{column}</td>
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center m-5">
        <h1 className="text-4xl mb-10">React Read and Parse CSV Files</h1>
        <div className="upload-box" {...getRootProps()}>
          <input {...getInputProps()} />
          <p id="dropText">Drag 'n' drop a CSV file here, or click to select a file</p>
        </div>
        <div>
          {file && <button className="button" onClick={handleUpload}>Read File</button>}
          <p id="erroText"></p>
        </div>
        {data.length > 0 &&
          <div className="mt-5 relative overflow-x-auto">
            <table className="table-auto w-full text-sm text-left text-slate-500 dark:text-slate-400">
              <thead className="text-xs text-slate-700 uppercase bg-slate-200 dark:bg-slate-700 dark:text-slate-400">
                <tr key="0">
                  {renderRow(data[0], true)}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  index !== 0 &&
                  <tr key={index}>
                    {renderRow(item, false)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
