import { format, parse } from 'date-fns'
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

const convertToDate = (date: string) => parse(date, 'yyyy-MM-dd', new Date())

const formatNext10Days = (next10: CalcResult['next10days'], approxConsumption: number) =>
  next10.map(({ price, date }) => ({
    price: price / 1000,
    name: format(convertToDate(date), 'dd-MM'),
    pricePerDay: approxConsumption * (price / 1000),
  }))

const ResultsView = ({ results }: Props) => {
  const { setState } = useContext(StateContext)

  return (
    <>
      <DateTitleContainer>{format(convertToDate(results.date), 'dd-MM-yyyy')}</DateTitleContainer>
      <ResultBox>
        <ResultCard title="Result" kwh={results.price} approxConsumption={results.approx_consumption} />
      </ResultBox>
      <ResultBox>
        <ResultCard
          title="Next 10 days"
          next10Dataset={formatNext10Days(results.next10days, results.approx_consumption)}
        />
      </ResultBox>
      <ActionButton onClick={() => setState(() => ({ loadingResults: false }))}>Back</ActionButton>
    </>
  )
}

export default ResultsView
