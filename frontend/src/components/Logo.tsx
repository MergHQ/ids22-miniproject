import styled from "styled-components"

const LogoContainer = styled.div`
  margin-top: 2em;
`

type Props = {
  container?: boolean
}

const Logo = ({ container }: Props) => {
  const Svg = () => (
    <svg width="77" height="139" viewBox="0 0 77 139" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M77 0L9.17721 75.8154H40.6L77 0Z" fill="#FFFDE6"/>
<path d="M0.632759 139L67.8204 62.6179L36.3987 62.8817L0.632759 139Z" fill="#FFFDE6"/>
</svg>

  )

  if (!container) {
    return <Svg />
  }

  return (
    <LogoContainer>
      <Svg />
    </LogoContainer>
  )
}

export default Logo
