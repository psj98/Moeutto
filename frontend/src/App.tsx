import * as React from 'react';
import styled from 'styled-components';

interface Props {
  children: any;
}

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App({ children }: Props) {
  return (
    <div className="App flex">
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
}

export default App;
