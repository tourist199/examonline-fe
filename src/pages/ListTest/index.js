import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { Pagination, Checkbox } from 'antd'
import {connect} from 'react-redux'

import Input from '@/components/input'
import Field from '@/components/field'
import Button from '@/components/button'
import Page from '@/components/page'
import Select from '@/components/select'
import Container from '@/components/container'
import Table from '@/components/table'
import { Dimensions } from '@/theme'
import { actions } from '@/store/actions'

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
    key: '1',
    STT: '1',
    nameExam: 'Trắc nghiệm',
    date: '22/12/1999',
    status: 'Đã duyệt',
    Action: <Button> EDIT </Button>
  })
})

const columns = [
  {
    title: 'STT',
    dataIndex: 'STT',
    render: (text, record, index) => <span>{index + 1}</span>,
    key: 'STT'
  },
  {
    title: 'Tên bộ đề',
    dataIndex: 'nameExam',
    key: 'nameExam'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action'
  },
]

@connect((state) => ({
  accountStore: state.account
}), {
  getTests: actions.getTestsByTeacher,
  deleteUser: actions.deleteUser
})
class ListTest extends Component {
  _onSubmit = (values) => {
    console.log(values)
  }
  componentDidMount() {
    this.props.getTests(1)
  }
  

  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <h1> Danh sách đề thi </h1>
      </div>
      <div className="table-box">
        <Table
          rowKey={(row, index) => index}
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
        />
        <div className="pagination-box">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </Form>
  )

  render() {

    return (
      <Page>
        <Container>
          <Content>
            <Formik
              onSubmit={this._onSubmit}
              component={this._renderForm}
            />
          </Content>
        </Container>
      </Page>
    )
  }
}

export default ListTest
