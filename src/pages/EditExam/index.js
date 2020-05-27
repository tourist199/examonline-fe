import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import moment from 'moment'
import { actions } from '@/store/actions'
import { connect } from 'react-redux'
import Notification from '@/components/notification'
import Storage from '@/utils/storage'
import { PlusOutlined, CheckOutlined, PlusCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'

import { Pagination, Checkbox, Select, DatePicker, Input } from 'antd'
import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'
import Table from '@/components/table'
import { Dimensions } from '@/theme'


const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;

  .create-exam {
    display: flex;
    padding-bottom: 30px;

    .create-button {
      margin-left: 50px;
      margin-right: 50px;
    }
  }

  .combobox-exam {
    padding-bottom: 30px;
    display: flex;
  }
  .combobox-student {
    display: flex;
    padding-bottom: 30px;
  }
  .time-exam {
    display: flex;
    padding-bottom: 30px;
  }
  .button-exam {
    display: flex;
    justify-content: flex-end;
  }
    
  .table-box {
    height: 200px;
    
    .pagination-box {
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
  }
`
const { RangePicker } = DatePicker
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']
const { Option } = Select
let students = [];
let tests = []


let dataSource = []

const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Tên học viên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    key: 'birthday'
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Đia chỉ',
    dataIndex: 'address',
    key: 'address'
  }
]

@connect((state) => ({
  accountStore: state.account,
  testStore: state.test,
  editExam: state.exam.editExam
}), {
  getStudents: actions.getStudents,
  getTests: actions.getTestsDone,
  getExamById: actions.getExamById,
  updateExam: actions.updateExam
})
class EditExam extends Component {
  componentDidMount() {
    this.props.getStudents()
    this.props.getTests()
    this.props.getExamById(this.props.match.params.idExam)
  }

  state = {
    _id: '',
    testId: '',
    timeStart: null,
    timeEnd: null,
    title: '',
    description: '',
    listStudent: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.editExam && nextProps.editExam.exam && nextProps.editExam.exam._id !== prevState._id) {
      return {
        testId: nextProps.editExam.exam.testId._id,
        _id: nextProps.editExam.exam._id,
        timeStart: moment(nextProps.editExam.exam.timeStart),
        timeEnd: moment(nextProps.editExam.exam.timeEnd),
        title: nextProps.editExam.exam.title,
        description: nextProps.editExam.exam.description,
        listStudent: nextProps.editExam.listStudent.map(item => item.studentId)
      }
    }
    else return null;
  }


  _onSave = () => {
    let { testId, title, description, timeStart, timeEnd, listStudent, _id } = this.state
    this.props.updateExam({ _id, title, description, testId, timeStart, timeEnd, listStudent, createdBy: Storage.get('ID') }, (success, data) => {
      if (success)
        Notification.success('Update Exam Success')
    })
  }

  render() {
    const initialValues = {
      title: this.state.title,
      description: this.state.description
    }
    let listStudent = this.props.accountStore.listStudent
    let listTest = this.props.testStore.listTestDone

    tests = []
    listTest.forEach((item, index) => {
      tests.push(<Option key={index} value={item._id}>{item.title}</Option>)
    })

    dataSource = []

    listStudent.forEach(item => {
      if (this.state.listStudent.indexOf(item._id) >= 0)
        dataSource.push({
          email: item.email,
          name: item.name,
          birthday: moment(item.birthday).format('L'),
          gender: item.gender,
          address: item.address
        })
    })

    students = []
    listStudent.forEach((item) => {
      students.push(<Option key={item._id}>{item.email}</Option>);
    })

    return (
      <Page>
        <Container>
          <Content>
            <div className="field-group">
              <h1> Edit exam </h1>
              <div className="create-exam">
                <h3>Tên kỳ thi</h3>
                <Input
                  size="middle"
                  name="title"
                  label="Tên kỳ thi"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  style={{ width: 500, marginLeft: 80 }}
                />
              </div>
              <div className="create-exam">
                <h3>Mô tả kỳ thi</h3>
                <Input
                  size="middle"
                  name="description"
                  onChange={(e) => this.setState({ description: e.target.value })}
                  value={this.state.description}
                  style={{ width: 500, marginLeft: 65 }}
                  label="Mô tả kỳ thi"
                />

              </div>
              <div className="combobox-exam">
                <h3>Chọn bộ đề</h3>
                <Select
                  showSearch
                  style={{ width: 500, marginLeft: 65 }}
                  placeholder="Chọn đề thi"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(testId) => this.setState({ testId })}
                  value={this.state.testId}
                >
                  {tests}
                </Select>
              </div>
              <div className="time-exam">
                <h3>Thời gian thi</h3>

                <RangePicker
                  onChange={(time) => this.setState({ timeStart: time[0], timeEnd: time[1] })}
                  value={[this.state.timeStart, this.state.timeEnd]}
                  showTime={{ format: 'HH:mm' }}
                  style={{ marginLeft: 60, width: 500 }}
                />
              </div>
              <div className="combobox-student">
                <h3>Sinh viên</h3>
                <Select
                  mode="multiple"
                  style={{ width: 500, marginLeft: 85 }}
                  placeholder="Chọn sinh viên"
                  value={this.state.listStudent}
                  onChange={(listStudent) => this.setState({ listStudent })}
                >
                  {students}
                </Select>
              </div>
              <div className="button-exam">
                <Button type="primary" shape='round' onClick={this.props.history.goBack} ghost className="item-button" icon={<CloseCircleOutlined />}>
                  CANCEL
                </Button>
                <Button onClick={this._onSave} type="primary" className="item-button" shape='round' ghost icon={<PlusCircleOutlined />}>
                  Lưu
                </Button>
              </div>
            </div>
            <Table
              rowKey={(row, index) => index}
              dataSource={dataSource}
              columns={columns}
              scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
            />
          </Content>
        </Container>
      </Page >
    )
  }
}

export default EditExam
