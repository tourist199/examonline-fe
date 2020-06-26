import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import "moment/locale/vi";
import Storage from '@/utils/storage'
import { connect } from 'react-redux'
import Notification from '@/components/notification'

import callAPI from "@/utils/apiCaller";
import Config from '@/configs'

import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'
import { PlusOutlined, DeleteTwoTone, CheckOutlined, PlusCircleOutlined, CloseCircleOutlined, DeleteOutlined, FileImageOutlined, PictureOutlined } from '@ant-design/icons'
import { actions } from '@/store/actions'
import { Divider, Descriptions, Tooltip, Select } from 'antd';

const { Option } = Select;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  padding-right: 50px;

  .answer-item {
    display: flex;
    padding: 10px
  }
  .answer-box {
    margin-top: 10px
  }
  .groupbutton{
    text-align: right;
  }
  .item-button{
    margin:10px 0 5px 10px;
  }

  .question-box-border{
    border-radius: 5px;
    background: white;
    margin: 0 auto;
    box-shadow: -1px 2px 5px 1px rgba(163,163,163,1);
    max-width: 750px;
    margin-bottom: 30px
  }
  .question-box{
    padding:20px;
    font-size:14px;
    font-weight: bold;
    padding-top: 0;
  }
  .title-head{
    text-align:center;
    font-size:16px;
    font-weight: bold;
    margin-left : -20px;
    margin-right: -20px;
    background: #f6f4f5;
    padding: 7px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .question-box-border .question-box .ant-input{
    background: none;
  }
  .question-input{
    margin:10px 0;
  }
  .question-input-1 {
    margin : 0
  }
  .input-answer{
    margin-left: 10px;
  }
  .answer-button{
    text-align: center;
    margin: 10px 20px;
  }
  .list-question{
    margin-bottom: 20px;
  }
  .image-question {
    
    width: 100%;
    max-height: 350px;
    width: auto;
  }
  .box-test-head {
    width: 70%
  }
`

@connect((state) => ({
  testStore: state.test,
  historyStore: state.history
}), {
  getTestById: actions.getTestById,
  getExamStudentById: actions.getExamStudentById
})
class HistoryDetail extends Component {

  state = {
    title: '',
    description: '',
    listQuestion: [
      {
        title: '',
        answers: ['', ''],
        image: '',
        description: '',
        result: null
      }
    ],
    questionIndex: 0
  }

  componentDidMount() {
    this.props.getTestById(this.props.match.params.idTest)
    this.props.getExamStudentById(this.props.match.params.idExamStudent)
  }

  _showQuestionItem = () => {

    let rs = this.props.testStore.testIndex.listQuestion && this.props.testStore.testIndex.listQuestion.map((questionItem, index) => {
      let answerItem = this.props.historyStore.historyIndex && this.props.historyStore.historyIndex.listAnswer && this.props.historyStore.historyIndex.listAnswer.find(x => x.idQuestion == questionItem._id)
      return (
        <div key={index} className="question-box-border">
          <div className='question-box bc'>
            <p className="title-head" style={answerItem && +answerItem.selected == +questionItem.result ? { background: '#95de64' } : { background: '#ff7875' }}>Câu hỏi {index + 1} </p>
            <div>
              <Input
                className="question-input-1"
                addonBefore="Câu hỏi"
                name='title'
                value={questionItem.title}
              />
            </div>
            <Descriptions />
            <div style={{ textAlign: "center" }}>
              {
                questionItem.image ?
                  (
                    <img
                      className="image-question"
                      src={questionItem.image ? `${Config.API_URL}/${questionItem.image}` : "./../resources/images/avt.jpg"}
                      alt=""
                    />
                  )
                  :
                  null
              }
              <input type='file' id="image-upload" name='image' onChange={this._handleChange} style={{ display: "none" }} />
            </div>
            <Divider >Answer</Divider>
            <div className='answer-box'>
              {
                questionItem.answers.map((item, index) => (
                  <div key={index} className='answer-item'>
                    <Button
                      size="small"
                      style={{ marginTop: '3px' }}
                      type={index == +questionItem.result ? 'primary' : ''}
                      shape="circle"
                      icon={<CheckOutlined />}
                    />
                    <Button
                      className="input-answer"
                      name=''
                      danger={answerItem && +answerItem.selected == +index}
                      style={{ width: '100%', borderRadius: '10px', textAlign: 'left' }}
                    >
                      {String.fromCharCode(65 + index) + '.  ' + item}
                    </Button>
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      )
    })
    return rs
  }

  render() {
    let testIndex = this.props.testStore.testIndex
    let historyIndex = this.props.historyStore.historyIndex
    console.log(testIndex, historyIndex);
    console.log(historyIndex.numQuestionDidCorrect / testIndex.test.totalQuestion);
    
    return (
      <Page>
        <Container>
          <Content>
            <div >
              <h1 style={{ marginBottom: '20px' }}> Lịch sử chi tiết </h1>

              <div className="box-test-head">
                <div className="abc">
                  <p> <b>Tên kỳ thi: </b> {historyIndex.examId && historyIndex.examId.title}</p>
                </div>
                <div className="abc">
                  <p> <b>Mô tả kỳ thi: </b> {historyIndex.examId && historyIndex.examId.description}</p>
                </div>
                <div className="abc">
                  <p> <b>Thời gian bắt đầu: </b> {historyIndex.examId && moment(historyIndex.examId.timeStart).locale("vi").format('LLLL')}</p>
                </div>
                <div className="abc">
                  <p> <b>Thời gian kết thúc: </b> {historyIndex.examId && moment(historyIndex.examId.timeEnd).locale("vi").format('LLLL')}</p>
                </div>
                <div className="abc">
                  <p> <b>Số điểm: </b> {historyIndex && historyIndex.numQuestionDidCorrect ? Math.round((historyIndex.numQuestionDidCorrect / testIndex.test.totalQuestion) * 100)  : 0}</p>
                </div>
              </div>

              {this._showQuestionItem()}
            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default HistoryDetail
