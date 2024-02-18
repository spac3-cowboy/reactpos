import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearDesignation,
  deleteDesignation,
  loadSingleDesignation,
} from "../../redux/rtk/features/designation/designationSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import Loader from "../loader/loader";
import UserListCard from "./List/UserListCard";
//PopUp

const DetailDesignation = () => {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const designation = useSelector((state) => state.designations.designation);
  
  useEffect(() => {
    dispatch(loadSingleDesignation(id));
    return () => {
      dispatch(clearDesignation());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div className='mr-top'>
        {designation ? (
          <Fragment key={designation.id}>
            <Card bordered={false} style={{}}>
              <div className='flex justify-between' style={{ padding: 0 }}>
                <div className='w-50'>
                  <h5 className='text-xl'>
                    <SolutionOutlined />
                    <span className='mr-left'>
                      ID : {designation.id} | {designation.name}
                    </span>
                  </h5>
                </div>
                <div className='flex items-center text-end w-50'>
                  <Link
                    className='mr-3 inline-block'
                    to={`/admin/designation/${designation.id}/update`}
                    state={{ data: designation }}
                  >
                    <Button
                      type='primary'
                      shape='round'
                      icon={<EditOutlined />}
                    ></Button>
                  </Link>
                  <CommonDelete
                    permission={"delete-designation"}
                    deleteThunk={deleteDesignation}
                    id={id}
                    navigatePath={"/admin/designation"}
                    className='p-3'
                  />
                </div>
              </div>

              <UserListCard list={designation?.user} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailDesignation;
