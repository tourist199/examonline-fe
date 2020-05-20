import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string, date } from 'yup'
import moment from 'moment'
import { actions } from '@/store/actions'
import { connect } from 'react-redux'
import Notification from '@/components/notification'
import Storage from '@/utils/storage'

import { Pagination, Checkbox, Select, DatePicker } from 'antd'
import Input from '@/components/input'
import Field from '@/components/field'
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
let children = [];
let tests = []


let dataSource = []


const columns = [
  {
    title: '#',
    dataIndex: '#',
    render: (text, record, index) => <span>{index + 1}</span>,
  },
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

const validationSchema = object().shape({
  title: string().required(),
  description: string().required()
})

@connect((state) => ({
  accountStore: state.account,
  testStore: state.test
}), {
  getStudents: actions.getStudents,
  getTests: actions.getTestsDone,
  insertExam: actions.insertExam
})
class CreateExam extends Component {
  componentDidMount() {
    this.props.getStudents()
    this.props.getTests(1)
  }

  state = {
    testId: '',
    timeStart: null,
    timeEnd: null,
    listStudent: []
  }

  _onSubmit = (values) => {
    let { testId, timeStart, timeEnd, listStudent } = this.state
    this.props.insertExam({ ...values, testId, timeStart, timeEnd, listStudent, createdBy: Storage.get('ID') }, (success, data) => {
      if (success)
        Notification.success('Create Exam Success')
    })
  }

  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <h1> Tạo kỳ thi </h1>
        <div className="create-exam">
          <Field
            form={form}
            inline
            size="middle"
            name="title"
            label="Tên kỳ thi"
            style={{ width: 500 }}
            component={Input}
          />
          <Button
            className="create-button"
            size="middle"
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
        <div className="create-exam">
          <Field
            form={form}
            inline
            size="middle"
            name="description"
            style={{ width: 500 }}
            label="Mô tả kỳ thi"
            component={Input}
          />
          <Button
            className="create-button"
            size="middle"
            htmlType="submit"
            type="primary"
            onClick={this.props.history.goBack}
          >
            Cancel
          </Button>
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
            value={[...this.state.listStudent]}
            onChange={(listStudent) => this.setState({ listStudent })}
          >
            {children}
          </Select>
        </div>
      </div>
    </Form>
  )

  render() {
    const initialValues = {
      title: '',
      description: ''
    }
    let listStudent = this.props.accountStore.listStudent
    let listTest = this.props.testStore.listTestDone

    tests = []
    listTest.forEach((item, index) => {
      tests.push(<Option key={index} value={item._id}>{item.title}</Option>)
    })

    dataSource = []

    listStudent.forEach(item => {
      console.log();
      
      if (this.state.listStudent.indexOf(item._id) >= 0)
        dataSource.push({
          email: item.email,
          name: item.name,
          birthday: moment(item.birthday).format('L'),
          gender: item.gender,
          address: item.address
        })
    })

    children = []
    listStudent.forEach((item, index) => {
      children.push(<Option key={index} value={item._id}>{item.email}</Option>);
    })

    return (
      <Page>
        <Container>
          <Content>
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this._onSubmit}
              component={this._renderForm}
            />
            <div className="table-box">
              <Table
                rowKey={(row, index) => index}
                dataSource={dataSource}
                columns={columns}
                scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
              />
              {/* <div className="pagination-box">
                <Pagination defaultCurrent={1} total={50} />
              </div> */}
            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default CreateExam
