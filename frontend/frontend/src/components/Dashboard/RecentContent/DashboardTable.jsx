import { Card, Table } from "antd";
import { Link } from "react-router-dom";

export default function DashboardTable({
  loading,
  list,
  columns,
  title,
  slug,
}) {
  return (
    <>
      <Card
        className='overflow-hidden'
        headStyle={{
          padding: "0px 16px",
          borderBottom: "2px solid #e5e7eb",
        }}
        bodyStyle={{ padding: 0 }}
        style={{ height: 332 }}
        extra={
          <Link className='dark:text-white' to={`/admin/${slug}`}>
            View More
          </Link>
        }
        title={title}
        loading={loading}
      >
        <div className='recent'>
          <Table
            loading={loading}
            columns={columns}
            dataSource={list?.map((item) => ({ ...item, key: item.id }))}
            pagination={false}
            scroll={{ x: 800 }}
          ></Table>
        </div>
      </Card>
    </>
  );
}
