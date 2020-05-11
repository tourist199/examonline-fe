import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { withLocalize } from 'react-localize-redux'
import { push } from 'connected-react-router'

import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;


import { Colors } from '@/theme'

// const Box = styled.div`
//   width: 0;
//   box-shadow: 4px 0 22px 0 rgba(0, 0, 0, 0.07);
//   overflow-y: auto;
//   overflow-x: hidden;
//   z-index: 1;
//   transition: width 0.5s;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;

//   &.open {
//     width: 300px;
//   }

//   .surfing-box {
//     width: 300px;

//     .menu {
//       display: flex;
//       flex-direction: column;
//       padding: 10px 0;

//       .menu-item {
//         padding: 15px;
//         color: black;
//         margin-bottom: 5px;
//         transition: background-color 0.2s;

//         &:hover {
//           background-color: ${({ theme }) => Colors.lighten(theme.primary, 67)};
//         }

//         &.active {
//           background-color: ${({ theme }) => Colors.lighten(theme.primary, 30)};
//           color: white;
//         }

//         &:last-child {
//           margin-bottom: 0;
//         }
//       }
//     }
//   }
// `

const MENU_ITEMS = [{
  link: '/',
  name: 'Home'
}, {
  link: '/settings',
  name: 'Settings'
}, {
  link: '/thongtincanhan',
  name: 'Thông Tin Cá Nhân'
}, {
  link: '/lichthi',
  name: 'Lịch Thi'
}, {
  link: '/lichsuthi',
  name: 'Lịch Sử Thi'
}, {
  link: '/dangxuat',
  name: 'Đăng Xuất'
}]

@withRouter
@withLocalize
@connect((state) => ({
  accountStore: state.account,
  uiStore: state.ui
}), {
  historyPush: push
})

class SideBar extends Component {
  render() {

    const { uiStore, historyPush } = this.props

    // return (
    //   <Box className={uiStore.isSideBarOpen ? 'open' : ''}>
    //     <div className="surfing-box">
    //       <div className="menu">
    //         {MENU_ITEMS.map((item, index) => (
    //           <NavLink
    //             exact
    //             key={index}
    //             to={item.link}
    //             className="menu-item"
    //           >
    //             {item.name}
    //           </NavLink>
    //         ))}
    //       </div>
    //     </div>
    //   </Box>
    // )

    return (
      <div style={!uiStore.isSideBarOpen ? { width: 300 } : null}>
        <Menu
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={uiStore.isSideBarOpen}
        >
          <Menu.Item icon={<PieChartOutlined />} onClick={() => { historyPush('/') }}  >Trang chủ</Menu.Item>

          <Menu.Item icon={<DesktopOutlined />} onClick={() => { historyPush('/lichthi') }} >
            Lịch thi
          </Menu.Item>
          <Menu.Item icon={<ContainerOutlined />} onClick={() => { historyPush('/thongtincanhan') }}>
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Item icon={<ContainerOutlined />} onClick={() => { historyPush('/lichsuthi') }}>
            Lịch sử thi
          </Menu.Item>

          <SubMenu icon={<MailOutlined />} title="Quản lý đề thi">
            <Menu.Item onClick={() => { historyPush('/thongtincanhan') }}>Tạo đề thi</Menu.Item>
            <Menu.Item onClick={() => { historyPush('/thongtincanhan') }}>Xem danh sách</Menu.Item>
          </SubMenu>
          <SubMenu
            icon={<AppstoreOutlined />}
            title="Kỳ thi"
          >
            <Menu.Item >Tạo kỳ thi</Menu.Item>
            <Menu.Item >Xem danh sách</Menu.Item>
          </SubMenu>
        </Menu>
      </div >
    );
  }
}

export default SideBar
