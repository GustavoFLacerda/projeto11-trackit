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
        <TodayCardStyle data-test="today-habit-container">
            <div>
                <h1 data-test="today-habit-name">{props.name}</h1>
                <SequenceC feito={feito}
                data-test="today-habit-sequence">Sequência atual: <span>{props.currentSequence} dias</span></SequenceC>
                 <SequenceH current={props.currentSequence} 
                highest={props.highestSequence}
                data-test="today-habit-record">Seu recorde: <span>{props.highestSequence} dias</span></SequenceH>
            </div>
            <Done data-test="today-habit-check-btn" onClick={definirfeito} feito={feito}>✓</Done>
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

const SequenceC = styled.h4`
font-style: normal;
font-weight: 400;
font-size: 12.976px;
line-height: 16px;
color: #666666;

span{
   font-style: normal;
   font-weight: 400;
   font-size: 12.976px;
   line-height: 16px;
   color: ${props => props.feito === true ? "#8FC549" : "#666666"};
}

`

const SequenceH = styled.h4`
font-style: normal;
font-weight: 400;
font-size: 12.976px;
line-height: 16px;
color: #666666;

span{
   font-style: normal;
   font-weight: 400;
   font-size: 12.976px;
   line-height: 16px;
   color: ${props => props.current >= props.highest?"#8FC549" : "#666666"};
}

`