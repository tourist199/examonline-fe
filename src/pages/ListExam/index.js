import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { connect } from 'react-redux'
import { actions, TYPES } from '@/store/actions'
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
    this.props.getExamsByTeacher({ page: 1})
  }

  render() {
    const { total } = this.props.examStore
    console.log(this.props.examStore);
    
    const { getExamsByTeacher } = this.props
      
    dataSource = []
    this.props.examStore.listExam.forEach((item => {
      dataSource.push({
        titleExam: item.title,
        titleTest: item.testId && item.testId.title,
        timeStart: moment(item.timeStart).format('LLL'),
        timeEnd: moment(item.timeEnd).format('LLL'),
        Action: <div> 
                  <Button onClick= {()=>this.props.history.push('/edit-exam/'+item._id)}> EDIT </Button> 
                  <Button> DELETE </Button>
                </div>
      })
    }))

    return (
      <Page>
        <Container>
          <Content>
          <div className="field-group">
            <h1> Danh sách kỳ thi </h1>
          </div>
          <div className="table-box">
            <Table
              rowKey={(row, index) => index}
              dataSource={dataSource}
              columns={columns}
              scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
              loading={this.props.examStore.submitting === TYPES.GET_EXAMS_BY_TEACHER_REQUEST}
            />
            <div className="pagination-box">
              <Pagination defaultCurrent={1} pageSize={5} total={total} onChange={(page) => getExamsByTeacher({page})}  />
            </div>
          </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default ListExam
