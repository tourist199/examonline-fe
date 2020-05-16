import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import { object, string, date } from 'yup'
import moment from 'moment';
import { connect } from 'react-redux'
import { actions } from '@/store/actions'

import Input from '@/components/input'
import Field from '@/components/field'
import Button from '@/components/button'
import Page from '@/components/page'
import { DatePicker,Descriptions,Divider } from 'antd';
import { Select } from 'antd';
import Notification from '@/components/notification'
//upload
import { Row, Col } from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined,UploadOutlined, PlusOutlined } from '@ant-design/icons';
//

import Container from '@/components/container'
import { Dimensions } from '@/theme'

const { Option } = Select;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  padding: 10px;
  .capnhat {
    display: flex;
    justify-content: flex-end;
  }
  .ant-upload{
    border-radius: 50%;
  }
`
//upload
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
//

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
// upload
class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div> 
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload 
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100px',height:"104px",borderRadius:"50%"}} /> : uploadButton}
      </Upload>
    );
  }
}

//
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

@connect((state) => ({ //fix xoa sau
  accountStore: state.account
}), {
  register: actions.register
})

class CreateNewUser extends Component {
  state = {
    gender: 'male',
    type: 'STUDENT',
    birthday: moment('2015/1/1')
  }
  _onSubmit = (values) => {
    let user = { ...values, type: this.state.type, gender: this.state.gender, birthday: this.state.birthday }
    this.props.register(user, (success, data) => {
      console.log(success, data);

      if (success)
        Notification.success('Đăng ký thành công')
    })
  }
  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form" style={{marginTop:"-40px"}}>
      <div className="field-group">
        <h1 style={{textAlign: "center"}}> Tạo người dùng mới </h1>
        <Divider style={{borderColor:"#808080"}} />
        <div className="new-user">
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            name="email"
            label="Email"
            component={Input}
          />
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            name="password"
            label="Password"
            type="password"
            component={Input}
          />
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            name="name"
            label="Tên học viên"
            component={Input}
          /> 
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            label="Giới tính"
            component={() => (
              <Select value={this.state.gender} onChange={(gender) => this.setState({ gender })} style={{ width: 330 }}>
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
              </Select>
            )}
          />
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            name="birthday"
            label="Ngày sinh"
            component={() => <DatePicker value={this.state.birthday} style={{ width: 330 }} format={dateFormatList} onChange={(birthday => this.setState({ birthday }))} />}
          />
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            name="address"
            label="Địa chỉ"
            component={Input}
          />
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            name="phoneNumber"
            label="Số điện thoại"
            component={Input}
          />
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            name="cardId"
            label="CMND"
            component={Input}
          />
          <Field
            style={{ width: '330px' }}
            form={form}
            inline
            name="type"
            label="Loại người dùng"
            component={() => (
              <Select value={this.state.type} onChange={(type) => this.setState({ type })} style={{ width: 330 }}>
                <Option value="STUDENT">Học viên</Option>
                <Option value="TEACHER">Giáo viên</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>
            )}
          />


        </div>
      </div><Divider style={{borderColor:"#808080"}} />
      <div className="table-box">
        <div className="capnhat" style={{paddingBottom:"20px"}}>
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
          <Row>
              <Col span={15}><Formik className="form-tt"
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this._onSubmit}
              component={this._renderForm}
            /></Col>
             <Col span={6} offset={3}>
                <div style={{marginTop: "60px"}}>
              <Avatar />
              <p >Upload Avatar here....!</p>
            </div></Col>
          </Row>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default CreateNewUser
