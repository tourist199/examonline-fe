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
  padding: 30px;
  margin: 20px;

  .new-roles {
    display: flex;
    padding-bottom: 30px;

    .add-role {
      margin-left: 50px;
      margin-right: 50px;
    }
  }

  .combobox-roles {
    padding-bottom: 30px;
    
    .combobox-role {
      width: 225px;
    }
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
let dataSource = []

lodash.range(5).forEach(() => {
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
