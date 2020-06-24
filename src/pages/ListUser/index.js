import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'

import { Pagination, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { actions, TYPES } from '@/store/actions'
import moment from 'moment'

import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Button from '@/components/button'
import Page from '@/components/page'
import Select from '@/components/select'
import Container from '@/components/container'
import Table from '@/components/table'
import { Dimensions } from '@/theme'
import Notification from '@/components/notification'


const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;

  .search-box {
    margin-left: 20px;
    width: 300px
  }

  .title-page {
    text-align: center
  }
    
  .table-box {
    height: 200px;
    margin: 20px;
    margin-bottom: 100px;
    
    .pagination-box {
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
  }
  .table-box1 {
    height: 200px;
    margin: 20px;
    
    
    .pagination-box {
      height: 100px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
  }
`
let dataSource = []

const columns = [
  {
    title: '#',
    dataIndex: 'STT',
    render: (text, record, index) => <span>{index + 1}</span>,
    width: 60,
    fixed: 'left'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 150
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'CMND',
    dataIndex: 'cardId',
    key: 'cardId'
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    key: 'birthday'
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Số ĐT',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createAt',
    key: 'createAt'
  },
  {
    title: 'Loại tài khoản',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    fixed: 'right'
  }
]

@connect((state) => ({
  accountStore: state.account
}), {
  getUsers: actions.getUsers,
  deleteUser: actions.deleteUser
})
class ListUser extends Component {

  componentDidMount() {
    this.props.getUsers({ page: 1 })
  }

  render() {
    const { listUser, total } = this.props.accountStore
    const { deleteUser, getUsers } = this.props

    console.log(this.props.accountStore);

    dataSource = []
    listUser.forEach(item => {
      dataSource.push({
        email: item.email,
        name: item.name,
        cardId: item.cardId,
        gender: item.gender,
        birthday: item.birthday && moment(item.birthday).format('L'),
        address: item.address,
        phoneNumber: item.phoneNumber,
        createAt: item.createAt && moment(item.createAt).format('L'),
        type: item.type,
        action: <Button onClick={() => {
          deleteUser(item._id, (success, data) => {
            if (success)
              getUsers()
            Notification.success('Deleted user')
          })
        }}> Xóa </Button>
      })
    })


    return (
      <Page>
        <Container>
          <Content>
            <div className="field-group title-page">
              <h1> Danh sách người dùng </h1>
            </div>
            <div className="search-box">
              <Input.Group compact>
                <Input.Search placeholder="Nhập tên người dùng cần tìm.." prefix={<UserOutlined />} />
                {/* <Input style={{ width: '30%' }} defaultValue="26888888" /> */}
              </Input.Group>

            </div>
            <div className="table-box">
              <Table
                rowKey={(row, index) => index}
                dataSource={dataSource}
                scroll={{ x: 1300 }}
                columns={columns}
                // scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px )` }}
                loading={this.props.accountStore.submitting === TYPES.GET_USERS_REQUEST}

              />
              <div className="pagination-box">
                <Pagination
                  defaultCurrent={1} pageSize={5} total={total} onChange={(page) => getUsers({ page })} />
              </div>
            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default ListUser
