import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Storage from '@/utils/storage'
import { connect } from 'react-redux'
import { actions } from '@/store/actions'

import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'
import { PlusOutlined, CheckOutlined, PlusCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Divider, Descriptions, Tooltip } from 'antd';
import Notification from '@/components/notification'

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
`

@connect((state) => ({
  testIndex: state.test.editTest
}), {
  getTestById: actions.getTestById,
  updateTest: actions.updateTest,
  deleteTest: actions.deleteTest
})
class EditTest extends Component {
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
    this.props.getTestById(this.props.match.params.idTest);
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
              onChange={(e) => {
                let listQuestion = this.state.listQuestion
                listQuestion[this.state.questionIndex].title = e.target.value
                this.setState({ listQuestion })
              }}
            />
          </div>
          <Descriptions />
          <div>
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
          </div><Divider >Answer</Divider>
          <div className='answer-box'>
            {
              questionItem.answers.map((item, index) => (
                <div key={index} className='answer-item'>
                  <Button
                    type={index === this.state.listQuestion[this.state.questionIndex].result ? 'primary' : ''}
                    shape="circle"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      let listQuestion = this.state.listQuestion
                      listQuestion[this.state.questionIndex].result = index
                      this.setState({ listQuestion })
                    }} />
                  {/* <Button shape="circle" disabled >{String.fromCharCode(65 + index)}</Button> */}
                  <Input
                    className="input-answer"
                    name=''
                    prefix={String.fromCharCode(65 + index)}
                    suffix={
                      <Tooltip title="Delete">
                        <Button
                          shape="circle"
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            let listQuestion = this.state.listQuestion
                            listQuestion[this.state.questionIndex].answers.splice(index, 1)
                            if (listQuestion[this.state.questionIndex].result > index) {
                              listQuestion[this.state.questionIndex].result = listQuestion[this.state.questionIndex].result - 1
                            }
                            else if (listQuestion[this.state.questionIndex].result == index) {
                              listQuestion[this.state.questionIndex].result = null
                            }
                            this.setState({ listQuestion })
                          }}
                        />
                      </Tooltip>
                    }
                    value={item}
                    onChange={(e) => {
                      let listQuestion = this.state.listQuestion
                      listQuestion[this.state.questionIndex].answers[index] = e.target.value
                      this.setState({ listQuestion })
                    }} />
                </div>
              ))
            }
            <div className="answer-button">
              <Button

                icon={<PlusCircleOutlined />}
                onClick={() => {
                  let listQuestion = this.state.listQuestion
                  listQuestion[this.state.questionIndex].answers.push('')
                  this.setState({ listQuestion })
                }}
              >
                Add answer
          </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _onSaveTest = () => {
    let data = {
      _id: this.state._id,
      title: this.state.title,
      description: this.state.description,
      createAt: moment(),
      status: 'DRAFT',
      createdBy: Storage.get('ID'),
      listQuestion: this.state.listQuestion
    }
    this.props.updateTest({ data: { ...data }, idTest: this.props.match.params.idTest }, (success, data) => {
      if (success) {
        Notification.success('Update success!')
        this.props.history.goBack()
        this.props.getTestById(this.props.match.params.idTest);
      }
      else
        Notification.error('Update failed!')
    })
  }

  _deleteThisTest = () => {
    this.props.deleteTest(this.props.match.params.idTest)
    
  }

  _onSubmitTest = () => {
    let data = {
      title: this.state.title,
      description: this.state.description,
      createAt: moment(),
      status: 'WAITTING',
      createdBy: Storage.get('ID'),
      listQuestion: this.state.listQuestion
    }
    this.props.updateTest({ data: { ...data }, idTest: this.props.match.params.idTest }, (success, data) => {
      if (success) {
        Notification.success('Update success!')
        this.props.history.goBack()
        this.props.getTestById(this.props.match.params.idTest);
      }
      else
        Notification.error('Update failed!')
    })
  }

  render() {

    return (
      <Page>
        <Container>
          <Content>
            <div >
              <h1 style={{ marginBottom: '20px' }}> Chỉnh sửa đề thi </h1>
              <div className="abc">
                <span className='title'>Tên bộ đề thi</span>
                <Input className="question-input" name='title' value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
              </div>
              <div>
                <span className='desc'>Mô tả đề thi</span>
                <Input className="question-input" name='description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
              </div>
              <div className="groupbutton">
                <Button type="primary" shape='round' onClick={this.props.history.goBack} ghost className="item-button" icon={<CloseCircleOutlined />}>
                  CANCEL
                </Button>
                <Button onClick={this._onSaveTest} type="primary" className="item-button" shape='round' ghost icon={<PlusCircleOutlined />}>
                  Lưu nháp
                </Button>
                <Button  danger onClick={this._deleteThisTest} type="primary" className="item-button" shape='round'  icon={<DeleteOutlined />}>
                  Xóa
                </Button>
                <Button onClick={this._onSubmitTest} type="primary" shape='round' className="item-button" icon={<CheckOutlined />}>
                  Đề xuất duyệt
                </Button>
              </div>
              <div>
                <p>Tất cả câu hỏi</p>
                <div className="list-question">
                  {this._showQuestionBtn()}
                  <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      let listQuestion = this.state.listQuestion
                      listQuestion.push({
                        title: '',
                        answers: ['', ''],
                        result: null
                      })
                      this.setState({ listQuestion })
                    }} />
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

export default EditTest
