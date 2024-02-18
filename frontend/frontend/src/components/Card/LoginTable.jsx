import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
];
const data = [
  {
    key: "1",
    username: "admin",
    password: "admin",
  },
  {
    key: "2",
    username: "staff",
    password: "staff",
  },
];

const LoginTable = () => {
  return (
    // <div className=''>
    // 	<div className='shadow overflow-hidden rounded border-b border-gray-200'>
    // 		<table className='min-w-full bg-white'>
    // 			<tbody className='text-center table-bordered table m-5'>
    // 				<thead className='bg-gray-800 text-white'>
    // 					<tr>
    // 						<th className='w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm '>
    // 							{" "}
    // 							<strong>username</strong>
    // 						</th>
    // 						<th>
    // 							{" "}
    // 							<strong>password</strong>
    // 						</th>
    // 					</tr>
    // 				</thead>

    // 				<tr>
    // 					<td>staff</td>
    // 					<td>staff</td>
    // 				</tr>
    // 				<tr>
    // 					<td>admin</td>
    // 					<td>admin</td>
    // 				</tr>
    // 			</tbody>
    // 		</table>
    // 	</div>
    // </div>

    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      className='text-center'
    />
  );
};

export default LoginTable;
