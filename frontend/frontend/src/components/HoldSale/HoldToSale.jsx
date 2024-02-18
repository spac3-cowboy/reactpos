import { EditOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleHoldSale } from "../../redux/rtk/features/holdSale/holdSaleSlice";
import { loadAllVatTax } from "../../redux/rtk/features/vatTax/vatTaxSlice";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import Loader from "../loader/loader";
import AddSale from "./addSale";

export default function HoldToSale({ id }) {
  const dispatch = useDispatch();
  // Drawer state
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const { holdSale, loading } = useSelector((state) => state.holdSale);
  const { list: vatTaxList, loading: vatTaxLoading } = useSelector(
    (state) => state.vatTax
  );

  useEffect(() => {
    open && dispatch(loadSingleHoldSale(id));
  }, [dispatch, id, open]);
  useEffect(() => {
    dispatch(loadAllVatTax());
  }, [dispatch]);
  return (
    <>
      <UserPrivateComponent permission={"create-quote"}>
        <button
          onClick={() => setOpen(true)}
          className={`xs:px-3 px-1 text-sm md:text-base py-1 lg:px-5  border 
            bg-violet-700
           hover:bg-violet-500 text-white rounded cursor-pointer`}
        >
          <div className='flex items-center justify-center gap-2'>
            <EditOutlined />
          </div>
        </button>
        <Drawer
          width={window.innerWidth <= 768 ? "100%" : "80%"}
          title={`Create Sale`}
          placement='right'
          onClose={onClose}
          open={open}
        >
          <div className='px-5 pt-5'>
            {!loading && holdSale ? (
              <AddSale
                onClose={onClose}
                holdSale={holdSale}
                vatTaxList={vatTaxList}
                vatTaxLoading={vatTaxLoading}
              />
            ) : (
              <Loader />
            )}
          </div>
        </Drawer>
      </UserPrivateComponent>
    </>
  );
}
