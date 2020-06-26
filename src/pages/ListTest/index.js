import React, { Component } from 'react'
import styled from 'styled-components'
import lodash from 'lodash'
import { object, string } from 'yup'
import { Pagination, Checkbox } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { withLocalize } from 'react-localize-redux'

import Input from '@/components/input'
import Field from '@/components/field'
import Button from '@/components/button'
import Page from '@/components/page'
import Select from '@/components/select'
import Container from '@/components/container'
import Table from '@/components/table'
import { Dimensions } from '@/theme'
import { actions, TYPES } from '@/store/actions'


import listtestEN from '@/languages/listtest/en.json'
import listtestVI from '@/languages/listtest/vi.json'

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
let dataSource = []

const columns = [
  {
    title: 'Tên bộ đề',
    dataIndex: 'nameExam',
    key: 'nameExam'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action'
  },
]

@withLocalize
@connect((state) => ({
  testStore: state.test
}), {
  getTests: actions.getTestsByTeacher,
})
class ListTest extends Component {

  componentDidMount() {
    this.props.getTests({ page: 1})
    const { addTranslationForLanguage } = this.props

    addTranslationForLanguage(listtestEN, 'en')
    addTranslationForLanguage(listtestVI, 'vi')
  }

  render() {
    const { total } = this.props.testStore
    console.log(this.props.testStore);
    const { translate } = this.props
    const { getTests } = this.props

    let listTest = this.props.testStore.listTest
    if (listTest) {
      dataSource = []
      listTest.forEach((item, index) => {
        dataSource.push({
          key: index,
          nameExam: item.title,
          date: moment(item.createAt).format('llll'),
          status: item.status,
          Action: <Button onClick={() => this.props.history.push('/edit-test/' + item._id)} > EDIT </Button>
        })
      })
    }

    return (
      <Page>
        <Container>
          <Content>
              <div className="field-group">
                <h1> {translate('listtest.listTest')} </h1>
              </div>
              <div className="table-box">
                <Table
                  rowKey={(row, index) => index}
                  dataSource={dataSource}
                  columns={columns}
                  scroll={{ y: `calc(100vh - ${Dimensions.HEADER_HEIGHT}px - 54px - 200px - 50px)` }}
                  loading={this.props.testStore.submitting === TYPES.GET_TESTS_BY_TEACHER_REQUEST}
                />
                <div className="pagination-box">
                  <Pagination defaultCurrent={1} pageSize={5} total={total} onChange={(page) => getTests({ page })} />
                </div>
              </div>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default ListTest
