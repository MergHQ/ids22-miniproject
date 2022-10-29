import styled from "styled-components";



const TextInput = styled.input<{rightLabel?: boolean}>`
  background: #FFFFFF;
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  border: none;
  font-weight: 700;
  font-size: 20px;
  color: #817F6F;
  height: 48px;
  width: 100%;
  margin: 1rem 0;
  padding: 0 2rem;
  position: relative;
  align-items: center;
  display: inline-flex;
  position: relative;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Label = styled.span`
  color: #B4CFB0;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  margin: 1rem 0;
  border-radius: 40px;
  padding: 0 2rem;
  z-index: 10;
  position: absolute;
`

export default (props: React.InputHTMLAttributes<HTMLInputElement> & { labelText?: string }) => {
  return (
    <InputContainer>
      <TextInput {...props} rightLabel={props.labelText !== undefined} />
      {props.labelText && <Label>{props.labelText}</Label>}
    </InputContainer>
  )
}
