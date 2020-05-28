import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import TimeLeft from '@/components/base/TimeLeft'

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
    padding: 15px;
    border-radius: 5px;
    width: 94%;
    background: #ebf4f0;
      
    margin: 10px 30px;

    .time-exam {
      display: flex;
      justify-content: space-evenly;
    }
    .student-information-all {
      display: flex;
      flex-wrap: wrap;
      box-shadow: -1px 2px 5px 1px rgba(163,163,163,0.2);
      margin: 30px;
      padding: 15px;
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
  getExamById: actions.getExamById
})
export default class RoomExam extends Component {

  _listenChangeStatusStudent = () => {
    socket.on("change_status_student", () => {

    })
  }

  componentDidMount() {

    // get list student in exam
    this.props.getStudentsInExam(this.props.match.params.idRoom)

    // Get info exam
    this.props.getExamById(this.props.match.params.idRoom)

    let room = {
      idRoom: this.props.match.params.idRoom,
      idTeacher: Storage.get('ID')
    }

    socket.on(`change_status_student_room_${this.props.match.params.idRoom}`, () => {
      this.props.getStudentsInExam(this.props.match.params.idRoom)
    });

    socket.on(`change_answer_student_room_${this.props.match.params.idRoom}`, () => {
      this.props.getStudentsInExam(this.props.match.params.idRoom)
    });

  }

  _showStudentItem = (list) => {

    return list.map((item, index) => {
      let totalQuestion = this.props.examStore.editExam.exam.testId.totalQuestion
      return (
        // <div className="student-information">
        //   <div className="student-information-join" key={index}>
        //     <div className="student-exam">
        //       <h5 style={{ marginRight: 50 }}> {item.studentId.name} </h5>
        //       {item.status === 'ONLINE' ? <CheckCircleTwoTone style={{ margin: 2 }} twoToneColor="#2ed34c" /> : <CheckCircleTwoTone style={{ margin: 2 }} twoToneColor="red" />}
        //     </div>
        //     <div className="button-exam" >
        //       {item.ip ? <span style={{ marginTop: 10 }}> IP: {item.ip} </span> : null}
        //       <img
        //         className="avatar"
        //         src="./../resources/images/avt.jpg"
        //         alt=""
        //       />
        //     </div>
        //     {item.city ? <p> City: {item.city}<br /> </p> : null}
        //     {item.state ? <p> State: {item.state}<br /> </p> : null}
        //     {item.numQuestionDidCorrect || item.numQuestionDidCorrect === 0 ? <p> Đúng: {item.numQuestionDidCorrect}<br /> </p> : null}
        //     {item.numQuestionDid || item.numQuestionDid === 0 ? <p> Làm: {item.numQuestionDid}<br /> </p> : null}
        //     <p> Tham gia: 20p trước</p>
        //     <Progress percent={60} successPercent={30} status="active" />
        //   </div>


        // </div>

        <div className="student-information" key={index}>
          <div className={item.submit ? "student-information-success" : "student-information-join"}>
            <div className="student-exam">
              <h5 style={{ marginRight: 50 }}> {item.studentId.name} </h5>
              {item.status === 'ONLINE' ?
                <CheckCircleTwoTone style={{ margin: 2 }} twoToneColor="#2ed34c" />
                :
                <CheckCircleTwoTone style={{ margin: 2 }} twoToneColor="red" />
              }
            </div>
            <div className="button-exam" >
              {item.ip ? <span style={{ marginTop: 10 }}> IP: {item.ip} </span> : <span style={{ marginTop: 10 }}> IP:  </span>}
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
            <Progress
              percent={item.numQuestionDid ? (item.numQuestionDid / totalQuestion) * 100 : 0}
              successPercent={item.numQuestionDid ? (item.numQuestionDidCorrect / totalQuestion) * 100 : 0} status="active"
            />
          </div>



        </div>


      )
    })
  }

  render() {
    let { studentsInExam, editExam } = this.props.examStore
    console.log(studentsInExam, editExam);

    return (
      <Container>
        <Content>
          <div>
            <h1 style={{ marginLeft: 30 }}> Phòng thi </h1>
          </div>
          <div className="room-exam">
            <div>
              <h3 style={{ marginTop: 20, marginLeft: 125 }} ><FileDoneOutlined /> Tên kỳ thi: {editExam.exam && editExam.exam.title}</h3>
            </div>
            <div>
              <div className="time-exam">

                <div>
                  <DashboardOutlined />
                  <span> Thời gian còn lại: <TimeLeft timeEnd={editExam.exam && editExam.exam.timeEnd} /> </span>
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
