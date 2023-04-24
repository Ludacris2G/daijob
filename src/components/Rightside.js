import styled from 'styled-components'

import React from 'react'

function Rightside({ props }) {
  return (
    <div>
      <Container>
        right side
      </Container>
    </div>
  )
}

const Container = styled.div`
    grid-area: Rightside;
`;

export default Rightside
