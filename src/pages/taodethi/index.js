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

lodash.range(4).forEach(() => {
  dataSource.push({
    key: '1',
    STT: '1',
    TenBoDe: 'Trắc nghiệm',
    NgayTao: '22/12/1999',
    GiaoVien: 'Lê Tùng Khánh',
    Action: <Button> Xem </Button>
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
    dataIndex: 'TenBoDe',
    key: 'TenBoDe'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'NgayTao',
    key: 'NgayTao'
  },
  {
    title: 'Giáo viên',
    dataIndex: 'GiaoVien',
    key: 'GiaoVien'
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action'
  },
]

class Roles extends Component {
  _onSubmit = (values) => {
    console.log(values)
  }

  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <h1> Test </h1>
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

export default Roles
