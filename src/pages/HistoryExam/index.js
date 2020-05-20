import React, { Component } from 'react'
import styled from 'styled-components'

import Page from '@/components/page'
import Container from '@/components/container'
import { Button, Badge } from 'antd';

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

export default class HistoryExam extends Component {
  render() {
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
                  <Button Button type="dashed" danger shape="circle"> 1</Button>
                </Badge>
                <Badge count={4} className="site-badge-count-4"> 
                  <Button Button type="dashed" danger shape="circle"> 2</Button>
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
