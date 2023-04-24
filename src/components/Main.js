import styled from 'styled-components'

import React from 'react'

function Main({ props }) {
  return (
    <div>
      <Container>
        main
      </Container>
    </div>
  )
}

const Container = styled.div`
    grid-area: Main;
`;

export default Main
