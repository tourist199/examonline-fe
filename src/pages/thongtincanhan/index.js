import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { Avatar } from 'antd'

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
  padding: 10px;
  .thongtinhocvien {
    padding-left: 60px;
  }
  .capnhat {
    display: flex;
    justify-content: flex-end;
  }

`

const validationSchema = object().shape({
  mahocvien: string().required(),
  tenhocvien: string().required(),
  gioitinh: string().required(),
  noisinh: string().required(),
  choohientai: string().required(),
  sodienthoai: string().required(),
  CMND: string().required(),
  Email: string().required(),
  truongDH_CD: string().required()
})

class ThongTinCaNhan extends Component {
  _onSubmit = (values) => {
    console.log(values)
  }

  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <h1 style={{marginBottom: '20px'}}> Thông tin học viên </h1>
        <div className="thongtinhocvien">
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="mahv"
            size="middle"
            name="mahocvien"
            label="Mã học viên"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="tenhv"
            size="middle"
            name="tenhocvien"
            label="Tên học viên"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="gioitinh"
            size="middle"
            name="gioitinh"
            label="Giới tính"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="noisinh"
            size="middle"
            name="noisinh"
            label="Nơi sinh"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="coht"
            size="middle"
            name="choohientai"
            label="Chỗ ở hiện tại"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="sdt"
            size="middle"
            name="sodienthoai"
            label="Số điện thoại"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="cmnd"
            size="middle"
            name="CMND"
            label="CMND"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="email"
            size="middle"
            name="Email"
            label="Email"
            component={Input}
          />
          
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="truong"
            size="middle"
            name="truongDH_CD"
            label="Trường ĐH/CĐ"
            component={Input}
          />
          
        </div>
      </div>
      <div className="table-box">
        <div className="capnhat">
          <Button
            size="middle"
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </Form>
  )

  render() {
    const initialValues = {
      mahocvien: '',
      tenhocvien: '',
      gioitinh: '',
      noisinh: '',
      choohientai: '',
      sodienthoai: '',
      CMND: '',
      Email: '',
      truongDH_CD: ''
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

export default ThongTinCaNhan
