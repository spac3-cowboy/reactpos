import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBalanceSheet } from "../../redux/rtk/features/account/accountSlice";

const BalanceSheet = () => {
  const dispatch = useDispatch();
  const {balanceSheet:data , loading} = useSelector(state => state?.accounts) || null;
  useEffect(() => {
    dispatch(loadBalanceSheet())
  }, [dispatch]);

  return (
    <>
      <Card loading={loading}>
        <div>
          <div className='card-title flex justify-between'>
            <h5 className='text-xl mb-3'>
              <span className='ml-2 report-section-card-title'>
                Balance Sheet
              </span>
            </h5>
          </div>
          <div className='w-full shadow bg-white rounded'>
            <div className='border-gray-200 w-full rounded bg-white overflow-x-auto'>
              <table className='w-full'>
                <div className='mt-2 mb-1 ml-2 font-semibold text-base'>
                  Assets
                </div>
                <thead className='text-gray-600 text-[13px]  font-bold border-gray tracking-wider text-left px-5 py-3 hover:cursor-pointer uppercase border-b-2 border-gray-200'>
                  <tr className='border-b border-gray'>
                    <th
                      scope='col'
                      className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left font-semibold uppercase tracking-wider'
                    >
                      Account
                    </th>
                    <th
                      scope='col'
                      className='text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left font-semibold uppercase tracking-wider'
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.assets.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className='hover:bg-gray-100 hover:cursor-pointer'
                        >
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.subAccount}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.balance}
                          </td>
                        </tr>
                      );
                    })}

                  <tr className='hover:bg-gray-100 hover:cursor-pointer'>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      {" "}
                      <strong>TOTAL</strong>
                    </td>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>{data?.totalAsset || ""}</strong>
                    </td>
                  </tr>

                  <h5 className='mt-2 mb-1 ml-2 font-semibold text-base'>
                    {" "}
                    Liabilities
                  </h5>

                  {data &&
                    data?.liabilities.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className='hover:bg-gray-100 hover:cursor-pointer'
                        >
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.subAccount}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.balance}
                          </td>
                        </tr>
                      );
                    })}

                  <tr className='hover:bg-gray-100 hover:cursor-pointer'>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>TOTAL</strong>
                    </td>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>{data?.totalLiability || ""}</strong>
                    </td>
                  </tr>

                  <h5 className='mt-2 mb-1 ml-2 font-semibold text-base'>
                    {" "}
                    Equity
                  </h5>

                  {data &&
                    data?.equity.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className='hover:bg-gray-100 hover:cursor-pointer'
                        >
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.subAccount}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.balance}
                          </td>
                        </tr>
                      );
                    })}

                  <tr className='hover:bg-gray-100 hover:cursor-pointer'>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      {" "}
                      <strong>TOTAL</strong>
                    </td>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>{data?.totalEquity || ""}</strong>
                    </td>
                  </tr>
                  <tr className='hover:bg-gray-100 hover:cursor-pointer'>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      {" "}
                      <strong>Total Liability and Equity</strong>
                    </td>
                    <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                      <strong>
                        {data?.totalEquity + data?.totalLiability || ""}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BalanceSheet;
