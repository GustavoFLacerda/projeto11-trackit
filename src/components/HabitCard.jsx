import styled from "styled-components";
import axios from "axios";
import Dia from "../assets/Dia.jsx";
import { useNavigate } from "react-router-dom";

export default function HabitCard(props){

    const dias = ["D", "S", "T", "Q", "Q", "S", "S"];
    const navigate = useNavigate();

    function deletarhabito(){
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}`,{
            headers:{
                'Authorization': `Bearer ${props.token}`
            }})
        .then(() => {navigate("/habitos");window.location.reload()});
        //pegar da api de novo;
    }

    return(
       <Habito>
        <ion-icon name="trash-outline" onClick={deletarhabito}></ion-icon>
        <h1 onClick={() => {console.log(props.days)}}>{props.name}</h1>
        <div>
            {
                dias.map(
                    (d, index) => {
                        return(
                            <Dia selecionado={props.days.includes(index)}>{dias[index]}</Dia>
                        )
                    })
            }
        </div>
       </Habito>
    )
}


const Habito = styled.div`
height: 91px;
background: #FFFFFF;
border-radius: 5px;
width: 100%;
padding-left: 14px;
display: flex;
box-sizing: border-box;
justify-content: space-between;
position: relative;
flex-direction: column;
padding-bottom: 15px;
padding-top: 13px;

h1{
    color: #666666;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
}

div{
    display: flex;
    gap: 4px;
}
`;
