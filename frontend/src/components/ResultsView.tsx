import styled from 'styled-components'
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

const ResultsView = () => {
  return (
    <>
      <DateTitleContainer>01-05-2023</DateTitleContainer>
      <ResultBox>
        <ResultCard title="Result" kwh={285} />
      </ResultBox>
      <ResultBox>
        <ResultCard title="Next 10 days" next10Dataset={[10,20,30,20,10,15,10]} />
      </ResultBox>
      <ActionButton>Back</ActionButton>
    </>
  )
}

export default ResultsView
