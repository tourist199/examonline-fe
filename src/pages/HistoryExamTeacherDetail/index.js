import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { connect } from 'react-redux'
import { actions, TYPES } from '@/store/actions'
import moment from 'moment'

import { Pagination } from 'antd'
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
    width: 50,
    render: (text, record, index) => <span>{index + 1}</span>,
  },
  {
    title: 'Tên học viên',
    dataIndex: 'nameStudent',
    key: 'nameStudent'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    key: 'birthday'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip'
  },
  {
    title: 'Câu đã làm',
    dataIndex: 'numQuestionDid',
    key: 'numQuestionDid'
  },
  {
    title: 'Điểm',
    dataIndex: 'score',
    key: 'score'
  },
]

@connect((state) => ({
  examStore: state.exam
}), {
  getStudentsInExam: actions.getStudentsInExam,
  getExamById: actions.getExamById
})
class HistoryExamTeacher extends Component {

  componentDidMount() {
    this.props.getStudentsInExam(this.props.match.params.idExam)
    this.props.getExamById(this.props.match.params.idExam)
  }

  render() {
    console.log(this.props.examStore);

    dataSource = []
    this.props.examStore.studentsInExam.forEach((item => {
      dataSource.push({
        nameStudent: item.studentId.name,
        email: item.studentId.email,
        birthday: moment(item.studentId.birthday).format('L'),
        status: item.submit ? 'Đã nộp bài' : 'Chưa xác nhận nộp bài',
        ip: item.ip ? item.ip : '',
        numQuestionDid: item.listAnswer ? item.listAnswer.length : '',
        score: item.listAnswer ? (`${item.numQuestionDidCorrect ? Math.ceil((item.numQuestionDidCorrect / item.examId.testId.totalQuestion) * 100) : 0}`) : 0
      })
    }))

    return (
      <Page>
        <Container>
          <Content>
            <div className="field-group">
              <h1> Chi tiết kỳ thi </h1>
              <p style={{ fontSize: "large" }}>Tên kỳ thi: {this.props.examStore.editExam.exam && this.props.examStore.editExam.exam.title }</p>
              <p style={{ fontSize: "large" }}>
                Thời gian thi:  
                 {this.props.examStore.editExam.exam && moment(this.props.examStore.editExam.exam.timeStart).format('LLLL')} ->
                {this.props.examStore.editExam.exam && moment(this.props.examStore.editExam.exam.timeEnd).format('LLLL')}
              </p>
            </div>
            <div className="table-box">
              <Table
                rowKey={(row, index) => index}
                dataSource={dataSource}
                columns={columns}
                scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
                loading={this.props.examStore.submitting === TYPES.GET_EXAMS_BY_TEACHER_REQUEST}
              />

            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default HistoryExamTeacher
