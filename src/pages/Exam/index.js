import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions } from '@/store/actions'
import axios from 'axios'
import Storage from '@/utils/storage'

import Page from '@/components/page'
import Container from '@/components/container'
import { Button, Badge } from 'antd';

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
            <div className="test-exam">
              <h3> Kỳ thi interview </h3>
              <span> Thời gian còn lại: 20h20p </span>
            </div>
            <div className="question-exam">
              <div>
                <Badge count={4} className="site-badge-count-4">
                  <Button type="dashed" danger shape="circle"> 1</Button>
                </Badge>
                <Badge count={4} className="site-badge-count-4">
                  <Button type="dashed" danger shape="circle"> 2</Button>
                </Badge>

              </div>
              <div>
                <p> Câu 1: What is you name?</p>
                <img src="https://thuthuat.taimienphi.vn/cf/Images/gl/2019/8/8/duong-dan-file-trong-html-.jpg"></img>
                <div className="button-answer">
                  <div className="button-answer"> <Button type="primary" shape="round"  > A. Đúng </Button> </div>
                  <div className="button-answer"> <Button type="primary" shape="round" > B. Sai </Button> </div>
                  <div className="button-answer"> <Button type="primary" shape="round" > C. Đúng or Sai </Button> </div>
                  <div className="button-changhe">
                    <Button type="primary" shape="round" > Previous </Button>
                    <Button type="primary" shape="round" > Next </Button>
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
