import React, { Component } from 'react'
import styled from 'styled-components'

import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'
import { PlusOutlined, MinusOutlined, CheckOutlined, PlusCircleOutlined } from '@ant-design/icons'


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

class NewTest extends Component {

  state = {
    title: '',
    description: '',
    listQuestion: [
      {
        title: '',
        answers: ['', ''],
        result: null
      },
      {
        title: '',
        answers: ['', ''],
        result: null
      },
      {
        title: '',
        answers: ['', ''],
        result: null
      }
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
    return (
      <div className='question-box'>
        <p>Câu hỏi {this.state.questionIndex + 1}</p>
        <div>
          <span className='title'>Câu hỏi:</span>
          <Input name='title' />
        </div>
        <div className='answer-box'>
          <div className='answer-item'>
            <Button shape="circle" icon={<MinusOutlined />} />
            <Button shape="circle" icon={<CheckOutlined />} />
            <Button shape="circle" disabled >A</Button>
            <Input name='' />
          </div>
          <div className='answer-item'>
            <Button shape="circle" icon={<MinusOutlined />} />
            <Button shape="circle" icon={<CheckOutlined />} />
            <Button shape="circle" disabled >B</Button>
            <Input name='' />
          </div>
          <div className='answer-item'>
            <Button shape="circle" icon={<MinusOutlined />} />
            <Button shape="circle" icon={<CheckOutlined />} />
            <Button shape="circle" disabled >C</Button>
            <Input />
          </div>
          <div>
            <Button type="primary" icon={<PlusCircleOutlined />}>
              Add answer
        </Button>
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
                <Button type="primary" shape='round' icon={<PlusCircleOutlined />}>
                  NEW
                </Button>
              </div>
              <div>
                <p>Tất cả câu hỏi</p>
                <div>
                  {this._showQuestionBtn()}
                  <Button shape="circle" icon={<PlusOutlined />} />
                </div>
              </div>
              {null}

            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default NewTest
