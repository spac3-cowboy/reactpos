import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllProductSortList } from "../../redux/rtk/features/productSortList/ProductSortListSlice";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import TableComponent from "./TableComponent";

const GetAllList = () => {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector(
    (state) => state.productSortList
  );
  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };
  const columns = [
    {
      id: 2,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 3,
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      id: 4,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => <Link to={`/admin/product/${id}`}>{name}</Link>,
    },

    {
      id: 6,
      title: "QTY",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      id: 7,
      title: "Purchase price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
      responsive: ["md"],
    },
    {
      id: 8,
      title: "Sale price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
      responsive: ["md"],
    },

    {
      id: 12,
      title: "Reorder QTY",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
    },
    {
      id: 13,
      title: "Action",
      key: "action",
      render: ({ sku }, { id }) => (
        <div className='flex'>
          <ViewBtn path={`/admin/product/${id}`} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(loadAllProductSortList({}));
  }, [dispatch]);

  return (
    <Card
      className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
      bodyStyle={{ padding: 0 }}
    >
      <div className='lg:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Product Sort List</h1>
        <div className='flex gap-0  md:gap-5 items-center justify-between md:justify-start'></div>
      </div>
      <UserPrivateComponent permission={"readAll-reorderQuantity"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          csvFileName='Product Sort List'
          paginatedThunk={loadAllProductSortList}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllList;
