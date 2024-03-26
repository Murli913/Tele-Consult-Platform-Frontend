import React from 'react'
import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
const SeniorDoctors = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);
  return (
    <Space size={20} direction="vertical">
    <Typography.Title level={4}>Senior Doctors</Typography.Title>
    <Button>Add Senior Doctor</Button>
    <Table
      loading={loading}
      columns={[
        {
          title: "Photo",
          dataIndex: "image",
          render: (link) => {
            return <Avatar src={link} />;
          },
        },
        {
          title: "Doctor id",
          dataIndex: "Patient id",
        },
        {
          title: "Doctor Name",
          dataIndex: "firstName",
        },
        
        {
          title: "Gender",
          dataIndex: "Gender",
        },
        {
          title: "Phone",
          dataIndex: "phone",
        },
        {
          title: "Edit",
          dataIndex: "update",
          render: (link) => {
            return <Button>Update </Button>;
          },

        },
        {
          title: "Danger",
          dataIndex: "Danger",
          render: (link) => {
            return <Button>Delete </Button>;
          },

        },

      ]}
      dataSource={dataSource}
      pagination={{
        pageSize: 5,
      }}
    ></Table>
  </Space>
  )
}

export default SeniorDoctors

