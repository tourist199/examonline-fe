import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions } from '@/store/actions'
import moment from 'moment'

import Button from '@/components/button'
import Page from '@/components/page'
import Container from '@/components/container'
import Table from '@/components/table'
import { Dimensions } from '@/theme'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;

    
  .table-box {
    height: 200px;
    margin: 20px;
    margin-bottom: 100px;
    
    .pagination-box {
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
  }
  .table-box1 {
    height: 200px;
    margin: 20px;
    
    
    .pagination-box {
      height: 100px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
  }
`
let dataSourceOngoingExam = []


const columns = [
  {
    title: '#',
    dataIndex: 'STT',
    render: (text, record, index) => <span>{index + 1}</span>,
    key: '#'
  },
  {
    title: 'Tên Kỳ Thi',
    dataIndex: 'examName',
    key: 'examName'
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'startDay',
    key: 'startDay'
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'endDay',
    key: 'endDay'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Tham gia',
    dataIndex: 'join',
    key: 'join'
  },
]

let dataSourceUpcomingExam = []

const columns_1 = [
  {
    title: '#',
    dataIndex: 'STT',
    render: (text, record, index) => <span>{index + 1}</span>,
    key: '#'
  },
  {
    title: 'Tên Kỳ Thi',
    dataIndex: 'ExamName',
    key: 'ExamName'
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'startDay',
    key: 'startDay'
  },
  {
    title: 'Thời gian Kết thúc',
    dataIndex: 'endDay',
    key: 'endDay'
  }
]

@connect((state) => ({
  examStore: state.exam
}), {
  getRoomsExam: actions.getRoomsExam,
})
class ManageRoomExam extends Component {

  componentDidMount() {
    this.props.getRoomsExam()
  }

  render() {
    let listExam = this.props.examStore.roomsExam
    console.log(listExam);


    /**
     * Render ky thi dang dien ra
     */

    dataSourceOngoingExam = []
    listExam.forEach(item => {
      if (moment(item.timeStart).isBefore(moment()) && moment(item.timeEnd).isAfter(moment()))
        dataSourceOngoingExam.push({
          examName: item.title,
          startDay: moment(item.timeStart).format('MM/DD/YYYY, hh:mm:ss'),
          endDay: moment(item.timeEnd).format('MM/DD/YYYY, hh:mm:ss'),
          status: 'Đang diễn ra',
          join: <div>
            <Button onClick={() => this.props.history.push(`room-exam/${item._id}`)} >Coi thi</Button>
          </div>
        })
    })

    /**
     * Render ky thi sap dien ra
     */

    dataSourceUpcomingExam = []
    listExam.forEach(item => {
      if (moment(item.timeStart).isAfter(moment()))
        dataSourceUpcomingExam.push({
          ExamName: item.title,
          startDay: moment(item.timeStart).format('MM/DD/YYYY, hh:mm:ss'),
          endDay: moment(item.timeEnd).format('MM/DD/YYYY, hh:mm:ss')
        })
    })



    return (
      <Page>
        <Container>
          <Content>
            <div className="field-group">
              <h1> Phòng thi</h1>
            </div>
            <div className="table-box">
              <h3 style={{ marginBottom: '15px' }}> Kỳ thi hiện tại</h3>
              <Table
                rowKey={(row, index) => index}
                dataSource={dataSourceOngoingExam}
                columns={columns}
                scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
              />
            </div>
            <div className="table-box1">
              <h3 style={{ marginBottom: '15px' }}> Kỳ thi sắp diễn ra</h3>
              <Table
                rowKey={(row, index) => index}
                dataSource={dataSourceUpcomingExam}
                columns={columns_1}
                scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
              />
            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default ManageRoomExam
