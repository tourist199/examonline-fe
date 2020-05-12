import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { Pagination, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { actions } from '@/store/actions'
import moment from 'moment'

import Input from '@/components/input'
import Field from '@/components/field'
import Button from '@/components/button'
import Page from '@/components/page'
import Select from '@/components/select'
import Container from '@/components/container'
import Table from '@/components/table'
import { Dimensions } from '@/theme'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;

    
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

lodash.range(5).forEach(() => {
  dataSource.push({
    email: 'ltk1909@gmail.com',
    name: 'Lê Tùng Khánh',
    cardId: '206017036',
    gender: 'Nam',
    birthday: '2017/2/2',
    address: 'Quảng Nam',
    phoneNumber: '0969919088',
    createAt: '2/3/2020',
    action: <Button> Xóa </Button>
  })
})

const columns = [
  {
    title: '#',
    dataIndex: 'STT',
    render: (text, record, index) => <span>{index + 1}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
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
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
  }
]

@connect((state) => ({ //fix xoa sau
  accountStore: state.account
}), {
  getUsers: actions.getUsers
})
class ListUser extends Component {

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { listUser } = this.props.accountStore
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
        action: <Button> Xóa </Button>
      })
    })
    console.log(listUser);
    
    return (
      <Page>
        <Container>
          <Content>
            <div className="field-group">
              <h1> Danh sách sinh viên </h1>
            </div>
            <div className="table-box">
              <Table
                rowKey={(row, index) => index}
                dataSource={dataSource}
                columns={columns}
                scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px )` }}
              />
              <div className="pagination-box">
                <Pagination defaultCurrent={1} total={50} />
              </div>
            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default ListUser
