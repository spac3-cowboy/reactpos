import { SolutionOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  clearCategory,
  deleteProductCategory,
  loadSingleProductCategory,
} from "../../redux/rtk/features/productCategory/productCategorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableNoPagination from "../CommonUi/TableNoPagination";
import Loader from "../loader/loader";
import UpdateProductCategory from "./updateProductCategory";

const DetailProductCategory = () => {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const category = useSelector((state) => state.productCategories.category);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/product-subcategory/${id}`}>{name}</Link>
      ),
    },
    {
      id: 3,
      title: "action",
      key: "action",
      render: ({ id }) => <ViewBtn path={`/admin/product-subcategory/${id}`} />,
    },
  ];

  useEffect(() => {
    dispatch(loadSingleProductCategory(id));
    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch, id]);

  const rightElement = (
    <>
      <h5 className='text-lg'>
        Products under <strong>{category?.name} </strong>
      </h5>
    </>
  );
  return (
    <div>
      <div className='mr-top'>
        {category ? (
          <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}
            key={category.id}
          >
            <div className='md:flex flex justify-between md:mb-8 items-center gap-2'>
              <h5 className='flex items-center'>
                <SolutionOutlined />
                <span className='mr-left'>
                  ID : {category.id} | {category.name}
                </span>
              </h5>
              <div className='flex items-center gap-2'>
                <CreateDrawer
                  permission={"update-productCategory"}
                  title={"Update Category"}
                  update
                  color={"bg-gray-700"}
                  width={30}
                >
                  <UpdateProductCategory category={category} />
                </CreateDrawer>
                <CommonDelete
                  permission={"delete-productCategory"}
                  deleteThunk={deleteProductCategory}
                  id={id}
                  className={"p-3"}
                  navigatePath={"/admin/product-category"}
                />
              </div>
            </div>
            <TableNoPagination
              list={category?.productSubCategory}
              columns={columns}
              csvFileName={"SubCategory"}
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

export default DetailProductCategory;
