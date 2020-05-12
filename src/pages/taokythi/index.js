import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { Pagination, Checkbox, Select } from 'antd'

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

  .new-roles {
    display: flex;
    padding-bottom: 30px;

    .add-role {
      margin-left: 50px;
      margin-right: 50px;
    }
  }

  .combobox {
    padding-bottom: 30px;
    display: flex;
  }
  .combobox-sinhvien {
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
const { Option } = Select
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

let dataSource = []

lodash.range(2).forEach(() => {
  dataSource.push({
    MaHocVien: 'MH1',
    TenHocVien: 'Test',
    NgaySinh: '26/06/2019',
    GioiTinh: 'Nam',
    DiaChi: 'Huế'
  })
})

const columns = [
  {
    title: 'Mã học viên',
    dataIndex: 'MaHocVien',
    key: 'MaHocVien'
  },
  {
    title: 'Tên học viên',
    dataIndex: 'TenHocVien',
    key: 'TenHocVien'
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'NgaySinh',
    key: 'NgaySinh'
  },
  {
    title: 'Giới tính',
    dataIndex: 'GioiTinh',
    key: 'GioiTinh'
  },
  {
    title: 'Đia chỉ',
    dataIndex: 'DiaChi',
    key: 'DiaChi'
  }
]

const validationSchema = object().shape({
  role: string().required(),
  newrole: string().required()
})

class TaoKyThi extends Component {
  _onSubmit = (values) => {
    console.log(values)
  }

  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <h1 style={{marginBottom: '20px'}}> Tạo kỳ thi </h1>
        <div className="new-roles">
          <Field
            form={form}
            inline
            size="middle"
            name="newrole"
            label="Tạo kỳ thi"
            component={Input}
          />
          <Button
            className="add-role"
            size="middle"
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
        <div className="new-roles">
          <Field
            form={form}
            inline
            size="middle"
            name="newrole"
            label="Mô tả kỳ thi"
            component={Input}
          />
          <Button
            className="add-role"
            size="middle"
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Cancel
          </Button>
        </div>
        <div className="combobox">
          <h3>Chọn bộ đề</h3>
          <Select
            showSearch
            style={{ width: 270, paddingLeft: 65}}
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="one">one</Option>
            <Option value="two">two</Option>
            <Option value="three">three</Option>
          </Select>
        </div>
        <div className="combobox-sinhvien">
        <h3>Sinh viên</h3>
          <Select
            mode="multiple"
            style={{ width: 288, paddingLeft: 85}}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
          >
            {children}
          </Select>
        </div>
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
    const initialValues = {
      role: '',
      newrole: ''
    }

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
          </Content>
        </Container>
      </Page>
    )
  }
}

export default TaoKyThi
