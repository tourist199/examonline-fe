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
            <h1>Xin Chào</h1>
          </Content>
        </Container>
      </Page>
    )
  }
}
