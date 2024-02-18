import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTrailBalance } from "../../redux/rtk/features/account/accountSlice";




const TrialBalance = () => {
  const dispatch = useDispatch();
  const { trailBalance : data , loading}= useSelector(state => state?.accounts) || [];
  //make a use effect to get the data from the getTrailBalance function
  useEffect(() => {
    dispatch(loadTrailBalance())
  }, [dispatch]);
  return (
    <>
      <Card loading={loading}>
        <div>
          <div className='card-title flex justify-between'>
            <h5 className='text-xl mb-3'>
              <span className='ml-2 report-section-card-title'>
                Trail Balance
              </span>
            </h5>
          </div>
          <div className='border-gray-200 w-full rounded bg-white overflow-x-auto'>
            <table className='table report-section-table w-full'>
              <thead className='text-gray-600 bg-slate-50 text-[13px] font-bold border-gray tracking-wider text-left px-5 py-3 hover:cursor-pointer uppercase border-b-2 border-gray-200'>
                <tr className='border-b border-gray'>
                  <th
                    scope='col'
                    className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-300 text-left font-semibold uppercase tracking-wider'
                  >
                    Account
                  </th>
                  <th
                    scope='col'
                    className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-300 text-left font-semibold uppercase tracking-wider'
                  >
                    Debit
                  </th>
                  <th
                    scope='col'
                    className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-300 text-left font-semibold uppercase tracking-wider'
                  >
                    Credit
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.debits?.map((item, index) => {
                    return (
                      <tr key={index} className='hover:bg-gray-100 hover:cursor-pointer'>
                        <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                          {item.subAccount}
                        </td>
                        <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                          {item.balance}
                        </td>
                        <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'></td>
                      </tr>
                    );
                  })}
                {data &&
                  data?.credits?.map((item, index) => {
                    return (
                      <tr key={index} className='hover:bg-gray-100 hover:cursor-pointer'>
                        <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                          {item.subAccount}
                        </td>
                        <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'></td>
                        <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                          {item.balance}
                        </td>
                      </tr>
                    );
                  })}

                <tr className='hover:bg-gray-100 hover:cursor-pointer font-semibold'>
                  <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm '>
                    TOTAL
                  </td>
                  <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                    {data?.totalDebit}
                  </td>
                  <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                    {data?.totalCredit}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TrialBalance;
