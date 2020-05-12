import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  padding: 40px 20px 20px 60px;
  width: 100%;
`

export default ({ children, ...props }) => (
  <Div {...props}>{ children }</Div>
)
