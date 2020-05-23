import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions } from '@/store/actions'
import axios from 'axios'
import Storage from '@/utils/storage'

import Page from '@/components/page'
import Container from '@/components/container'
import { Button, Badge, Row, Col } from 'antd';

import Configs from '@/configs'
import openSocket from "socket.io-client"

const API_URL = `${Configs.API_URL}`
const socket = openSocket(API_URL)


const Content = styled.div`
  .test-exam {
    display: flex;
    justify-content: space-evenly;
  }
  .question-exam {
    display: flex;
    justify-content: space-evenly;

    .button-changhe {
      display: flex;
      justify-content: center;
    }
  }
  .ant-col {
    
  }
  .ant-badge {
    margin:5px;
  }
  .border-margin-exam{
    border-radius: 5px;
    margin: 10px 10px;
    background: white;
    box-shadow: -1px 2px 5px 1px rgba(163,163,163,0.2);
    padding-bottom: 60px;
    .exam-margin{
      margin: 20px;
      .question-exam{
        justify-content: end;
        padding-top: 10px;
        font-style: oblique;
        font-size: 20px;
        font-weight: bold;
      }
      .img-exam{
        padding-bottom: 10px;
        text-align:center;
      }
    }
  }
  .button-answer{
    margin: 10px;
    
  }
  .button-changhe{
    padding-bottom: 20px;
    text-align: center;
    .btn-btn-changhe{
      margin:10px;
    }
  }
  .btn-btn-answer{
    width: -webkit-fill-available;
    text-align: left;
  }
  .title-exam{
    text-align: center;
    font-size:20px;
    font-weight:bold;
    color: #004c57b5;
  }
  .active-answer{

  }
`

@connect((state) => ({
  testIndex: state.test.editTest
}), {
  getTestById: actions.getTestById
})

export default class Exam extends Component {

  _emitJoinExam = () => {
    axios.get("http://geoplugin.net/json.gp").then(res => {
      const {
        geoplugin_request,
        geoplugin_countryCode,
        geoplugin_city,
        geoplugin_region,
        geoplugin_countryName
      } = res.data;

      const visitor = {
        ip: geoplugin_request,
        countryCode: geoplugin_countryCode,
        city: geoplugin_city,
        state: geoplugin_region,
        country: geoplugin_countryName,
        studentId: Storage.get('ID')
      };

      socket.emit("new_visitor", visitor);

      // socket.on("visitors", visitors => {
      //   this.setState({
      //     visitors: visitors
      //   });
      // });
    })
  }

  componentDidMount() {
    this.props.getTestById(this.props.match.params.idTest)

    this._emitJoinExam()

  }

  render() {
    console.log(this.props.testIndex);

    return (
      <Page>
        <Container>
          <Content>

            <Row>
              <Col span={8}><h3 className="title-exam"> Kỳ thi interview </h3> </Col>
              <Col span={16} style={{ textAlign: "center" }}> <span > Thời gian còn lại: 20h20p </span></Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className="border-margin-exam">
                  <div className="exam-margin" style={{ paddingTop: "15px" }}>
                    <Badge count={4} className="site-badge-count-4">
                      <Button type="dashed" danger shape="circle"> 1</Button>
                    </Badge>
                    <Badge count={4} className="site-badge-count-4">
                      <Button type="dashed" danger shape="circle"> 2</Button>
                    </Badge>

                  </div>
                </div>
              </Col>
              <Col span={16}>
                <div className="border-margin-exam">
                  <div className="exam-margin ">
                    <p className="question-exam"> Câu 1: What is you name?</p>
                    <div className="img-exam"><img src="https://thuthuat.taimienphi.vn/cf/Images/gl/2019/8/8/duong-dan-file-trong-html-.jpg"></img></div>
                    <div className="button-answer">
                      <div className="button-answer"> <Button className="btn-btn-answer" shape="round"> A. Đúng </Button> </div>
                      <div className="button-answer"> <Button className="btn-btn-answer" shape="round" > B. Sai </Button> </div>
                      <div className="button-answer"> <Button className="btn-btn-answer" shape="round" > C. Đúng or Sai </Button> </div>
                      <div className="button-changhe">
                        <Button className="btn-btn-changhe" type="primary" shape="round" > Previous </Button>
                        <Button className="btn-btn-changhe" type="primary" shape="round" > Next </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Content>
        </Container>
      </Page>
    )
  }
}
