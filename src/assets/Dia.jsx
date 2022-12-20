import styled from "styled-components";

const Dia = styled.div`
background: ${props => props.selecionado? "#C5C5C5 !important" : "#FFFFFF !important" };
width: 30px;
height: 30px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
display: flex;
align-items: center;
justify-content: center;
color: ${props => props.selecionado? "#FFFFFF" : "#DBDBDB"};
`

export default Dia;