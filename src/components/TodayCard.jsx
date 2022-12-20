import styled from "styled-components";
import axios from "axios";
import { useState } from "react";


export default function TodayCard(props){

    const [feito, setFeito] = useState(props.done);

    function definirfeito(){
        if(feito){
            setFeito(false)
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/uncheck`, {
                headers:{
                    'Authorization': `Bearer ${props.token}`
                }})
        }
        else{
            setFeito(true);
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}/check`, {
                headers:{
                    'Authorization': `Bearer ${props.token}`
                }})
        }
        
    }

    return(
        <TodayCardStyle>
            <div>
                <h1>{props.name}</h1>
                <h4>{props.currentSequence}</h4>
                <h4>{props.highestSequence}</h4>
            </div>
            <Done onClick={definirfeito} feito={feito}><img /></Done>
        </TodayCardStyle>
    )
}

const Done = styled.button`
background: ${props => !props.feito ? "#EBEBEB" : "#8FC549"}
`

const TodayCardStyle = styled.div`
width: 900px;
height: 200px;
`