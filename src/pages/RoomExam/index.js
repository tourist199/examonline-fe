import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { CheckCircleTwoTone, CloseCircleTwoTone, ClockCircleOutlined, FieldTimeOutlined, DashboardOutlined, CloseCircleOutlined, FileDoneOutlined } from '@ant-design/icons'
import { Button, Progress } from 'antd';
import Container from '@/components/container'
import Storage from '@/utils/storage'
import Configs from '@/configs'
import openSocket from "socket.io-client"
import { connect } from 'react-redux'
import { actions } from '@/store/actions'

const API_URL = `${Configs.API_URL}`
const socket = openSocket(API_URL)

const Content = styled.div`
  .room-exam {
    box-shadow: -1px 2px 5px 1px rgba(163,163,163,0.2);
    margin: 30px 90px;
    padding: 15px;
    border-radius: 5px;
    width: 1050px;
    background: #f2f7f7;
      
    margin: 10px 30px;

    .time-exam {
      display: flex;
      justify-content: space-evenly;
    }
    .student-information-all {
      display: flex;
      flex-wrap: wrap;
      box-shadow: -1px 2px 5px 1px rgba(163,163,163,0.2);
      margin: 30px 90px;
      padding: 15px;
      width: 850px;
      border-radius: 5px;
      background: whitesmoke;
      
      .student-information {
        display: flex;
  
        .student-information-join {
          margin: 5px 5px;
          padding: 15px;
          box-shadow: -1px 2px 5px 1px rgba(163,163,163,0.2);
          width: 220px;
          border-width: 1px;
          border-radius: 20px;
          border-style: solid;
          background: white;
    
          .student-exam {
            display: flex;
          }
          .button-exam {
            display: flex;
            justify-content: space-between;
    
            .avatar {
              background-color: #dfe1e6;
              width: 45px;
              height: 45px;
              border-radius: 50%;
            }
          }
        }
  
        .student-information-success {
          margin: 5px 5px;
          padding: 15px;
          box-shadow: -1px 2px 5px 1px rgba(163,163,163,0.2);
          width: 220px;
          border-radius: 20px;
          border-width: 1px;
          border-style: dotted;
          background-color: white;
          background: #cdf0f7;
    
          .student-exam {
            display: flex;
          }
          .button-exam {
            display: flex;
            justify-content: space-between;
    
            .avatar {
              background-color: #dfe1e6;
              width: 45px;
              height: 45px;
              border-radius: 50%;
            }
          }
        }  
      }
    }
  }
  
`

@connect((state) => ({
  examStore: state.exam
}), {
  getStudentsInExam: actions.getStudentsInExam,
})
export default class RoomExam extends Component {
  componentDidMount() {
    this.props.getStudentsInExam(this.props.match.params.idRoom);

    axios.get("http://geoplugin.net/json.gp").then(res => {
      // const {
      //   geoplugin_request,
      //   geoplugin_countryCode,
      //   geoplugin_city,
      //   geoplugin_region,
      //   geoplugin_countryName
      // } = res.data;

      // const visitor = {
      //   ip: geoplugin_request,
      //   countryCode: geoplugin_countryCode,
      //   city: geoplugin_city,
      //   state: geoplugin_region,
      //   country: geoplugin_countryName,
      //   studentId: Storage.get('ID')
      // };
      
      let room = {
        idRoom: this.props.match.params.idRoom,
        idTeacher: Storage.get('ID')
      }

      socket.emit("send_request_status_students_in_room", room);

      socket.on("get_status_students_in_room", visitors => {
        this.setState({
          visitors: visitors
        });
      });
      
    })
  }

  _showStudentItem = (list) => {
    return list.map((item, index) => {
      return (
        <div className="student-information" key={index}>
          <div className="student-information-join">
            <div className="student-exam">
              <h5 style={{ marginRight: 50 }}> {item.studentId.name} </h5>
              <CheckCircleTwoTone style={{ margin: 2 }} twoToneColor="#2ed34c" />
            </div>
            <div className="button-exam" >
              <span style={{ marginTop: 10 }}> IP: 111012 </span>
              <img
                className="avatar"
                src="./../resources/images/avt.jpg"
                alt=""
              />
            </div>
            <div>
              <span> City: Quảng Nam </span>
            </div>
            <div style={{ marginTop: 12 }}>
              <span> State: Quảng Nam </span>
            </div>
            <div style={{ marginTop: 12, marginBottom: 15 }}> 
              <span> Tham gia: 20p trước </span>
            </div>
            <Progress percent={60} successPercent={30} status="active" />
        </div>
        
          <div className="student-information-success">
              <div className="student-exam">
                <h5 style={{ marginRight: 50 }}> {item.studentId.name} </h5>
                <CloseCircleTwoTone  style={{ margin: 2 }} twoToneColor="#ff0000" />
              </div>
              <div className="button-exam" >
                <span style={{ marginTop: 10 }}> IP: 111012 </span>
                <img
                  className="avatar"
                  src="./../resources/images/avt.jpg"
                  alt=""
                />
              </div>
              <div>
                <span> City: Quảng Nam </span>
              </div>
              <div style={{ marginTop: 12 }}>
                <span> State: Quảng Nam </span>
              </div>
              <div style={{ marginTop: 12, marginBottom: 15 }}> 
                <span> Đã hoàn thành </span>
              </div>
              <Progress percent={100} status="active" />
          </div>
        
        </div>
      )
    })
  }

  render() {
    let { studentsInExam } = this.props.examStore
    console.log(studentsInExam)


    return (
      <Container className="not-found">
        <Content>
          <div>
            <h1 style={{ marginLeft: 30 }}> Phòng thi </h1>
          </div>
          <div className="room-exam">
            <div>
              <h3 style={{ marginTop: 20, marginLeft: 125 }} ><FileDoneOutlined /> Tên kỳ thi: Code 2020</h3>
            </div>
            <div>
              <div className="time-exam">
                <div>
                  <ClockCircleOutlined />
                  <span> Thời gian bắt đầu: 2h20p </span>
                </div>
                <div>
                  <FieldTimeOutlined />
                  <span> Thời gian kết thúc: 2h20p </span>
                </div>
                <div>
                  <DashboardOutlined />
                  <span> Thời gian còn lại: 2h20p </span>
                </div>  
              </div>
              <div className="student-information-all">
                {
                  this._showStudentItem(studentsInExam)
                }
              </div>
              <Button type="primary" shape='round' onClick={this.props.history.goBack} ghost className="item-button" icon={<CloseCircleOutlined />}>
                CANCEL
              </Button>
            </div>
          </div>
        </Content>
      </Container>
    )
  }
}
