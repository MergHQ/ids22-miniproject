import axios from 'axios'

export type CalcParams = {
  date: string
  approx_consumption: number
}

export type CalcResult = {
  approx_consumption: number
  date: string
  next10days: {
    price: number
    date: string
  }[]
  price: number
}

export const doCalc = (params: Partial<CalcParams>) =>
  axios.post<CalcResult>('/api/price', params).then(({ data }) => data)
