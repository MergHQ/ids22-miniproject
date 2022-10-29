import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CardTitleContainer = styled.div`
  width: 100%;
  margin: 2rem;
  font-weight: 700;
  font-size: 20px;
  color: #817f6f;
`

const CardContainer = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: baseline;
  justify-content: space-evenly;
  min-height: 300px;
`

const MainNum = styled.p`
  font-size: 96px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`

const MainNumNotation = styled.p`
  font-weight: 700;
  font-size: 46px;
  color: #b4cfb0;
  margin: 0;
`

const Description = styled.p`
  color: #717171;
  font-weight: 700;
  font-size: 20px;
`

const ResultContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`

type Props = {
  title: string
  kwh?: number
  next10Dataset?: { name: string, price: number }[]
  approxConsumption?: number
}

const Next10Chart = ({ next10 }: Record<'next10', Props['next10Dataset']>) => {
  return (
    <ResponsiveContainer width="100%" minHeight="300px">
      <LineChart
        width={500}
        height={300}
        data={next10}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis />
        <Line type="natural" dataKey="price" stroke="#b4cfb0" strokeWidth="5px" />
        <Line type="natural" dataKey="pricePerDay" stroke="#F5C451" strokeWidth="5px" />
      </LineChart>
    </ResponsiveContainer>
  )
}

const ResultCard = ({ kwh, title, next10Dataset, approxConsumption }: Props) => {
  return (
    <>
      <CardTitleContainer>{title}</CardTitleContainer>
      <CardContainer>
        {kwh !== undefined && (
          <ResultContainer>
            <MainNum>{(kwh / 1000).toFixed(2)}</MainNum>
            <MainNumNotation>€ / kWh</MainNumNotation>
          </ResultContainer>
        )}
        {kwh !== undefined && approxConsumption !== undefined && (
          <ResultContainer>
            <MainNum>{((kwh / 1000) * approxConsumption).toFixed(2)}</MainNum>
            <MainNumNotation>€ / day</MainNumNotation>
            <Description>when consupmtion is {approxConsumption} kWh per day</Description>
          </ResultContainer>
        )}
        {next10Dataset && <Next10Chart next10={next10Dataset} />}
      </CardContainer>
    </>
  )
}

export default ResultCard
