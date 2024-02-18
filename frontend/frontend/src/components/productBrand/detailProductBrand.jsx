import { SolutionOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  clearBrand,
  deleteProductBrand,
  loadSingleProductBrand,
} from "../../redux/rtk/features/productBrand/productBrandSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableNoPagination from "../CommonUi/TableNoPagination";
import Loader from "../loader/loader";
import GenerateBarcodePopUp from "../product/generateBarcodePopUp";
import UpdateProductBrand from "./updateProductBrand";

const DetailProductBrand = () => {
  const columns = [
    {
      id: 1,
      title: "Image",
      dataIndex: "thumbnailImage",
      render: (thumbnailImage) => (
        <img style={{ maxWidth: "40px" }} alt='product' src={thumbnailImage} />
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
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.productBrands.brand);

  useEffect(() => {
    dispatch(loadSingleProductBrand(id));
    return () => {
      dispatch(clearBrand());
    };
  }, [dispatch, id]);

  const rightElement = (
    <>
      <h5 className='text-lg'>
        Products under <strong>{brand?.name} </strong>
      </h5>
    </>
  );
  return (
    <div>
      <div className='mr-top'>
        {brand ? (
          <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}
            key={brand.id}
          >
            <div className='md:flex flex justify-between md:mb-8 items-center gap-2'>
              <h5 className='flex items-center'>
                <SolutionOutlined />
                <span className='mr-left'>
                  ID : {brand.id} | {brand.name}
                </span>
              </h5>
              <div className='flex items-center gap-2'>
                <CreateDrawer
                  permission={"update-productBrand"}
                  title={"Update Brand"}
                  update
                  color={"bg-gray-700"}
                  width={30}
                >
                  <UpdateProductBrand brand={brand} />
                </CreateDrawer>
                <CommonDelete
                  permission={"delete-productBrand"}
                  deleteThunk={deleteProductBrand}
                  id={brand.id}
                  className={"p-3"}
                  navigatePath={"/admin/product-brand"}
                />
              </div>

            </div>
            <TableNoPagination
              list={brand?.product}
              columns={columns}
              csvFileName={"brand"}
              rightElement={rightElement}
            />
          </Card>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailProductBrand;
