import { UnorderedListOutlined } from "@ant-design/icons";
import { Card } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearAccount,
  loadSingleAccount,
} from "../../redux/rtk/features/account/accountSlice";
import Loader from "../loader/loader";
import UpdateAccount from "./updateAccount";

const DetailAccount = () => {
  const data = useSelector((state) => state.accounts.account);
  const { id } = useParams("id");
  const dispatch = useDispatch();

  //make a use effect to get the data from the getTrailBalance function
  useEffect(() => {
    dispatch(loadSingleAccount(id));
    return () => {
      dispatch(clearAccount());
    };
  }, [dispatch, id]);

  return (
    <>
      <Card>
        {data ? (
          <div className='card-custom card-body'>
            <div className='card-title flex justify-between mb-4'>
              <h5 className='text-xl'>
                <UnorderedListOutlined />
                <span className='ml-2'> Account Details: {data.name}</span>{" "}
              </h5>
              <UpdateAccount account={data} id={id} />
            </div>
            <div className='w-full shadow bg-white rounded'>
              <div className='border-gray-200 w-full rounded bg-white overflow-x-auto'>
                <table className='w-full'>
                  <thead className='text-gray-600 text-[13px] font-bold border-gray tracking-wider text-left px-5 py-3 hover:cursor-pointer uppercase border-b-2 border-gray-200'>
                    <tr className='border-b border-gray'>
                      <th
                        scope='col'
                        className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left  font-semibold uppercase tracking-wider'
                      >
                        Debit
                      </th>
                      <th
                        scope='col'
                        className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left  font-semibold uppercase tracking-wider'
                      >
                        Credit
                      </th>
                      <th
                        scope='col'
                        className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left  font-semibold uppercase tracking-wider'
                      >
                        Particulars
                      </th>
                      <th
                        scope='col'
                        className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left  font-semibold uppercase tracking-wider'
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data?.debit?.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className='hover:bg-gray-100 hover:cursor-pointer'
                          >
                            <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                              {item.amount}
                            </td>
                            <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'></td>
                            <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                              {item.particulars}
                            </td>
                            <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                              {moment(item.date).format("YYYY-MM-DD")}
                            </td>
                          </tr>
                        );
                      })}
                    {data &&
                      data?.credit?.map((item, index) => {
                        return (
                          <tr key={index} className='hover:bg-gray-100 hover:cursor-pointer'>
                            <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'></td>
                            <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                              {item.amount}
                            </td>
                            <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                              {item.particulars}
                            </td>
                            <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                              {moment(item.date).format("YYYY-MM-DD")}
                            </td>
                          </tr>
                        );
                      })}

                    {data && (
                      <tr className='text-center hover:bg-gray-100 hover:cursor-pointer'>
                        <td
                          colSpan='2'
                          className='table-active py-4 px-6 border-b border-gray-200 text-gray-900 text-sm text-base'
                        >
                          <strong>Balance</strong>
                        </td>
                        <td>
                          <strong>{data?.balance}</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Card>
    </>
  );
};

export default DetailAccount;
