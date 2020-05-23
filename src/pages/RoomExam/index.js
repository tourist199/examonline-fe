import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { CheckCircleTwoTone } from '@ant-design/icons'
import { Button } from 'antd';
import Container from '@/components/container'
import Storage from '@/utils/storage'
import Configs from '@/configs'
import openSocket from "socket.io-client"
import { connect } from 'react-redux'
import { actions } from '@/store/actions'

const API_URL = `${Configs.API_URL}`
const socket = openSocket(API_URL)

const Content = styled.div`
  .time-exam {
    display: flex;
    justify-content: space-evenly;
  }
  .student-information-all {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    
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
          <div className="student-exam">
            <h5> {item.studentId.name} </h5>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </div>
          <div className="button-exam" >
            <span> IP: 111012 </span>
            <Button type="primary" size="small"> Follow</Button>
          </div>
          <span> City: Quảng Nam <br /></span>
          <span> State: Quảng Nam <br /></span>
          <span> Tham gia: 20p trước</span>
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
            {
              this._showStudentItem(studentsInExam)
            }
          </div>
        </Content>
      </Container>
    )
  }
}
