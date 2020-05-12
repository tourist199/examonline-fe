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
  .update-button {
    display: flex;
    justify-content: flex-end;
  }

`

const validationSchema = object().shape({
  email: string().required(),
  name: string().required(),
  gender: string().required(),
  date: string().required(),
  address: string().required(),
  phoneNumber: string().required(),
  cardID: string().required(),
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
            size="middle"
            name="email"
            label="Email"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            size="middle"
            name="name"
            label="Tên học viên"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            size="middle"
            label="Giới tính"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            size="middle"
            name="date"
            label="Nơi sinh"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="coht"
            size="middle"
            label="Chỗ ở hiện tại"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            className="sdt"
            size="middle"
            label="Số điện thoại"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            size="middle"
            name="cardID"
            label="CMND"
            component={Input}
          />

          
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            size="middle"
            name="truongDH_CD"
            label="Trường ĐH/CĐ"
            component={Input}
          />
          
        </div>
      </div>
      <div className="table-box">
        <div className="update-button">
          <Button
            size="middle"
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </div>
      </div>
    </Form>
  )

  render() {
    const initialValues = {
      email: '',
      name: '',
      gender: '',
      date: '',
      address: '',
      phoneNumber: '',
      cardID: '',
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
