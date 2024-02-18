import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const DeleteBtn = ({ path }) => {
  return (
    <div>
      {/* <Link to={path}> */}
        <button className='flex justify-center items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded mr-2'>
          <DeleteOutlined />
        </button>
      {/* </Link> */}
    </div>
  );
};

export default DeleteBtn;