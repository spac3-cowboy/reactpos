import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import moment from "moment";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearUser,
  deleteStaff,
  loadSingleStaff,
} from "../../redux/rtk/features/user/userSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import Loader from "../loader/loader";

const DetailStaff = () => {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users?.user?.data);

  useEffect(() => {
    dispatch(loadSingleStaff(id));
    return () => {
      dispatch(clearUser());
    };
  }, [id, dispatch]);

  return (
    <div>
      <div className='mr-top'>
        {user ? (
          <Fragment key={user?.id}>
            <Card bordered={false}>
              <div className='flex justify-between m-3'>
                <h5>
                  <SolutionOutlined />
                  <span className='mr-left'>
                    ID : {id} | {user?.username}
                  </span>
                </h5>
                <div className='flex items-center gap-2'>
                  <Link
                    className='m-2'
                    to={`/admin/hr/staffs/${id}/update`}
                    state={{ data: user }}
                  >
                    <Button
                      type='primary'
                      shape='round'
                      icon={<EditOutlined />}
                      size='small'
                    ></Button>
                  </Link>
                  <CommonDelete
                    deleteThunk={deleteStaff}
                    id={id}
                    navigatePath={"/admin/hr/staffs"}
                    permission={"delete-user"}
                    className={"p-3"}
                  />
                </div>
              </div>
              <div className='card-body m-3'>
                <p>
                  <Typography.Text strong>ID No :</Typography.Text> {user?.idNo}
                </p>
                <p>
                  <Typography.Text strong>RoleId :</Typography.Text>{" "}
                  {user?.roleId}
                </p>
                <p>
                  <Typography.Text strong>email :</Typography.Text>{" "}
                  {user?.email}
                </p>
                <p>
                  <Typography.Text strong>salary :</Typography.Text>{" "}
                  {user?.salary}
                </p>
                <p>
                  <Typography.Text strong>Designation ID :</Typography.Text>{" "}
                  {user?.designationId}
                </p>

                <p>
                  <Typography.Text strong>phone :</Typography.Text>{" "}
                  {user?.phone}
                </p>
                <p>
                  <Typography.Text strong>address :</Typography.Text>{" "}
                  {user?.address}
                </p>
                <p>
                  <Typography.Text strong>Blood Group :</Typography.Text>{" "}
                  {user?.bloodGroup}
                </p>

                <p>
                  <Typography.Text strong>Joining Date</Typography.Text>{" "}
                  {moment(user?.joinDate).format("YYYY-MM-DD")}
                </p>

                <p>
                  <Typography.Text strong>Leave Date</Typography.Text>{" "}
                  {moment(user?.leaveDate).format("YYYY-MM-DD")}
                </p>
              </div>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailStaff;
