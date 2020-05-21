import React, { Component } from 'react'
import styled from 'styled-components'

import Page from '@/components/page'
import Container from '@/components/container'

const Content = styled.div`

`

export default class HistoryExam extends Component {
  render() {
    return (
      <Page>
        <Container>
          <Content>
            <div>
              <h3> Kỳ thi interview </h3>
              <span> Thời gian còn lại: 20h20p </span>
            </div>
          </Content>
        </Container>
      </Page>
    )
  }
}
