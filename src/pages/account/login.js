import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { object, string } from 'yup'
import styled from 'styled-components'
import { withLocalize } from 'react-localize-redux'

import Request from '@/utils/request'
import Storage from '@/utils/storage'
import { Images } from '@/theme'
import { TYPES, actions } from '@/store/actions'
import Container from '@/components/container'
import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Field from '@/components/field'

import accountEN from '@/languages/account/en.json'
import accountVI from '@/languages/account/vi.json'

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .form {
    padding: 40px;
    box-shadow: 0 12px 201px 0 rgba(0, 0, 0, 0.06);
    width: 440px;
    border-radius: 4px;
    background-color: white;

    .logo {
      max-width: 300px;
      margin: 0 auto;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-bottom: 30px;
    }

    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: center;
    }

    .field-group {
      > * {
        margin-bottom: 9px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .action-box {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
`

const validationSchema = object().shape({
  email: string().required(),
  password: string().required()
})

@withLocalize
@connect((state) => ({
  accountStore: state.account
}), {
  login: actions.login
})

class Login extends Component {
  _onSubmit = (values) => {
    const { login, history } = this.props
    login(values, (success, data) => {
      if (success) {
        console.log(data);
        
        Storage.set('ACCESS_TOKEN', data.token)
        Storage.set('TYPE', data.type)
        Storage.set('NAME', data.name)
        Storage.set('ID', data._id)
        Storage.set('AVATAR', data.avatar)
        Request.setAccessToken(data.token)
        history.push('/')
      }
    })
  }

  componentDidMount() {
    const { addTranslationForLanguage } = this.props

    addTranslationForLanguage(accountEN, 'en')
    addTranslationForLanguage(accountVI, 'vi')
  }


  _renderForm = ({ handleSubmit, ...form }) => {
    const { accountStore } = this.props
    const { translate } = this.props

    return (
      <Form className="form">
        <img
          src={Images.LOGO}
          alt=""
          className="logo"
        />
        <p className="title">{translate('account.titleLogin')}</p>
        <div className="field-group">
          <Field
            form={form}
            name="email"
            label="Email"
            component={Input}
          />
          <Field
            form={form}
            name="password"
            label="Password"
            type="password"
            component={Input}
          />
        </div>
        <div className="action-box">
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            loading={accountStore.submitting === TYPES.LOGIN_REQUEST}
            onClick={handleSubmit}
          >
            {translate('account.buttonLogin')}
          </Button>
        </div>
      </Form>
    )
  }

  render() {
    const initialValues = {
      email: '',
      password: ''
    }

    return (
      <Page>
        <StyledContainer>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this._onSubmit}
            component={this._renderForm}
          />
        </StyledContainer>
      </Page>
    )
  }
}

export default Login
