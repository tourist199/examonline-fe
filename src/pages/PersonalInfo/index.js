import React, { Component } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import { object, string, date } from 'yup'
import Storage from '@/utils/storage'
import axios from 'axios'
import callAPI from "@/utils/apiCaller";
import { connect } from 'react-redux'
import { actions } from '@/store/actions'
import moment from 'moment'


import Config from '@/configs'
import { Avatar, Select, DatePicker, Input } from 'antd'
import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'



const Content = styled.div`
  .header-box {
    background-color: #f4f5f7;

    .tabbe-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      max-width: 650px;
      position: relative;

      .user-box {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
    
        .avatar {
          background-color: #dfe1e6;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 20px;
        }
    
        .name {
          font-size: 24px;
          font-weight: 500;
          line-height: 28px;
          color: #0c3953;
          margin-right: 10px;
        }
    
        .email {
          font-size: 12px;
          line-height: 20px;
          color: #5e6c84;
          margin-top: 10px;
        }
      }
    }
  }
  
  .main-box {
    background: #fff;

    .main-wrapper {
      max-width: 1000px;

      .main-wrapper-box {

        .main-img {
          width: 100%;
          max-width: 530px;
          display: flex;
          flex-direction: column;
          margin: auto;

          .image {
            display: block;
            margin: 18px auto 42px;
            max-width: 100%;
            height: auto;
          }

          .information-name {
            padding-bottom: 5px;
            border: 1px solid #DFE1E8;
            border-top: 0;
            border-left: 0;
            border-right: 0;
          }

          .table-box {
            display: flex;
            justify-content: space-between;
            flex-direction: row-reverse;
            
            .avatar-full {
              align-items: center;
              display: flex;
              flex-direction: column;
              margin-right: 4px;
              margin-top: 16px;

              .avatar-name {
                font-size: 14px;
                margin-top: 16px;
                margin-top: 0;
                margin-bottom: 12px;
              }

              .avatar-changhe{
                border-radius: 50%;
                cursor: pointer;
                overflow: hidden;
                position: relative;

                .title-name {
                  position: relative;
                  line-height: 10px;
                  overflow: hidden;
                  white-space: nowrap;
                }

                .avatar-information {
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                }

                .input-none {
                  display: none;
                }

                .avatar-change {
                    font-weight: 400;
                    height: 100%;
                    line-height: 2.5em;
                    padding-bottom: 8px;
                    padding-top: 50%;
                    position: absolute;
                    top: 0;
                    opacity: 0;
                    
                  .avatar-change-img {
                    position: absolute;
                    top: 0;
                    right: 0;
                    min-width: 100%;
                    min-height: 100%;
                    font-size: 100px;
                    text-align: right;
                    opacity: 0;
                    outline: none;   
                    cursor: inherit;
                    display: block;
                  }

                  &:hover {
                    background: linear-gradient(0deg,rgba(0,0,0,.5) 50%,transparent 0);
                    border-radius: 0;
                    border: none;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 400;
                    height: 100%;
                    line-height: 2.5em;
                    margin: 0;
                    padding-bottom: 8px;
                    padding-top: 50%;
                    position: absolute;
                    text-decoration: underline;
                    top: 0;
                    opacity: 1;
                    
                  }
                }
              }
            }

            .form-table {
              display: flex;
              flex-direction: column;
              flex: 0 0 355px;

              .form-text {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 12px;
                margin-top: 0;

                .form-name {
                  color: #172b4d;
                  font-size: 14px;
                  font-weight: 600;
                  letter-spacing: -.003em;
                  line-height: 16px;
                  margin-top: 16px;
                  margin-top: 0;
                  padding-top: 16px;
                }
              }

              .input-text {
                background-color: rgb(250, 251, 252);
                box-sizing: border-box;
                color: rgb(23, 43, 77);
                display: flex;
                font-size: 14px;
                max-width: 100%;
                box-shadow: rgb(223, 225, 230) 0px 0px 0px 2px inset;
                line-height: 20px;
                max-height: 36px;
                border-radius: 3px;
                
                &:hover {
                  background-color: rgb(235, 236, 240);
                  box-sizing: border-box;
                  color: rgb(23, 43, 77);
                  display: flex;
                  font-size: 14px;
                  max-width: 100%;
                  box-shadow: rgb(223, 225, 230) 0px 0px 0px 2px inset;
                  line-height: 20px;
                  max-height: 36px;
                  border-radius: 3px;
                }
                
                &:focus {
                  background-color: rgb(235, 236, 240);
                  box-sizing: border-box;
                  color: rgb(23, 43, 77);
                  display: flex;
                  font-size: 14px;
                  max-width: 100%;
                  box-shadow: rgb(0, 121, 191) 0px 0px 0px 2px inset;
                  line-height: 20px;
                  max-height: 36px;
                  border-radius: 3px;
                }
                
                
                .input-name {
                  background-color: inherit;
                  box-shadow: inherit;
                  margin: unset;
                  transition: inherit;
                  padding: 8px 12px;
                  border-radius: inherit;
                  color: #172b4d;
                  outline: none;
                  border: none;
                  width: 100%;
                }
              }

              .button-save {
                margin-top: 30px;
              }
            }
          }

            
        }
          }
        }
      }
    }
  }
  
`
const { Option } = Select

