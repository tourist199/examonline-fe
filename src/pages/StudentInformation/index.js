import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { Formik, Form } from 'formik'
import { object, string, date } from 'yup'
import moment from 'moment';
import Storage from '@/utils/storage'

import { Avatar, Select, DatePicker, Input } from 'antd' 
import Field from '@/components/field'
import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'
import Table from '@/components/table'
import { Dimensions } from '@/theme'

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
                position: relative;
                line-height: 10px;
                overflow: hidden;
                white-space: nowrap;

                .avatar-information {
                  background-color: #dfe1e6;
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
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

class ThongTinCaNhan extends Component {
  render() {
    const name = Storage.get('NAME','Name')

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
                      src="./../resources/images/avt.jpg"
                      alt=""
                    />
                  </div>
                  <div className="name">
                    <span>{name}</span>
                  </div>
                  <div className="email">
                    <span> @NguyenVanPhi </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-box">
              <div className="main-wrapper">
                <div className="main-wrapper-box">
                  <div className="main-img">
                    <img class="image" src="https://a.trellocdn.com/prgb/dist/images/member-home/taco-privacy.ced1e262c59e0225e3aa.svg" alt="" ></img>
                    <h1 className="information-name"> Thông tin cá nhân</h1>
                    <div className="table-box">
                      <div className="avatar-full">
                        <h3 className="avatar-name"> Ảnh đại diện</h3>
                        <div className="avatar-changhe">
                          <img
                            className="avatar-information"
                            src="./../resources/images/avt.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      
                      <form className="form-table">
                        <div class="form-text">
                          <span class="form-name">Tên học viên</span>
                        </div>
                        <div class="input-text">
                          <input class="input-name" name="full-name" autocomplete="name"></input>
                        </div>
                        <div class="form-text">
                          <span class="form-name">Giới tính</span>
                        </div>
                        <div class="input-text">
                          <input class="input-name" name="full-name" autocomplete="name"></input>
                        </div>
                        <div class="form-text">
                          <span class="form-name">Nơi sinh</span>
                        </div>
                        <div class="input-text">
                          <input class="input-name" name="full-name" autocomplete="name"></input>
                        </div>
                        <div class="form-text">
                          <span class="form-name">Chỗ ở hiện tại</span>
                        </div>
                        <div class="input-text">
                          <input class="input-name" name="full-name" autocomplete="name"></input>
                        </div>
                        <div class="form-text">
                          <span class="form-name">Số điện thoại</span>
                        </div>
                        <div class="input-text">
                          <input class="input-name" name="full-name" autocomplete="name"></input>
                        </div>
                        <div class="form-text">
                          <span class="form-name">CMND</span>
                        </div>
                        <div class="input-text">
                          <input class="input-name" name="full-name" autocomplete="name"></input>
                        </div>
                        <div class="form-text">
                          <span class="form-name">Email</span>
                        </div>
                        <div class="input-text">
                          <input class="input-name" name="full-name" autocomplete="name"></input>
                        </div>
                        <div className="button-save">
                          <Button type="primary" block> Lưu </Button>
                        </div>
                      </form>
                    </div>
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

export default ThongTinCaNhan
