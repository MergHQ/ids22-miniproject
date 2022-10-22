import styled from "styled-components";
import ActionButton from "./ActionButton";
import TextInput from "./TextInput";

const ParameterFormContainer = styled.div`
  margin-top: 10em;
  width: 100%;
`

const SubmitButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

type Props = {
  switchToResulPage: () => void
}

const ParameterForm = ({ switchToResulPage }: Props) => (
  <ParameterFormContainer>
    <TextInput type="date" placeholder="Select date" />
    <TextInput type="text" rightLabel="kWh" placeholder="Approx. energy consupmtion" />
    <SubmitButtonContainer>    <ActionButton onClick={switchToResulPage}>Submit</ActionButton> </SubmitButtonContainer>

  </ParameterFormContainer>
)

export default ParameterForm
