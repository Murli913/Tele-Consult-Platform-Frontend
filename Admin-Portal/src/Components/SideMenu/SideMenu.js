import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
      
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/",
          },
        
          {
            label: "Doctors",
            key: "/doctors",
            icon: <UserOutlined />,
          },
          {
            label: "Patients",
            key: "/patients",
            icon: <UserOutlined />,
          },
          {
            label: "Appointments",
            key: "/appoint",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  )
}

export default SideMenu