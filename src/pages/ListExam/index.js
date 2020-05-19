import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { connect } from 'react-redux'
import { actions } from '@/store/actions'
import moment from 'moment'

import { Pagination } from 'antd'
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
`
let dataSource = []


const columns = [
  {
    title: '#',
    dataIndex: '#',
    render: (text, record, index) => <span>{index + 1}</span>,
  },
  {
    title: 'Tên đề thi',
    dataIndex: 'titleExam',
    key: 'titleExam'
  },
  {
    title: 'Bộ đề thi',
    dataIndex: 'titleTest',
    key: 'titleTest'
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'timeStart',
    key: 'timeStart'
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'timeEnd',
    key: 'timeEnd'
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action'
  },
]

@connect((state) => ({
  examStore: state.exam,
}), {
  getExamsByTeacher: actions.getExamsByTeacher
})
class ListExam extends Component {
  _onSubmit = (values) => {
    console.log(values)
  }

  componentDidMount() {
    this.props.getExamsByTeacher(1)
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
    console.log(this.props.examStore.listExam);
    dataSource = []
    this.props.examStore.listExam.forEach((item => {
      dataSource.push({
        titleExam: item.title,
        titleTest: item.testId && item.testId.title,
        timeStart: moment(item.timeStart).format('LLL'),
        timeEnd: moment(item.timeEnd).format('LLL'),
        Action: <div> <Button> EDIT </Button> <Button> DELETE </Button></div>
      })
    }))

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

export default ListExam
