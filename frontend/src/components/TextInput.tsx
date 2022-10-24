import styled from "styled-components";



const TextInput = () => styled.input<{rightLabel?: string}>`
  background: #FFFFFF;
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  border: none;
  font-weight: 700;
  font-size: 20px;
  color: #817F6F;
  height: 48px;
  width: 100%;
  margin: 1rem;
  padding: 0 2rem;
  position: relative;
  align-items: center;
  display: inline-flex;

  &:after {
    content: ${props => props.rightLabel ? `"${props.rightLabel}"` : ''};
    font-size: 20px;
  }
`

export default TextInput()
