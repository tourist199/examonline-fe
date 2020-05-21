import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { withLocalize } from 'react-localize-redux'
import { push } from 'connected-react-router'
import Storage from '@/utils/storage'

import sidebarEN from '@/languages/sidebar/en.json'
import sidebarVI from '@/languages/sidebar/vi.json'

import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  HomeOutlined,
  ScheduleOutlined,
  HistoryOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  UserOutlined,
  SolutionOutlined,
  FileProtectOutlined,
  TeamOutlined,
  HddOutlined
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

  componentDidMount() {
    const { addTranslationForLanguage } = this.props

    addTranslationForLanguage(sidebarEN, 'en')
    addTranslationForLanguage(sidebarVI, 'vi')
  }

  render() {
    const { translate } = this.props
    const { uiStore, historyPush } = this.props
    const userType = Storage.get('TYPE', 'STUDENT')

    return (
      <div style={!uiStore.isSideBarOpen ? { width: 250 } : null}>

        {userType == 'STUDENT' ? (
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={uiStore.isSideBarOpen}
          >
            <Menu.Item icon={<HomeOutlined />} onClick={() => { historyPush('/') }}  >{translate('sidebar.homePage')}</Menu.Item>
            <Menu.Item icon={<ScheduleOutlined />} onClick={() => { historyPush('/exam-schedule') }} >{translate('sidebar.studentTestSchedule')} </Menu.Item>
            <Menu.Item icon={<UserOutlined />} onClick={() => { historyPush('/student-information') }}>
            {translate('sidebar.personalInformation')}
              </Menu.Item>
            <Menu.Item icon={<HistoryOutlined />} onClick={() => { historyPush('/history-exam') }}>
            {translate('sidebar.historyExam')}
              </Menu.Item>
          </Menu>
        ) : null}

        {userType == 'ADMIN' ? (
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={uiStore.isSideBarOpen}
          >
            <Menu.Item icon={<FileProtectOutlined />} onClick={() => { historyPush('/test-manage') }}>
            {translate('sidebar.managesExam')}
              </Menu.Item>

            <SubMenu icon={<SolutionOutlined />} title={translate('sidebar.managementUser')}>
              <Menu.Item icon={<UserAddOutlined />} onClick={() => { historyPush('/new-user') }}>
              {translate('sidebar.createUser')}
            </Menu.Item>
              <Menu.Item icon={<TeamOutlined />} onClick={() => { historyPush('/list-user') }}>{translate('sidebar.listUser')}</Menu.Item>
            </SubMenu>
          </Menu>
        ) : null}

        {userType == 'TEACHER' ? (
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={uiStore.isSideBarOpen}
          >
            
            <SubMenu icon={<FileProtectOutlined />} title={translate('sidebar.administrationExam')}>
              <Menu.Item icon={<FileAddOutlined />} onClick={() => { historyPush('/new-test') }}>{translate('sidebar.createExam')}</Menu.Item>
              <Menu.Item icon={<UnorderedListOutlined />} onClick={() => { historyPush('/list-test') }}>{translate('sidebar.listExam')}</Menu.Item>
            </SubMenu>
            <SubMenu
              icon={<AppstoreOutlined />}
              title={translate('sidebar.listExam')}
            >
              <Menu.Item icon={<FileAddOutlined />} onClick={() => { historyPush('/create-exam') }} >{translate('sidebar.createTestExam')}</Menu.Item>
              <Menu.Item icon={<UnorderedListOutlined />} onClick={() => { historyPush('/list-exam') }}>{translate('sidebar.listTestExam')}</Menu.Item>
            </SubMenu>
            <Menu.Item icon={<HddOutlined />} onClick={() => { historyPush('/room-exam') }}>{translate('sidebar.roomExam')}</Menu.Item>

          </Menu>
        ) : null}

      </div >
    );
  }
}

export default SideBar
