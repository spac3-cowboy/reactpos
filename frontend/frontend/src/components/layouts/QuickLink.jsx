import { AiOutlineSetting } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function QuickLink() {
  return (
    <div className='border rounded-lg'>
      <h1 className='text-[18px] dark:text-white font-semibold pt-2 pl-3'>
        Quick Link
      </h1>
      <div className='flex justify-center gap-5 my-5'>
        <Link
          to='/admin/sale'
          className='flex flex-col items-center justify-center w-[150px] py-4 rounded-lg cursor-pointer text-indigo-500 bg-indigo-500/10 hover:shadow'
        >
          <FaMoneyBillTrendUp size={25} />
          <p className='font-medium pt-[3px]'>CREATE SALE</p>
        </Link>
        <Link
          to='/admin/purchase'
          className='flex flex-col items-center justify-center w-[150px]  py-4 rounded-lg cursor-pointer text-[#8b5cf6] bg-[#8b5cf6]/10 hover:shadow'
        >
          <FaCartPlus size={25} />
          <p className='font-medium pt-[3px]'>CREATE PURCHASE</p>
        </Link>
        {/* <Link
          to='/admin/transaction/'
          className='flex flex-col justify-center items-center w-[150px] py-4 rounded-lg cursor-pointer text-[#2563eb] bg-[#2563eb]/10 hover:shadow'
        >
          <FaMoneyBillTransfer size={25} />
          <p className='font-medium pt-[3px] text-center'>CREATE TRANSACTION</p>
        </Link> */}
        <Link
          to='/admin/invoice-setting'
          className='flex flex-col justify-center items-center w-[150px] py-4 rounded-lg cursor-pointer text-[#5ad8a6] bg-[#5ad8a6]/10 hover:shadow'
        >
          <AiOutlineSetting size={25} />
          <p className='font-medium pt-[3px]'>SETTING</p>
        </Link>
      </div>
    </div>
  );
}
