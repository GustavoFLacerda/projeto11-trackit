
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Header(){

    const { auth } = useContext(AuthContext);

    return(
        <HeaderContainer image={auth.image} >
            <h1>TrackIt</h1>
            <img />
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 15px; 
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
height: 70px;
position: fixed;
top: 0;

h1{

font-family: 'Playball';
font-style: normal;
font-weight: 400;
font-size: 38.982px;
line-height: 49px;
color: white;
}

img{
    background: url(${props => props.image});
    border-radius: 98.5px;
    width: 51px;
    height: 51px;
    margin-right: 15px;
}
`