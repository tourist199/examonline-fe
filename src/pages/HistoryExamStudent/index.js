import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions, TYPES } from '@/store/actions'
import moment from 'moment'
import Chart from "react-apexcharts";
import Configs from '@/configs'

import Page from '@/components/page'
import Container from '@/components/container'
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
`

let tinhoc = []
let tienganh = []

@connect((state) => ({
  historyStore: state.history
}), {
  getHistoryStudent: actions.getHistoryStudent
})
class HistoryExamStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          height: 400,
          width: "100%",
          type: "area",
          zoom: { type: "x", enabled: true },
          toolbar: { autoSelected: "zoom" },
          animations: {
            initialAnimation: {
              enabled: false
            }
          },
          events: {
            markerClick: (event, chartContext, { seriesIndex, dataPointIndex, config }) => {
              if (seriesIndex == 0) {
                this.props.history.push('/history-detail/' + tinhoc[dataPointIndex]._id + '/' + tinhoc[dataPointIndex].testId)
                console.log('/history-detail/' + tinhoc[dataPointIndex]._id + '/' + tinhoc[dataPointIndex].testId);
              }
              else {
                console.log(tienganh[dataPointIndex]);
                this.props.history.push('/history-detail/' + tinhoc[dataPointIndex]._id + '/' + tinhoc[dataPointIndex].testId)
              }
            }
          }
        },

        xaxis: {
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: 'yy',
              month: 'MM yyyy',
              day: 'dd/MM',
              hour: 'HH:mm'
            }
          }
        },
        yaxis: [
          {
            show: true,
            showAlways: false,
            opposite: false,
            reversed: false,
            logarithmic: false,
            forceNiceScale: false,
            floating: false,
            min: 0,
            max: 100,
            labels: {
              show: true,
              minWidth: 0,
              maxWidth: 160,
              offsetX: 0,
              offsetY: 0,
              rotate: 0,
              padding: 20,
              style: { colors: [], fontSize: "11px", cssClass: "" }
            },
            axisBorder: { show: false, color: "#78909C", offsetX: 0, offsetY: 0 },
            axisTicks: {
              show: false,
              color: "#78909C",
              width: 6,
              offsetX: 0,
              offsetY: 0
            },
            title: {
              text: "Exam Online",
              rotate: 90,
              offsetY: 0,
              offsetX: 0,
              style: { fontSize: "11px", cssClass: "" }
            },
            tooltip: { enabled: false, offsetX: 0 },
            crosshairs: {
              show: true,
              position: "front",
              stroke: { color: "#b6b6b6", width: 1, dashArray: 0 }
            }
          }
        ],
        title: { text: "Lịch sử thi ", align: "left" }
      },
      series: [
        // {
        //   name: "Tiếng anh",
        //   data: [

        //     { x: "2019-05-10 09:00:01", y: "22" },
        //     { x: "2019-05-18 13:00:03", y: "72" },
        //   ]
        // },
        // {
        //   name: "Tin học",
        //   data: [

        //     { x: "2019-05-13 09:00:01", y: "92" },
        //     { x: "2019-05-19 13:00:03", y: "73" },
        //     { x: "2019-05-20 13:00:03", y: "33" },
        //   ]
        // }
      ]
    }
  }


  componentDidMount() {
    this.props.getHistoryStudent()
    console.log(this.props);
    
  }

  render() {
    let historiesStudent = this.props.historyStore.historiesStudent

    tinhoc = historiesStudent.filter(x => ((!x.examId.testId || x.examId.testId.type != 'ENGLISH') && (moment() > moment(x.examId.timeEnd))))
      .sort((a, b) => moment(a.examId.timeStart).valueOf() - moment(b.examId.timeStart).valueOf())
      .map(item => {
        return {
          _id: item._id,
          testId: item.examId.testId && item.examId.testId._id,
          x: moment(item.examId.timeStart).valueOf(),
          y: item.numQuestionDidCorrect || item.numQuestionDidCorrect == 0 ?
            (item.numQuestionDidCorrect / item.examId.testId.totalQuestion) * 100 + '' : 0
        }
      })

    tienganh = historiesStudent.filter(x => x.examId.testId && x.examId.testId.type == 'ENGLISH')
      .sort((a, b) => moment(a.examId.timeStart).valueOf() - moment(b.examId.timeStart).valueOf())
      .map(item => {
        return {
          _id: item._id,
          testId: item.examId.testId && item.examId.testId._id,
          x: moment(item.examId.timeStart).valueOf(),
          y: item.numQuestionDidCorrect || item.numQuestionDidCorrect == 0 ?
            (item.numQuestionDidCorrect / item.examId.testId.totalQuestion) * 100 + '' : '0'
        }
      })

    let series = historiesStudent ? [
      {
        name: "Tin học",
        data: [
          ...tinhoc
        ]
      },
      {
        name: "Tiếng anh",
        data: [
          ...tienganh

        ]
      }
    ] : []

    console.log(historiesStudent);


    return (
      <Page>
        <Container>
          <Content>
            <div className="field-group">
              <h1> History </h1>
              <div className="mixed-chart">
                <Chart
                  options={this.state.options}
                  series={series}
                  type="area"
                  width="800"
                />
              </div>
            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default HistoryExamStudent
