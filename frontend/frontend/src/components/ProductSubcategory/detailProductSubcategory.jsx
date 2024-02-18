import { DeleteOutlined, EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearSubCategory,
  deleteProductSubCategory,
  loadSingleProductSubCategory,
} from "../../redux/rtk/features/productSubCategory/productSubCategorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import Loader from "../loader/loader";
import GenerateBarcodePopUp from "../product/generateBarcodePopUp";
import CommonDelete from "../CommonUi/CommonDelete";
import TableNoPagination from "../CommonUi/TableNoPagination";
import UpdateProductCategory from "../productCategory/updateProductCategory";
import CreateDrawer from "../CommonUi/CreateDrawer";
import UpdateProductSubCategory from './updateProductSubcategory';


const DetailProductCategory = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const columns = [
    {
      id: 1,
      title: "Image",
      dataIndex: "thumbnailImageUrl",
      render: (thumbnailImageUrl) => (
        <img
          style={{ maxWidth: "40px" }}
          alt='product'
          src={thumbnailImageUrl}
        />
      ),
    },
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
      id: 5,
      title: "Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      id: 6,
      title: "Purchase price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
      responsive: ["md"],
    },
    {
      id: 7,
      title: "Sale price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
      responsive: ["md"],
    },
    {
      id: 8,
      title: "Unit Type",
      dataIndex: "unitType",
      key: "unitType",
    },

    {
      id: 9,
      title: "Reorder QTY",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
    },
    {
      id: 10,
      title: "Action",
      key: "action",
      render: ({ sku }, { id }) => (
        <div className='flex'>
          <ViewBtn path={`/admin/product/${id}`} />
          <GenerateBarcodePopUp sku={sku ? sku : 0} />
        </div>
      ),
    },
  ];

  //dispatch
  const dispatch = useDispatch();
  const subCategory = useSelector(
    (state) => state.productSubCategories?.subCategory
  );


  useEffect(() => {
    dispatch(loadSingleProductSubCategory(id));
    return () => {
      dispatch(clearSubCategory());
    };
  }, [dispatch, id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  const rightElement = (
    <>
      <h5 className='text-center mb-2 text-lg'>
        Products under <strong>{subCategory?.name} </strong>
      </h5>
    </>
  );
  return (
    <>
      <div className='mr-top'>
        {subCategory ? (
          <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}
            key={subCategory.id}

          >
            <div className='md:flex flex justify-between md:mb-8 items-center gap-2'>
              <h5 className='flex items-center'>
                <SolutionOutlined />
                <span className='mr-left'>
                  ID : {subCategory.id} | {subCategory.name}
                </span>
              </h5>
              <div className='flex items-center gap-2'>
                <CreateDrawer
                  permission={"update-productSubCategory"}
                  title={"Update SubCategory"}
                  update
                  color={"bg-gray-700"}
                  width={30}
                >
                  <UpdateProductSubCategory subcategory={subCategory} />
                </CreateDrawer>
                <CommonDelete
                  permission={"delete-productSubCategory"}
                  deleteThunk={deleteProductSubCategory}
                  id={subCategory.id}
                  className={"p-3"}
                  navigatePath={"/admin/product-subcategory"}
                />
              </div>
            </div>
            <TableNoPagination
              list={subCategory?.product}
              columns={columns}
              csvFileName={"SubCategory"}
              rightElement={rightElement}
            />
          </Card>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default DetailProductCategory;
