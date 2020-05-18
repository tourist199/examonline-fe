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

lodash.range(4).forEach(() => {
  dataSource.push({
    nameExam: 'Trắc nghiệm',
    date: '22/12/1999',
    teacher: 'Lê Tùng Khánh',
    action: <Button> Xem </Button>
  })
})

const columns = [
  {
    title: '#',
    dataIndex: '#',
    render: (text, record, index) => <span>{index + 1}</span>,
    key: '#'
  },
  {
    title: 'Tên bộ đề',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createAt',
    key: 'createAt'
  },
  {
    title: 'Giáo viên',
    dataIndex: 'teacher',
    key: 'teacher'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
  },
]
@connect((state) => ({
  testStore: state.test
}), {
  getTestsWaiting: actions.getTestsWaitingAdmin,
})
class TestManage extends Component {
  _onSubmit = (values) => {
    console.log(values)
  }

  componentDidMount() {
    this.props.getTestsWaiting()
  }


  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <h1> Quản lý đề thi </h1>
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
    let lsTestWaiting = this.props.testStore.listTestWaiting;
    console.log(lsTestWaiting);
    
    dataSource = []
    lsTestWaiting.forEach(item => {
      dataSource.push({
        title: item.title,
        createAt: moment(item.createAt).format('LLL'),
        teacher: item.nameTeacher,
        action: <Button onClick= {()=>this.props.history.push('/watch-test/'+item._id)}> Xem </Button>
      })
    })


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

export default TestManage
