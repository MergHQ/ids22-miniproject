import styled from "styled-components";
import Logo from "./Logo";

const NavbarContainer = styled.nav`
  height: 60px;
  width: 100%;
  margin: 0 3rem;
  display: flex;
  align-items: center;
`

const ResultText = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 113.52%;
  letter-spacing: 0.4em;
  color: #817F6F;
`

const Navbar = () => (
  <NavbarContainer>
    <Logo height={48} />
    <ResultText>RESULTS</ResultText>
  </NavbarContainer>
)

export default Navbar
