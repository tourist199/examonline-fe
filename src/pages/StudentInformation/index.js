import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string, date } from 'yup'
import moment from 'moment';

import { Avatar, Select, DatePicker } from 'antd' 
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
  padding: 10px;
  .thongtinhocvien {
    padding-left: 60px;
  }
  .update-button {
    display: flex;
    justify-content: flex-end;
  }

`
const { Option } = Select
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const validationSchema = object().shape({
  email: string().required(),
  name: string().required(),
  gender: string().ensure(),
  birthday: date().nullable(),
  address: string().required(),
  phoneNumber: string().required(),
  cardID: string().required(),
})

class ThongTinCaNhan extends Component {
  state = {
    gender: 'female',
    birthday: moment('2015/1/1')
  }
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
            style={{ width: '250' }}
            form={form}
            inline
            label="Giới tính"
            component={() => (
              <Select style={{ width: 250 }}>
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
              </Select>
            )}
          />
          <Field
            style={{ width: '250' }}
            form={form}
            inline
            name="birthday"
            label="Ngày sinh"
            component={() => <DatePicker style={{ width: 250 }} format={dateFormatList} />}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            name="address"
            size="middle"
            label="Chỗ ở hiện tại"
            component={Input}
          />
          <Field
            style={{marginBottom: '10px', width: '250px'}}
            form={form}
            inline
            name="phoneNumber"
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
      birthday: '',
      address: '',
      phoneNumber: '',
      cardID: '',
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
