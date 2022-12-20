import logo from "../assets/images/logo.svg";
import styled from "styled-components";

const Container = styled.div`
margin-top: 68px;
margin-bottom: 32px;
width: 80%;
display: flex;
justify-content: center;

`

const Logo = () => {
    return(
        <Container>
        <img src={logo} />
        </Container>
    )
}

export default Logo;

