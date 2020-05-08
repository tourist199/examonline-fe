import React, { Component } from 'react'
import styled from 'styled-components'

import Page from '@/components/page'
import Container from '@/components/container'

const Content = styled.div`

`

export default class LichSuThi extends Component {
  render() {
    return (
      <Page>
        <Container>
          <Content>
            <h1>Líchj Sữu sda</h1>
          </Content>
        </Container>
      </Page>
    )
  }
}
