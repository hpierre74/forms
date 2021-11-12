import styled from 'styled-components';
import { ReactComponent as Logo } from './logo.svg';

const Container = styled.div`
  background: lightgrey;
`;

export function App() {
  return (
    <Container>
      <header>
        <Logo width="75" height="75" />
        <h1>Welcome to demo!</h1>
      </header>
      <main></main>
    </Container>
  );
}

export default App;
