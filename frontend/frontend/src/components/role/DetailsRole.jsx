import {
  DeleteOutlined,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Button, Card, Popover } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct } from "../../redux/rtk/features/product/productSlice";
import Loader from "../loader/loader";

import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import CustomTable from "./CustomTable";
import { loadSingleRole } from "./roleApis";

//PopUp

const DetailRole = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const [role, setRole] = useState(null);
  //Delete Supplier
  const onDelete = () => {
    try {
      dispatch(deleteProduct(id));

      setVisible(false);
      toast.warning(`role Name : ${role.rolename} is removed `);
      return navigate("/admin/dashboard");
    } catch (error) {
    }
  };
  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    loadSingleRole(id).then((d) => setRole(d.data));
  }, [id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <div>
      <div className='mr-top'>
        {role ? (
          <Fragment key={role.id}>
            <Card bordered={false} className='card-custom'>
              <div className='card-header d-flex justify-content-between '>
                <h5>
                  <SolutionOutlined />
                  <span className='mr-left'>
                    ID : {role.id} | {role.name}
                  </span>
                </h5>
                <div className='text-end'>
                  <UserPrivateComponent permission={"update-role"}>
                    <Link
                      className='m-2'
                      to={`/admin/role/permit/${role.id}`}
                      state={{ data: role }}
                    >
                      <Button
                        type='primary'
                        shape='round'
                        icon={<EditOutlined />}
                      >
                        {" "}
                        New Permission{" "}
                      </Button>
                    </Link>
                  </UserPrivateComponent>
                  <Popover
                    className='m-2'
                    content={
                      <a onClick={onDelete}>
                        <Button disabled={true} type='primary' danger>
                          Yes Please !
                        </Button>
                      </a>
                    }
                    title='Are you sure you want to delete ?'
                    trigger='click'
                    open={visible}
                    onOpenChange={handleVisibleChange}
                  >
                    <Button
                      disabled={true}
                      type='danger'
                      shape='round'
                      icon={<DeleteOutlined />}
                    ></Button>
                  </Popover>
                </div>
              </div>
              <CustomTable role={role?.rolePermission} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailRole;
