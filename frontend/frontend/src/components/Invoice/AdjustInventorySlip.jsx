import { Button } from "antd";
import moment from "moment";
import React, { forwardRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getSetting } from "../../redux/rtk/features/setting/settingSlice";

const PrintToPdf = forwardRef(({ data, invoiceData }, ref) => {
  const total = data?.adjustInvoiceProduct.reduce((total, current) => {
    const qyt = current.adjustQuantity;
    const price = current.product?.productPurchasePrice;
    const adjustType = current.adjustType;
    const currentTotal = qyt * price;
    if (adjustType === "decrement") {
      return {
        ...total,
        increment: (total.increment || 0) + currentTotal,
      };
    } else {
      return {
        ...total,
        decrement: (total.decrement || 0) + currentTotal,
      };
    }
  }, {}) || { increment: 0, decrement: 0 };

  return (
    <>
      {data && (
        <div ref={ref} className='packg flex flex-col m-5 min-h-[29cm]'>
          <div className='flex-grow'>
            <div className='text-center'>
              <h1 className='text-2xl font-semibold'>
                {invoiceData?.companyName}
              </h1>
              <h3 className='text-base font-medium'>{invoiceData?.tagLine}</h3>
              <p>{invoiceData?.address}</p>
              <p>{invoiceData?.phone}</p>
              <p>Email: {invoiceData?.email}</p>
              <p>Website: {invoiceData?.website}</p>
            </div>

            <div className='p-2 text-center my-4'>
              <hr className='border-t border-dotted border-[#3f3f3f]' />
              <h3 className='center font-semibold'>Adjust Inventory Slip</h3>
              <hr className='border-t border-dotted border-[#3f3f3f]' />
            </div>

            <div className='flex justify-between gap-4 my-4'>
              <div className=''>
                <table className='table-auto w-full table2'>
                  <tbody>
                    <tr>
                      <td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
                        Adjusted By
                      </td>
                      <td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
                        {data.user?.username}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className=''>
                <table className='table-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='color-black p-2 text-left border-b border-dotted border-[#ddd] font-bold'>
                        Invoice No
                      </td>
                      <td className='color-black p-2 text-left border-b border-dotted border-[#ddd]'>
                        {data?.id}
                      </td>
                    </tr>
                    <tr>
                      <td className='color-black p-2 text-left border-b border-dotted border-[#ddd] font-bold'>
                        Invoice Date
                      </td>
                      <td className='color-black p-2 text-left border-b border-dotted border-[#ddd]'>
                        {moment(data?.date).format("YYYY-MM-DD")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className=''>
              <table className='table-auto w-full table1'>
                <thead>
                  <tr>
                    <th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                      Sl
                    </th>
                    <th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                      Product
                    </th>
                    <th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                      Price
                    </th>
                    <th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                      Increment QTY
                    </th>
                    <th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                      Decrement QTY
                    </th>
                    <th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.adjustInvoiceProduct.map((d) => (
                    <tr className='even:bg-gray-300 odd:bg-white' key={d.id}>
                      <td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                        {d.id}
                      </td>
                      <td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                        <p>{d.product?.name}</p>
                      </td>
                      <td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                        <p >{d.product?.productPurchasePrice}</p>
                      </td>

                      <td className='text-center p-[5px] border border-solid border-[#c0c0c0]'>
                        {d.adjustType === "increment" && d.adjustQuantity}
                      </td>
                      <td className='text-center p-[5px] border border-solid border-[#c0c0c0]'>
                        {d.adjustType === "decrement" && d.adjustQuantity}
                      </td>
                      <td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
                        {d.adjustType === "increment" && "+"}
                        {d.adjustType === "decrement" && "-"}
                        {d.adjustQuantity * d.product?.productPurchasePrice ||
                          0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-between'>
              <div>
                <table className='table-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
                        Note
                      </td>
                      <td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
                        {data?.note}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <table className='table-auto '>
                <tbody>
                  <tr>
                    <td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
                      Total Increment
                    </td>
                    <td className='color-black p-2 text-left border-b border-dotted border-[#ddd]'>
                      {total.increment || 0}
                    </td>
                  </tr>
                  <tr>
                    <td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
                      Total Decrement
                    </td>
                    <td className='color-black p-2 text-left border-b border-dotted border-[#ddd]'>
                      {total.decrement || 0}
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </div>
          </div>

          <div>
            <div className='flex justify-between gap-4 mb-5'>
              <div className='w-1/2'></div>

              <div className='w-1/2'>
                <hr className='border-dashed' />
                <p className='p-[5px]'>Authorized By</p>
              </div>
            </div>

            <div className='text-center'>
              <hr />
              <p>{invoiceData?.footer}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

PrintToPdf.displayName = "printToPdf";

const AdjustInventorySlip = ({ data }) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const invoiceData = useSelector((state) => state?.setting?.data) || null;

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  return (
    <div>
      <div className='hidden'>
        <PrintToPdf ref={componentRef} data={data} invoiceData={invoiceData} />
      </div>
      {invoiceData && (
        <Button type='primary' shape='round' onClick={handlePrint}>
          Print Slip
        </Button>
      )}
    </div>
  );
};

export default AdjustInventorySlip;
