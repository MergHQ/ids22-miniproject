import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { StateContext } from '../App'
import { CalcParams, doCalc } from '../service'
import ActionButton from './ActionButton'
import TextInput from './TextInput'

const ParameterFormContainer = styled.form`
  margin-top: 10em;
  width: 100%;
`

const SubmitButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const ParameterForm = () => {
  const [form, setForm] = useState<Partial<CalcParams>>({})
  const { setState } = useContext(StateContext)

  const updateForm = (key: keyof CalcParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((lastForm) => (lastForm ? { ...lastForm, [key]: e.target.value } : { [key]: e.target.value }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState(() => ({ loadingResults: true }))
    doCalc(form)
      .then((results) => setState(() => ({ loadingResults: false, results })))
      .catch(() => setState(() => ({ loadingResults: false })))
  }

  return (
    <ParameterFormContainer onSubmit={onSubmit}>
      <TextInput type="date" placeholder="Select date" onChange={updateForm('date')} />
      <TextInput
        type="text"
        rightLabel="kWh"
        placeholder="Approx. energy consupmtion"
        onChange={updateForm('approx_consuption')}
      />
      <SubmitButtonContainer>
        <ActionButton type="submit">Submit</ActionButton>
      </SubmitButtonContainer>
    </ParameterFormContainer>
  )
}

export default ParameterForm
