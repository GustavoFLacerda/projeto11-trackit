import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import ProgressContext from "../contexts/ProgressContext";

export default function TodayCard(props){

    const [feito, setFeito] = useState(props.done);
    const { auth } = useContext(AuthContext);
    const { updateProgress } = useContext(ProgressContext);
    console.log(props.id);

    function definirfeito(){
        if(feito){
            setFeito(false);
            props.setDoneHabitsQuantity(props.doneHabitsQuantity - 1);
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/uncheck`, null, {
                headers:{
                    'Authorization': `Bearer ${auth.token}`
                }})
                .then(
                    (res) => {
                        updateProgress(props.doneHabitsQuantity - 1, props.habitsquantity);
                    }
                )
        }
        else{
            setFeito(true);
            props.setDoneHabitsQuantity(props.doneHabitsQuantity + 1);
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/check`, null, {
                headers:{
                    'Authorization': `Bearer ${auth.token}`
                }})
                .then(
                    (res) => {
                        updateProgress(props.doneHabitsQuantity + 1, props.habitsquantity);
                    }
                )
        }
        
    }

    return(
        <TodayCardStyle>
            <div>
                <h1>{props.name}</h1>
                <h4>Sequência atual: {props.currentSequence} dias</h4>
                <h4>Seu recorde: {props.highestSequence} dias</h4>
            </div>
            <Done onClick={definirfeito} feito={feito}>✓</Done>
        </TodayCardStyle>
    )
}

const Done = styled.button`
background: ${props => !props.feito ? "#EBEBEB !important" : "#8FC549 !important"};
width: 69px;
height: 69px;
display: flex;
justify-content: center;
align-items: center;
font-size: 40px;
color: white;
box-sizing: border-box;
border: 0;
font-weight: bold;
border-radius: 5px;
`

const TodayCardStyle = styled.div`
width:100%;
height: 94px;
display: flex;
box-sizing: border-box;
justify-content: space-between;
align-items: center;
background: white;
border-radius: 5px;
padding: 15px;

div{
    display: flex;
    flex-direction: column;
}

div h4{
    font-style: normal;
font-weight: 400;
font-size: 12.976px;
line-height: 16px;
color: #666666;
}

div h1{
    font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
margin-bottom: 7px;

color: #666666;
}
`