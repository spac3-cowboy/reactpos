import { SolutionOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function StatusSelection({ paginatedThunk, query }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("true");
  const onChange = (value) => {
    setStatus(value);
    dispatch(paginatedThunk({ ...query, status: value, page: 1, count: 10 }));
  };
  return (
    <>
      <Segmented
        className='text-center rounded text-red-500 '
        size='middle'
        options={[
          {
            label: (
              <span>
                <SolutionOutlined /> Active
              </span>
            ),
            value: "true",
          },
          {
            label: (
              <span>
                <UserDeleteOutlined /> Inactive
              </span>
            ),
            value: "false",
          },
        ]}
        value={status}
        onChange={onChange}
      />
    </>
  );
}
