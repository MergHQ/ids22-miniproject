import { useState, createContext } from 'react'
import { Container } from 'react-dom'
import styled from 'styled-components'
import Logo from './components/Logo'
import Navbar from './components/Navbar'
import ParameterForm from './components/ParameterForm'
import ResultsView from './components/ResultsView'
import {CalcResult} from './service'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
`

type State = {
  loadingResults: boolean
  results?: CalcResult
}

type StateCtx = {
  state: State
  setState: (dispatch: (state: State) => State) => void
}

const initialState: State = {
  loadingResults: false
}

export const StateContext = createContext<StateCtx>({
  state: initialState,
  setState: () => initialState
})

const App = () => {
  const [state, setState] = useState<State>(initialState)

  return (
    <StateContext.Provider value={{ state, setState }}>
      {state.results && <Navbar />}
      <Container>
        {state.loadingResults && <h2>Loading...</h2>}
        {!state.results ? (
          <>
            <Logo container />
            <ParameterForm />
          </>
        ) : (
          <ResultsView results={state.results} /> 
        )}
      </Container>
    </StateContext.Provider>
  )
}
export default App
