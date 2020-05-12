import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string, date } from 'yup'
import moment from 'moment';
import { connect } from 'react-redux'
import { actions } from '@/store/actions'

import Input from '@/components/input'
import Field from '@/components/field'
import Button from '@/components/button'
import Page from '@/components/page'
import { DatePicker } from 'antd';
import { Select } from 'antd';

import Container from '@/components/container'
import { Dimensions } from '@/theme'

const { Option } = Select;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  padding: 10px;
  .new-user {
    padding-left: 60px;
  }
  .capnhat {
    display: flex;
    justify-content: flex-end;
  }

`

const validationSchema = object().shape({
  email: string().required(),
  password: string().required(),
  name: string().required(),
  gender: string().ensure(),
  birthday: date().nullable(),
  address: string().required(),
  phoneNumber: string().required(),
  cardId: string().required(),
  type: string().ensure()
})

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

@connect((state) => ({ //fix xoa sau
  accountStore: state.account
}), {
  register: actions.register
})

class CreateNewUser extends Component {
  state = {
    gender: 'female',
    type: 'STUDENT',
    birthday: moment('2015/1/1')
  }
  _onSubmit = (values) => {
    let user = { ...values, type: this.state.type, gender: this.state.gender, birthday: this.state.birthday }
    this.props.register(user)
  }

  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <h1 style={{ marginBottom: '20px' }}> Tạo người dùng mới </h1>
        <div className="new-user">
          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            name="email"
            label="Email"
            component={Input}
          />
          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            name="password"
            label="Password"
            type="password"
            component={Input}
          />
          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            name="name"
            label="Tên học viên"
            component={Input}
          />
          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            label="Giới tính"
            component={() => (
              <Select value={this.state.gender} onChange={(gender) => this.setState({ gender })} style={{ width: 250 }}>
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
              </Select>
            )}
          />

          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            name="birthday"
            label="Ngày sinh"
            component={() => <DatePicker value={this.state.birthday} style={{ width: 250 }} format={dateFormatList} onChange={(birthday => this.setState({ birthday }))} />}
          />
          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            name="address"
            label="Địa chỉ"
            component={Input}
          />
          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            name="phoneNumber"
            label="Số điện thoại"
            component={Input}
          />
          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            name="cardId"
            label="CMND"
            component={Input}
          />

          <Field
            style={{ width: '250px' }}
            form={form}
            inline
            name="type"
            label="Loại người dùng"
            component={() => (
              <Select value={this.state.type} onChange={(type) => this.setState({ type })} style={{ width: 250 }}>
                <Option value="STUDENT">Học viên</Option>
                <Option value="TEACHER">Giáo viên</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>
            )}
          />


        </div>
      </div>
      <div className="table-box">
        <div className="capnhat">
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </div>
    </Form>
  )

  render() {
    const initialValues = {
      email: '',
      password: '',
      name: '',
      gender: '',
      birthday: '',
      address: '',
      phoneNumber: '',
      cardId: ''
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

export default CreateNewUser