@connect((state) => ({
  accountStore: state.account
}), {
  getInfo: actions.getInfo,
  changeInfoUser: actions.changeInfoUser
})
class PersonalInfo extends Component {
  state = {
    _id: '',
    address: '',
    avatar: '',
    birthday: '',
    cardId: '',
    email: '',
    gender: '',
    name: '',
    phoneNumber: ''
  }

  componentDidMount() {
    this.props.getInfo()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.accountStore.userInfo
      && nextProps.accountStore.userInfo._id
      && nextProps.accountStore.userInfo._id !== prevState._id
    ) {
      Storage.set('NAME', nextProps.accountStore.userInfo.name)
      return {
        _id: nextProps.accountStore.userInfo._id,
        address: nextProps.accountStore.userInfo.address,
        avatar: nextProps.accountStore.userInfo.avatar,
        birthday: nextProps.accountStore.userInfo.birthday,
        cardId: nextProps.accountStore.userInfo.cardId,
        email: nextProps.accountStore.userInfo.email,
        gender: nextProps.accountStore.userInfo.gender,
        name: nextProps.accountStore.userInfo.name,
        phoneNumber: nextProps.accountStore.userInfo.phoneNumber
      };
    }
    else return null;
  }

  _handleChange = (event) => {
    var formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    callAPI('users/update/' + Storage.get('ID'), 'POST', formData)
      .then(res => {
        if (res.data.success) {
          this.setState({ avatar: res.data.result.pathCurrent })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + event.target);
    event.preventDefault();
  }

  _onSubmitForm = () => {
    this.props.changeInfoUser(this.state, (success, data) => {
      if (success )
        alert('Update Success!')
    })
  }

  onChangeText = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const name = Storage.get('NAME', 'Name')

    let userInfo = this.props.accountStore.userInfo

    return (
      <Page>
        <Container>
          <Content>
            <div className="header-box">
              <div className="tabbe-box">
                <div className="user-box">
                  <div>
                    <img
                      className="avatar"
                      src={this.state.avatar ? `${Config.API_URL}/${this.state.avatar}` : "./../resources/images/avt.jpg"}
                      alt=""
                    />
                  </div>
                  <div className="name">
                    <span>{userInfo.name}</span>
                  </div>
                  <div className="email">
                    <span> {userInfo.email} </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-box">
              <div className="main-wrapper">
                <div className="main-wrapper-box">
                  <div className="main-img">

                    <form onSubmit={this.handleSubmit} encType="multipart/form-data" method="post">

                      <img className="image" src="https://a.trellocdn.com/prgb/dist/images/member-home/taco-privacy.ced1e262c59e0225e3aa.svg" alt="" ></img>
                      <h1 className="information-name"> Thông tin cá nhân</h1>
                      <div className="table-box">
                        <div className="avatar-full">
                          <h3 className="avatar-name"> Ảnh đại diện</h3>
                          <div className="avatar-changhe">
                            <div className="title-name" title={name}>
                              <span>
                                <img
                                  className="avatar-information"
                                  src={this.state.avatar ? `${Config.API_URL}/${this.state.avatar}` : "./../resources/images/avt.jpg"}
                                  alt=""
                                />
                              </span>
                            </div>

                            <span className="avatar-change">
                              Thay đổi ảnh đại diện <input type="file" name='avatar' onChange={this._handleChange} className="avatar-change-img" ></input>
                            </span>
                          </div>
                        </div>

                        <div className="form-table">
                          <div className="form-text">
                            <span className="form-name">Tên học viên</span>
                          </div>
                          <div className="input-text">
                            <Input value={this.state.name} name='name' onChange={this.onChangeText} />
                          </div>
                          <div className="form-text">
                            <span className="form-name">Ngày sinh</span>
                          </div>
                          <div className="input-text">
                            <DatePicker
                              style={{ width: 400 }}
                              value={moment(this.state.birthday)}
                              onChange={(e) => this.setState({ birthday: e })}
                            />
                          </div>
                          <div className="form-text">
                            <span className="form-name">Giới tính</span>
                          </div>
                          <div className="input-text">
                            <Select
                              style={{ width: 400 }}
                              optionFilterProp="children"
                              value={this.state.gender}
                              onChange={(e) => this.setState({ gender: e })}
                            >
                              <Option value="male">Nam</Option>
                              <Option value="female">Nữ</Option>
                            </Select>
                          </div>
                          <div className="form-text">
                            <span className="form-name">Địa chỉ</span>
                          </div>
                          <div className="input-text">
                            <Input value={this.state.address} name='address' onChange={this.onChangeText} />
                          </div>
                          <div className="form-text">
                            <span className="form-name">Số điện thoại</span>
                          </div>
                          <div className="input-text">
                            <Input value={this.state.phoneNumber} name='phoneNumber' onChange={this.onChangeText} />
                          </div>
                          <div className="form-text">
                            <span className="form-name">CMND</span>
                          </div>
                          <div className="input-text">
                            <Input value={this.state.cardId} name='cardId' onChange={this.onChangeText} />
                          </div>
                          {/* <div className="form-text">
                            <span className="form-name">Email</span>
                          </div>
                          <div className="input-text">
                            <Input value={this.state.email} name='email' onChange={this.onChangeText} />
                          </div> */}
                          <div className="button-save">
                            <Button type="primary" onClick={this._onSubmitForm} block> Lưu </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default PersonalInfo