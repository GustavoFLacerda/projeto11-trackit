import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import styled from "styled-components";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import TodayCard from "../components/TodayCard.jsx"

export default function TodayPage(){
    const { auth } = useContext(AuthContext);
    const [today, setToday] = useState(undefined);

    useEffect(
        () => {
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",{
                headers:{
                    'Authorization': `Bearer ${auth.token}`
                }
            } )
            .then(
                (res) => {setToday(res.data)}
            )
        }
    , [])

    if(!today){
        return(
            <h1>Carregando...</h1>
        )
    }

    return(
        <>
        <Header/>
        <h1>Segunda, 17/05</h1>
        <h2>Nenhum hábito concluído ainda</h2>
        <TodayContainer>
            {today.map((t) => {
                return(
                    <TodayCard 
                    id={t.id} 
                    name={t.name} 
                    done={t.done} 
                    currentSequence={t.currentSequence}
                    highestSequence={t.highestSequence}
                    />
                )
            })}
        </TodayContainer>
        <Footer />
        </>
    )
}

const TodayContainer = styled.div``