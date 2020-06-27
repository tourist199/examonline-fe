import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions } from '@/store/actions'
import axios from 'axios'
import Storage from '@/utils/storage'

import Page from '@/components/page'
import Container from '@/components/container'
import { Button, Badge, Row, Col } from 'antd';
import TimeLeft from '@/components/base/TimeLeft'
import Notification from '@/components/notification'

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
        img {
          width: 100%
        }
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
  .image-question {
    width: 100%;
    max-height: 350px;
    width: auto;
  }
`

@connect((state) => ({
  testIndex: state.test.editTest,
  listAnswerOfStudent: state.exam.listAnswerOfStudent,
  examIndex: state.exam.examIndex
}), {
  getTestById: actions.getTestById,
  getInfoExamByStudent: actions.getInfoExamByStudent,
  studentSubmitExam: actions.studentSubmitExam,
  getExamById: actions.getExamById
})

export default class Exam extends Component {

  state = {
    _id: '',
    title: '',
    listQuestion: [],
    listAnswer: [],
    questionIndex: 0,
    timeLeft: '',
    timeOut: false,
    timeEnd: ''
  }

  _emitJoinExam = () => {
    axios.get("http://geoplugin.net/json.gp").then(res => {
      const {
        geoplugin_request,
        geoplugin_countryCode,
        geoplugin_city,
        geoplugin_region,
        geoplugin_countryName
      } = res.data;

      const data = {
        ip: geoplugin_request,
        countryCode: geoplugin_countryCode,
        city: geoplugin_city,
        state: geoplugin_region,
        country: geoplugin_countryName,
        studentId: Storage.get('ID'),
        examId: this.props.match.params.idExam,
        status: 'ONLINE'
      };

      socket.emit("student_join", data);
    })
  }

  _setTimeOutExam = () => {
    this.setState({ timeOut: true })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);

    if (nextProps.examIndex && nextProps.examIndex.timeEnd && nextProps.examIndex.timeEnd !== prevState.timeEnd) {
      return {
        timeEnd: nextProps.examIndex.timeEnd
      };
    }
    if (nextProps.testIndex && nextProps.testIndex.test && nextProps.testIndex.test._id !== prevState._id) {
      return {
        _id: nextProps.testIndex.test._id,
        title: nextProps.testIndex.test.title,
        listQuestion: nextProps.testIndex.listQuestion,
      };
    }
    else if (prevState.listAnswer.length === 0) {
      return {
        listAnswer: nextProps.listAnswerOfStudent ? nextProps.listAnswerOfStudent : []
      };
    }
    else return null;
  }

  componentDidMount() {
    /**
     * get info test and question
     */
    this.props.getTestById(this.props.match.params.idTest)

    /**
     * get answer of student
     */
    this.props.getInfoExamByStudent(this.props.match.params.idExam)


    /**
     * Send signal join exam
     */
    this._emitJoinExam()

    /**
     * get info exam
     */
    this.props.getExamById(this.props.match.params.idExam)

    socket.on(`update_test_student`, () => {
      console.log('chay dc');
      
      this.props.getTestById(this.props.match.params.idTest)
      this.props.getInfoExamByStudent(this.props.match.params.idExam)
      this.props.getExamById(this.props.match.params.idExam)
    });

  }

  _showBtnQuestion = () => {
    if (this.state.listQuestion)
      return this.state.listQuestion.map((item, index) => {
        let chose = this.state.listAnswer.find(ele => ele.idQuestion === item._id)
        return (
          <Badge
            count={chose ? String.fromCharCode(+chose.selected + 65) : ''}
            key={index}
            className="site-badge-count-4"
          >
            <Button type={index === this.state.questionIndex ? "" : "dashed"} danger shape="circle" onClick={() => { this.setState({ questionIndex: index }) }} >{index + 1}</Button>
          </Badge>
        )
      })
    return null
  }

  _showAnswers = () => {
    if (
      this.state.listQuestion &&
      this.state.listQuestion[this.state.questionIndex] &&
      this.state.listQuestion[this.state.questionIndex].answers
    ) {
      let item = this.state.listQuestion[this.state.questionIndex]
      let chose = this.state.listAnswer.find(ele => ele.idQuestion === item._id)

      return this.state.listQuestion[this.state.questionIndex].answers.map((contentAns, index) => {
        return (
          <div className="button-answer" key={index}>
            <Button
              className="btn-btn-answer"
              shape="round"
              danger={chose && chose.selected == index}
              onClick={() => {
                let listAnswer = [
                  ...this.state.listAnswer.filter(x => x.idQuestion !== item._id),
                  { idQuestion: item._id, selected: index }
                ]

                let numQuestionDidCorrect = 0;
                listAnswer.forEach((item => {
                  let temp = this.state.listQuestion.find(el => el._id === item.idQuestion)
                  if (temp && +temp.result === +item.selected)
                    numQuestionDidCorrect++
                }))

                this.setState({
                  listAnswer,
                  numQuestionDidCorrect
                })
                console.log(listAnswer, numQuestionDidCorrect);

                socket.emit('change_answer_student', {
                  studentId: Storage.get('ID'),
                  examId: this.props.match.params.idExam,
                  listAnswer,
                  numQuestionDidCorrect
                })


              }}
            >
              {`${String.fromCharCode(65 + index)}. ${contentAns} `}
            </Button>
          </div>
        )
      })
    }

    else
      return null
  }

  _onSubmit = () => {
    this.props.studentSubmitExam(
      {
        examId: this.props.match.params.idExam
      },
      (success, data) => {
        if (success) {
          Notification.success("Submit Exam Success")
          socket.emit('submit_exam', {
            examId: this.props.match.params.idExam
          })
          setTimeout(() => {
            this.props.history.goBack()
          }, 1000);
        }
      }
    )
  }

  componentWillUnmount() {
    console.log('leave room');

    socket.emit("leave_room");

  }

  render() {
    console.log(this.state.timeEnd);

    return (
      <Page>
        <Container>
          <Content>
            {
              this.state.timeOut ?
                (<div>Đã hết thời gian làm bài !!!</div>)
                :
                (
                  <React.Fragment>
                    <Row>
                      <Col span={8}><h3 className="title-exam"> {this.props.examIndex.title} </h3> </Col>
                      <Col span={16} style={{ textAlign: "center" }}> <span > Thời gian còn lại: <TimeLeft timeEnd={this.state.timeEnd} cb={this._setTimeOutExam} /> </span></Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <div className="border-margin-exam">
                          <div className="exam-margin" style={{ paddingTop: "15px" }}>
                            {this._showBtnQuestion()}
                          </div>
                        </div>
                        <div>
                          <Button onClick={this._onSubmit} >Nộp bài</Button>
                        </div>
                      </Col>
                      <Col span={16}>
                        <div className="border-margin-exam">
                          <div className="exam-margin ">
                            <p className="question-exam"> Câu {`${this.state.questionIndex + 1} : ${this.state.listQuestion[this.state.questionIndex] && this.state.listQuestion[this.state.questionIndex].title || ''}`} </p>
                            <div className="img-exam">
                              {
                                this.state.listQuestion[this.state.questionIndex] && this.state.listQuestion[this.state.questionIndex].image ?
                                  (
                                    <img
                                      className="image-question"
                                      src={this.state.listQuestion[this.state.questionIndex].image ? `${Configs.API_URL}/${this.state.listQuestion[this.state.questionIndex].image}` : "./../resources/images/avt.jpg"}
                                      alt=""
                                    />
                                  )
                                  :
                                  null
                              }
                            </div>
                            <div className="button-answer">

                              {this._showAnswers()}

                              <div className="button-changhe">
                                <Button
                                  className="btn-btn-changhe"
                                  type="primary"
                                  shape="round"
                                  disabled={this.state.questionIndex === 0}
                                  onClick={() => {
                                    let index = this.state.questionIndex;
                                    if (index - 1 >= 0)
                                      this.setState({ questionIndex: index - 1 })
                                  }}
                                >
                                  Previous
                                </Button>
                                <Button
                                  className="btn-btn-changhe"
                                  type="primary"
                                  shape="round"
                                  disabled={this.state.questionIndex === this.state.listQuestion.length - 1}
                                  onClick={() => {
                                    let index = this.state.questionIndex;
                                    if (index + 1 < this.state.listQuestion.length)
                                      this.setState({ questionIndex: index + 1 })
                                  }}
                                >
                                  Next
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </React.Fragment>
                )
            }

          </Content>
        </Container>
      </Page>
    )
  }
}
