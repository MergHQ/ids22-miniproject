import styled from "styled-components";
import Logo from "./Logo";

const NavbarContainer = styled.nav`
  height: 60px;
  width: 100%
`

const Navbar = () => (
  <NavbarContainer>
    <Logo />
  </NavbarContainer>
)

export default Navbar
