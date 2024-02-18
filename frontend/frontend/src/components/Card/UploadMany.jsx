import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./card.css";
import { useNavigate } from "react-router-dom";

const UploadMany = ({ urlPath, loadAllThunk, query }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate()
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  function csvToArray(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");

      // Skip empty lines
      if (currentLine.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          // Remove surrounding quotes from key and value
          const key = headers[j].trim().replace(/(^['"]|['"]$)/g, "");
          const value = currentLine[j].trim().replace(/(^['"]|['"]$)/g, "");
          obj[key] = value;
        }
        result.push(obj);
      }
    }
    return result;
  }

  const csvFileToArray = async (string) => {
    const array = csvToArray(string);

    try {
      // post request to backend using axios
      const resp = await axios.post(`${urlPath}?query=createmany`, array);
      if (resp?.statusText === "Created") {
        setLoader(false);
        if (loadAllThunk) {
          dispatch(loadAllThunk({ ...query }));
        }
        toast.success("Uploaded Success");
        if(urlPath == "product"){
          navigate("/admin/product");
        }
      } else {
        toast.warning("Something went wrong, Please try again");
        setLoader(false);
      }
    } catch (err) {
      toast.warning("Something went wrong, Please try again");
      setLoader(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div className='text-center mt-2  '>
      {!file && (
        <p className='text-center mb-2' style={{ color: "red" }}>
          Please select a CSV file for uploading
        </p>
      )}
      <form className='form-group'>
        <input
          required={true}
          className='text-sm text-slate-500 rounded-lg border border-slate-500 p-2
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          mt-4 file:mt-0 file:ml-4
          mb-4 file:mb-0'
          type='file'
          id='csvFileInput'
          accept='.csv'
          onChange={handleOnChange}
        />
        <br />
        <Button
          htmlType='submit'
          loading={loader}
          className='rounded-lg bg-blue-500 text-white font-bold px-4 disabled:opacity-50'
          disabled={!file}
          type='submit'
          onClick={handleOnSubmit}
        >
          Import From CSV
        </Button>
      </form>
    </div>
  );
};

export default UploadMany;
