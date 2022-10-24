import { format } from 'date-fns'
import { useContext } from 'react'
import styled from 'styled-components'
import { StateContext } from '../App'
import { CalcResult } from '../service'
import ActionButton from './ActionButton'
import ResultCard from './ResultCard'

const DateTitleContainer = styled.h2`
  letter-spacing: 1rem;
  display: flex;
  justify-content: center;
  color: #817f6f;
`
const ResultBox = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  margin-bottom: 35px;
`
type Props = {
  results: CalcResult
}

const formatNext10Days = (next10: CalcResult['next10days']) =>
  next10.map(({ price, date }) => ({ price, name: format(new Date(date), 'dd-MM-yyyy') }))

const ResultsView = ({ results }: Props) => {
  const { setState } = useContext(StateContext)

  return (
    <>
      <DateTitleContainer>01-05-2023</DateTitleContainer>
      <ResultBox>
        <ResultCard title="Result" kwh={results.kwh} />
      </ResultBox>
      <ResultBox>
        <ResultCard title="Next 10 days" next10Dataset={formatNext10Days(results.next10days)} />
      </ResultBox>
      <ActionButton onClick={() => setState(() => ({ loadingResults: false }))}>Back</ActionButton>
    </>
  )
}

export default ResultsView
