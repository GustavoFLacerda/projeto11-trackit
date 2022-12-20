
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Header(){

    const { auth } = useContext(AuthContext);

    return(
        <HeaderContainer>
            <h1>TrackIt</h1>
            <img src={auth.image} />
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
width: 100%;
display: flex;
padding: 0 15px;
justify-content: space-between;
`