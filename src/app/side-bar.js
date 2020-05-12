import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { withLocalize } from 'react-localize-redux'
import { push } from 'connected-react-router'
import Storage from '@/utils/storage'

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
    const userType = Storage.get('TYPE', 'STUDENT')

    return (
      <div style={!uiStore.isSideBarOpen ? { width: 300 } : null}>

        {userType == 'STUDENT' ? (
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={uiStore.isSideBarOpen}
          >
            <Menu.Item icon={<PieChartOutlined />} onClick={() => { historyPush('/') }}  >Trang chủ</Menu.Item>
            <Menu.Item icon={<DesktopOutlined />} onClick={() => { historyPush('/test-schedule') }} >Lịch thi </Menu.Item>
            <Menu.Item icon={<ContainerOutlined />} onClick={() => { historyPush('/student-information') }}>
              Thông tin cá nhân
              </Menu.Item>
            <Menu.Item icon={<ContainerOutlined />} onClick={() => { historyPush('/lichsuthi') }}>
              Lịch sử thi
              </Menu.Item>
          </Menu>
        ) : null}

        {userType == 'ADMIN' ? (
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={uiStore.isSideBarOpen}
          >
            <Menu.Item icon={<ContainerOutlined />} onClick={() => { historyPush('/quanlyde') }}>
              Admin Quản lý đề
              </Menu.Item>

            <SubMenu icon={<MailOutlined />} title="Quản lý sinh viên">
              <Menu.Item icon={<ContainerOutlined />} onClick={() => { historyPush('/new-user') }}>
                Tạo sinh viên
            </Menu.Item>
              <Menu.Item onClick={() => { historyPush('/list-user') }}>Danh sách người dùng</Menu.Item>
            </SubMenu>
          </Menu>
        ) : null}

        {userType == 'TEACHER' ? (
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={uiStore.isSideBarOpen}
          >
            <SubMenu icon={<MailOutlined />} title="Quản lý đề thi">
              <Menu.Item onClick={() => { historyPush('/taodethi') }}>Tạo đề thi</Menu.Item>
              <Menu.Item onClick={() => { historyPush('/xemdanhsach') }}>Xem danh sách</Menu.Item>
            </SubMenu>
            <SubMenu
              icon={<AppstoreOutlined />}
              title="Kỳ thi"
            >
              <Menu.Item onClick={() => { historyPush('/create-exam') }} >Tạo Kỳ thi</Menu.Item>
              <Menu.Item >Xem danh sách</Menu.Item>
            </SubMenu>
          </Menu>
        ) : null}

      </div >
    );
  }
}

export default SideBar
