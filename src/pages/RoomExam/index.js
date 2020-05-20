import React, { Component } from 'react'
import styled from 'styled-components'

import { CheckCircleTwoTone } from '@ant-design/icons'
import { Button } from 'antd';
import Container from '@/components/container'

const Content = styled.div`
  .time-exam {
    display: flex;
    justify-content: space-evenly;
  }
  .student-information-all {
    display: flex;
    justify-content: space-around;
    
    .student-information {
      padding: 20px;
      box-shadow: 0 12px 201px 0 rgba(0, 0, 0, 0.06);
      width: 250px;
      border-radius: 4px;
      background-color: white;
      
      .student-exam {
        display: flex;
        justify-content: space-between;
      }
      .button-exam {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  
`

export default class NotFound extends Component {
  render() {
    return (
      <Container className="not-found">
        <Content>
          <div>
            <h1> Phòng thi </h1>
          </div>
          <div>
            <h3> Tên kỳ thi: Code 2020</h3>
            <div className="time-exam"> 
              <span> Thời gian bắt đầu: 2h20p </span>
              <span> Thời gian kết thúc: 2h20p </span>
              <span> Thời gian còn lại: 2h20p </span>
            </div>
          </div>
          <div className="student-information-all">
            <div className="student-information">
              <div className="student-exam">
                <h5> Lê Tùng Khánh </h5>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </div>
              <div className="button-exam" >
                <span> IP: 111012 </span>
                <Button type="primary" size="small"> Follow</Button>
              </div>
              <span> City: Quảng Nam <br/></span> 
              <span> State: Quảng Nam <br/></span> 
              <span> Tham gia: 20p trước</span>
            </div>
            <div className="student-information">
              <div className="student-exam">
                <h5> Lê Tùng Khánh </h5>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </div>
              <div className="button-exam" >
                <span> IP: 111012 </span>
                <Button type="primary" size="small" > Follow</Button>
              </div>
              <span> City: Quảng Nam <br/></span> 
              <span> State: Quảng Nam <br/></span> 
              <span> Tham gia: 20p trước</span>
            </div>
            <div className="student-information">
              <div className="student-exam">
                <h5> Lê Tùng Khánh </h5>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </div>
              <div className="button-exam" >
                <span> IP: 111012 </span>
                <Button onClick={()=> this.props.history.push('/check-exam')} type="primary" size="small" > Follow</Button>
              </div>
              <span> City: Quảng Nam <br/></span> 
              <span> State: Quảng Nam <br/></span> 
              <span> Tham gia: 20p trước</span>
            </div>
          </div>
        </Content>
      </Container>
    )
  }
}
