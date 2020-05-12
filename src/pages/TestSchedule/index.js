import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { Pagination, Checkbox } from 'antd'

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

lodash.range(3).forEach(() => {
  dataSource.push({
    key: '1',
    STT: '1',
    examName: 'Trắc nghiệm',
    startDay: '22/12/1999',
    endDay: '23/12/1999',
    status: 'Đang diễn ra',
    join: <Button> Vào thi</Button>
  })
})

const columns = [
  {
    title: '#',
    dataIndex: 'STT',
    render: (text, record, index) => <span>{index + 1}</span>,
    key: '#'
  },
  {
    title: 'Tên Kỳ Thi',
    dataIndex: 'examName',
    key: 'examName'
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startDay',
    key: 'startDay'
  },
  {
    title: 'Ngày Kết thúc',
    dataIndex: 'endDay',
    key: 'endDay'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Tham gia',
    dataIndex: 'join',
    key: 'join'
  },
]

let dataSource_1 = []

lodash.range(3).forEach(() => {
  dataSource_1.push({
    key: '1',
    STT: '1',
    ExamName: 'Trắc nghiệm',
    startDay: '22/12/1999',
    endD: '23/12/1999'
  })
})

const columns_1 = [
  {
    title: '#',
    dataIndex: 'STT',
    render: (text, record, index) => <span>{index + 1}</span>,
    key: '#'
  },
  {
    title: 'Tên Kỳ Thi',
    dataIndex: 'ExamName',
    key: 'ExamName'
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startDay',
    key: 'startDay'
  },
  {
    title: 'Ngày Kết thúc',
    dataIndex: 'endD',
    key: 'endD'
  }
]


class TestSchedule extends Component {
  _onSubmit = (values) => {
    console.log(values)
  }

  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <h1> Lịch Thi</h1>
      </div>
      <div className="table-box">
        <h3 style={{marginBottom: '15px'}}> Kỳ thi hiện tại</h3>
        <Table
          rowKey={(row, index) => index}
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
        />
      </div>
      <div className="table-box1">
        <h3 style={{marginBottom: '15px'}}> Kỳ thi đang diễn ra</h3>
        <Table
          rowKey={(row, index) => index}
          dataSource={dataSource_1}
          columns={columns_1}
          scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
        />
      </div>
    
    
    </Form>
  )

  render() {

    return (
      <Page>
        <Container>
          <Content>
            <Formik
              validateOnChange={false}
              validateOnBlur={false}  
              onSubmit={this._onSubmit}
              component={this._renderForm}
            />
          </Content>
        </Container>
      </Page>
    )
  }
}

export default TestSchedule
