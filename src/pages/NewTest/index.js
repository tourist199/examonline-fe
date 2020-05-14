import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Storage from '@/utils/storage'
import { connect } from 'react-redux'

import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'
import { PlusOutlined, MinusOutlined, CheckOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { actions } from '@/store/actions'


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

`

@connect(null, {
  insertTest: actions.insertTest
})
class NewTest extends Component {

  state = {
    title: '',
    description: '',
    listQuestion: [
      {
        title: '',
        answers: ['', ''],
        description: '',
        result: null
      },
      {
        title: '',
        answers: ['', ''],
        description: '',
        result: null
      },
      {
        title: '',
        answers: ['', ''],
        description: '',
        result: null
      },
    ],
    questionIndex: 0
  }

  _showQuestionBtn = () => {
    if (!this.state.listQuestion)
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
    let questionItem = this.state.listQuestion[this.state.questionIndex]
    return (
      <div className='question-box'>
        <p>Câu hỏi {this.state.questionIndex + 1}</p>
        <div>
          <span className='title'>Câu hỏi:</span>
          <Input
            name='title'
            value={questionItem.title}
            onChange={(e) => {
              let listQuestion = this.state.listQuestion
              listQuestion[this.state.questionIndex].title = e.target.value
              this.setState({ listQuestion })
            }}
          />
        </div>
        <div>
          <span className='description'>Mo ta:</span>
          <Input
            name='description'
            value={questionItem.description}
            onChange={(e) => {
              let listQuestion = this.state.listQuestion
              listQuestion[this.state.questionIndex].description = e.target.value
              this.setState({ listQuestion })
            }}
          />
        </div>
        <div className='answer-box'>
          {
            questionItem.answers.map((item, index) => (
              <div key={index} className='answer-item'>
                <Button
                  shape="circle"
                  icon={<MinusOutlined />}
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
                <Button
                  type={index === this.state.listQuestion[this.state.questionIndex].result ? 'primary' : ''}
                  shape="circle"
                  icon={<CheckOutlined />}
                  onClick={() => {
                    let listQuestion = this.state.listQuestion
                    listQuestion[this.state.questionIndex].result = index
                    this.setState({ listQuestion })
                  }} />
                <Button shape="circle" disabled >{String.fromCharCode(65 + index)}</Button>
                <Input
                  name=''
                  value={item}
                  onChange={(e) => {
                    let listQuestion = this.state.listQuestion
                    listQuestion[this.state.questionIndex].answers[index] = e.target.value
                    this.setState({ listQuestion })
                  }} />
              </div>
            ))
          }
          <div>
            <Button
              type="primary"
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
    )
  }

  _onSaveTest = () => {
    let data = {
      title: this.state.title,
      description: this.state.description,
      createAt: moment(),
      status: 'DRAFT',
      createdBy: Storage.get('ID'),
      listQuestion: this.state.listQuestion
    }
    this.props.insertTest(data)
  }

  _onSubmitTest = () => {
    let data = {
      title: this.state.title,
      description: this.state.description,
      createAt: moment(),
      status: 'DRAFT',
      createdBy: Storage.get('ID'),
      listQuestion: this.state.listQuestion
    }
    this.props.insertTest(data)
  }

  render() {
    return (
      <Page>
        <Container>
          <Content>
            <div >
              <h1 style={{ marginBottom: '20px' }}> Tạo mới đề thi </h1>
              <div>
                <span className='title'>Tên bộ đề thi</span>
                <Input name='title' value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
              </div>
              <div>
                <span className='desc'>Mô tả đề thi</span>
                <Input name='description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
              </div>
              <div>
                <Button type="primary" shape='round' icon={<PlusCircleOutlined />}>
                  CANCEL
                </Button>
                <Button onClick={this._onSaveTest} type="primary" shape='round' icon={<PlusCircleOutlined />}>
                  Lưu nháp
                </Button>
                <Button onClick={this._onSubmitTest} type="primary" shape='round' icon={<PlusCircleOutlined />}>
                  Đề xuất duyệt
                </Button>
              </div>
              <div>
                <p>Tất cả câu hỏi</p>
                <div>
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

export default NewTest
