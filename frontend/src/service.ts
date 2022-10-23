import axios from 'axios'

export type CalcParams = {
  date: string
  approx_consuption: number
}

export type CalcResult = {
  kwh: number
  next10days: {
    price: number
    date: string
  }[]
}

export const doCalc = (params: Partial<CalcParams>) =>
  axios.post<CalcResult>('/api/price', params).then(({ data }) => data)
