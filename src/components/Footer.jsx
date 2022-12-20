import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Footer(){
    return(
        <FooterContainer>
            <Link to="/habitos">
                <button>Hábitos</button>
            </Link>
            <Link to="/hoje">
                <button>Hoje</button>
            </Link>
            <Link to="/historico">
                <button>Histórico</button>
            </Link>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
display: flex;
`