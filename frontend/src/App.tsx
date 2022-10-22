import { useState } from 'react'
import { Container } from 'react-dom'
import styled from 'styled-components'
import Logo from './components/Logo'
import Navbar from './components/Navbar'
import ParameterForm from './components/ParameterForm'
import ResultsView from './components/ResultsView'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
`

type Page = 'front' | 'results'

const App = () => {
  const [page, setPage] = useState<Page>('front')

  return (
    <>
      {page === 'results' && <Navbar />}
      <Container>
        {page == 'front' ? (
          <>
            <Logo container />
            <ParameterForm switchToResulPage={() => setPage('results')} />
          </>
        ) : (
          <ResultsView />
        )}
      </Container>
    </>
  )
}
export default App
