import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
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
        image: '',
        description: '',
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

  _handleChange = (event) => {
    var formData = new FormData();
    formData.append('image', event.target.files[0]);
    callAPI('questions/update/' + this.state.listQuestion[this.state.questionIndex]._id, 'POST', formData)
      .then(res => {
        if (res.data.success) {
          let listQuestion = this.state.listQuestion
          listQuestion[this.state.questionIndex].image = res.data.result.pathCurrent
          this.setState({ listQuestion })
        }
        else {
          console.log('Loi up anh roi ban e')
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  _showQuestionItem = () => {
    let questionItem = this.state.listQuestion[this.state.questionIndex]
    return (
      <div className="question-box-border">
        <div className='question-box bc'>
          <p className="title-head">Câu hỏi {this.state.questionIndex + 1} {<DeleteTwoTone twoToneColor="#eb2f96" style={{ float: 'right', padding: '6px' }} />}</p>
          <div>
            {/* <span className='title'>Câu hỏi:</span> */}
            <Input
              className="question-input-1"
              addonBefore="Câu hỏi"
              name='title'
              value={questionItem.title}
              suffix={
                <Tooltip title="Upload Image">
                  <Button
                    icon={<PictureOutlined />}
                    onClick={() => {
                      document.getElementById("image-upload").click();
                    }}
                    size="small"
                  />
                </Tooltip>
              }
              onChange={(e) => {
                let listQuestion = this.state.listQuestion
                listQuestion[this.state.questionIndex].title = e.target.value
                this.setState({ listQuestion })
              }}
            />
          </div>
          <Descriptions />
          <div style={{ textAlign: "center" }}>
            {/* <span className='description'>Image:</span> */}
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
                    type={index === this.state.listQuestion[this.state.questionIndex].result ? 'primary' : ''}
                    shape="circle"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      let listQuestion = this.state.listQuestion
                      listQuestion[this.state.questionIndex].result = index
                      this.setState({ listQuestion })
                    }} />
                  <Input
                    className="input-answer"
                    name=''
                    prefix={String.fromCharCode(65 + index)}
                    suffix={
                      <Tooltip title="Delete">
                        <Button
                          shape="circle"
                          size="small"
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
      title: this.state.title,
      description: this.state.description,
      createAt: moment(),
      status: 'DRAFT',
      type: this.state.type,
      createdBy: Storage.get('ID'),
      listQuestion: this.state.listQuestion
    }
    this.props.insertTest(data, (success, rs) => {
      if (success) {
        Notification.success('Insert test success')
        this.props.history.goBack()
      }
    })
  }

  _onChangeType = (type) => {
    this.setState({ type })
  }

  _onSubmitTest = () => {
    let data = {
      title: this.state.title,
      description: this.state.description,
      createAt: moment(),
      status: 'WAITTING',
      type: this.state.type,
      createdBy: Storage.get('ID'),
      listQuestion: this.state.listQuestion
    }
    this.props.insertTest(data, (success, rs) => {
      console.log(success);

      if (success) {
        Notification.success('Insert test success')
        this.props.history.goBack()
      }
    })
  }

  render() {
    return (
      <Page>
        <Container>
          <Content>
            <div >
              <h1 style={{ marginBottom: '20px' }}> Tạo mới đề thi </h1>

              <div class="box-test-head">
                <div className="abc">
                  {/* <span className='title'>Tên bộ đề thi</span> */}
                  <Input addonBefore="Tên bộ đề" className="question-input" name='title' value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                </div>
                <div>
                  {/* <span className='desc'>Mô tả đề thi</span> */}
                  <Input addonBefore="Mô tả đề" className="question-input" name='description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                </div>
                <div>
                  <span className='desc'>Loại </span>
                  <Select addonBefore="Tên bộ đề" className="question-input" style={{ width: "40%" }} value={this.state.type} onChange={this._onChangeType} >
                    <Option value="IT">Tin học</Option>
                    <Option value="ENGLISH">Tiếng Anh</Option>
                  </Select>
                </div>

              </div>

              <div className="groupbutton">
                <Button type="primary" shape='round' danger className="item-button" icon={<CloseCircleOutlined />}>
                  CANCEL
                </Button>
                <Button onClick={this._onSaveTest} type="primary" className="item-button" shape='round' icon={<PlusCircleOutlined />}>
                  Lưu nháp
                </Button>
                <Button onClick={this._onSubmitTest} type="primary" shape='round' className="item-button" ghost icon={<CheckOutlined />}>
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

export default NewTest
