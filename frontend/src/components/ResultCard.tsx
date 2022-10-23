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
  align-items: center;
  justify-content: center;
  gap: 48px;
  min-height: 300px;
`

const KwhNum = styled.p`
  font-size: 96px;
  font-weight: 700;
  color: #000000;
`

const KwhNotation = styled.p`
  font-weight: 700;
  font-size: 46px;
  color: #b4cfb0;
`

type Props = {
  title: string
  kwh?: number
  next10Dataset?: { name: string, price: number }[]
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
        <XAxis dataKey="name" />
        <YAxis />
        <Line type="natural" dataKey="price" stroke="#b4cfb0" strokeWidth="5px" />
      </LineChart>
    </ResponsiveContainer>
  )
}

const ResultCard = ({ kwh, title, next10Dataset }: Props) => {
  return (
    <>
      <CardTitleContainer>{title}</CardTitleContainer>
      <CardContainer>
        {kwh !== undefined && (
          <>
            <KwhNum>{kwh}</KwhNum>
            <KwhNotation>€ / kWh</KwhNotation>
          </>
        )}
        {next10Dataset && <Next10Chart next10={next10Dataset} />}
      </CardContainer>
    </>
  )
}

export default ResultCard
