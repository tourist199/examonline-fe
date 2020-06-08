import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Storage from '@/utils/storage'
import { connect } from 'react-redux'

import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'
import { PlusOutlined, CheckOutlined, PlusCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { actions } from '@/store/actions'
import { Divider, Descriptions, Tooltip } from 'antd';
import Notification from '@/components/notification'

import callAPI from "@/utils/apiCaller";
import Config from '@/configs'


const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;

  .answer-item {
    display: flex;
    padding: 10px
  }
  .answer-box {
    margin-top: 30px
  }
  .groupbutton{
    text-align: right;
  }
  .item-button{
    margin:10px 0 5px 10px;
  }
  .ant-input{
    background: #f3f5f7;
  }
  .question-box-border{
    border-radius: 5px;
    background: white;
    margin: 10px 0;
    box-shadow: -1px 2px 5px 1px rgba(163,163,163,1);
    
  }
  .question-box{
    padding:20px;
    font-size:14px;
    font-weight: bold;
  }
  .title-head{
    text-align:center;
    font-size:16px;
    font-weight: bold;
  }
  .question-box-border .question-box .ant-input{
    background: none;
  }
  .question-input{
    margin:10px 0;
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
`

@connect((state) => ({
  testIndex: state.test.editTest
}), {
  getTestById: actions.getTestById,
  deleteTest: actions.deleteTest,
  changeStatusDraft: actions.changeStatusTestDraft,
  changeStatusDone: actions.changeStatusTestDone
})
class WatchTest extends Component {

  state = {
    _id: '',
    title: '',
    description: '',
    listQuestion: [],
    questionIndex: 0
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.testIndex && nextProps.testIndex.test && nextProps.testIndex.test._id !== prevState._id) {
      return {
        _id: nextProps.testIndex.test._id || '',
        title: nextProps.testIndex.test.title || '',
        description: nextProps.testIndex.test.description || '',
        listQuestion: nextProps.testIndex.listQuestion || [],
      };
    }
    else return null;
  }

  componentDidMount() {
    this.props.getTestById(this.props.match.params.id);
  }



  _showQuestionBtn = () => {
    if (!this.state.listQuestion || this.state.listQuestion.length === 0)
      return null
    return this.state.listQuestion.map((item, index) => {
      return <Button
        type={index === this.state.questionIndex ? `primary` : ''}
        shape="circle"
        key={index}
        onClick={() => this.setState({ questionIndex: index })}
      >
        {index + 1}
      </Button>
    })
  }

  _approveTest = (ok) => {
    if (ok) {
      this.props.changeStatusDone(this.props.match.params.id, (success, data) => {
        Notification.success('Thác tác thành công')
        this.props.history.goBack()
      })
    }
    else {
      this.props.changeStatusDone(this.props.match.params.id, (success, data) => {
        Notification.success('Thác tác thành công')
        this.props.history.goBack()
      })
    }
  } 

  _showQuestionItem = () => {
    if (!this.state.listQuestion || this.state.listQuestion.length === 0)
      return null
    let questionItem = this.state.listQuestion[this.state.questionIndex]

    return (
      <div className="question-box-border">
        <div className='question-box bc'>
          <p className="title-head">Câu hỏi {this.state.questionIndex + 1}</p>
          <div>
            <span className='title'>Câu hỏi:</span>
            <Input
              className="question-input"
              name='title'
              value={questionItem.title}
            />
          </div>
          <Descriptions />

          {/* <div>
            <span className='description'>Mo ta:</span>
            <Input
              className="question-input"
              name='description'
              value={questionItem.description}
              onChange={(e) => {
                let listQuestion = this.state.listQuestion
                listQuestion[this.state.questionIndex].description = e.target.value
                this.setState({ listQuestion })
              }}
            />
          </div> */}

          <div>
            <span className='description'>Image:</span>
            {
              this.state.listQuestion[this.state.questionIndex].image ?
                (
                  <img
                    className="image-question"
                    src={this.state.listQuestion[this.state.questionIndex].image ? `${Config.API_URL}/${this.state.listQuestion[this.state.questionIndex].image}` : "./../resources/images/avt.jpg"}
                    alt=""
                  />
                )
                :
                null
            }
          </div>

          <Divider >Answer</Divider>
          <div className='answer-box'>
            {
              questionItem.answers.map((item, index) => (
                <div key={index} className='answer-item'>
                  <Button
                    type={+index === +this.state.listQuestion[this.state.questionIndex].result ? 'primary' : ''}
                    shape="circle"
                    icon={<CheckOutlined />}
                  />
                  {/* <Button shape="circle" disabled >{String.fromCharCode(65 + index)}</Button> */}
                  <Input
                    className="input-answer"
                    name=''
                    prefix={String.fromCharCode(65 + index)}

                    value={item}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }




  render() {

    return (
      <Page>
        <Container>
          <Content>
            <div >
              <h1 style={{ marginBottom: '20px' }}> Xem đề thi </h1>
              <div className="abc">
                <span className='title'>Tên bộ đề thi</span>
                <Input className="question-input" name='title' value={this.state.title} />
              </div>
              <div>
                <span className='desc'>Mô tả đề thi</span>
                <Input className="question-input" name='description' value={this.state.description} />
              </div>
              <div className="groupbutton">
                <Button type="primary" shape='round' onClick={this.props.history.goBack} ghost className="item-button" icon={<CloseCircleOutlined />}>
                  BACK
                </Button>

                <Button
                  onClick={() => {
                    
                  }}
                  type="primary" shape='round' className="item-button" icon={<CheckOutlined />}>
                  KHONG DUYET
                </Button>

                <Button
                  onClick={() => this._approveTest(true)}
                  type="primary" shape='round' className="item-button" icon={<CheckOutlined />}>
                  DUYET
                </Button>
              </div>
              <div>
                <p>Tất cả câu hỏi</p>
                <div className="list-question">
                  {this._showQuestionBtn()}
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

export default WatchTest
