import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import styled from "styled-components";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import TodayCard from "../components/TodayCard.jsx"
import Main from "../assets/Main.jsx";
import Data from "../components/Data.jsx"
import ProgressContext from "../contexts/ProgressContext";

export default function TodayPage(){
    const { auth } = useContext(AuthContext);
    const [today, setToday] = useState(undefined);
    const { progress, updateProgress } = useContext(ProgressContext);
    const [ habitsquantity, setHabitsQuantity ] = useState(0)
    const [doneHabitsQuantity, setDoneHabitsQuantity] = useState(0);

    useEffect(
        () => {
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",{
                headers:{
                    'Authorization': `Bearer ${auth.token}`
                }
            } )
            .then(
                (res) => {setToday(res.data);
                    console.log(res.data)
                    const filtrado = res.data;
                    const doneHabits = filtrado.filter(habit => habit.done);
                    console.log(doneHabits);
                    setHabitsQuantity(filtrado.length);
                    updateProgress(doneHabits.length, filtrado.length);
                    setDoneHabitsQuantity(doneHabits.length);
                }
            )
        }
    , [])

    if(!today){
        return <h1>Carregando...</h1>
    }

    return(
        <>
        <Header />
        <Main>
        <TodayInfo>
            <Data data-test="today" />
            <Subtitle data-test="today-counter" doneHabitsQuantity={doneHabitsQuantity}>
            {
               doneHabitsQuantity === 0
              ? "Nenhum hábito concluído ainda"
              : `${progress.toFixed(0)}% dos hábitos concluídos`
            }
            </Subtitle>
        </TodayInfo>
        <TodayContainer>
            {
            today.map((t) => {
                return(
                    <TodayCard 
                    id={t.id} 
                    doneHabitsQuantity={doneHabitsQuantity}
                    setDoneHabitsQuantity={setDoneHabitsQuantity}
                    habitsquantity={habitsquantity}
                    name={t.name} 
                    done={t.done}
                    currentSequence={t.currentSequence}
                    highestSequence={t.highestSequence}
                    />
                )
            })}
        </TodayContainer>
        </Main>
        <Footer />
        </>
    )
}

const TodayContainer = styled.div`
width: 90%;
display: flex;
flex-direction: column;
gap: 10px;
`

const TodayInfo = styled.div`
width: 90%;
display: flex;
flex-direction: column;
margin-top: 28px;
margin-bottom: 28px;

`
const Subtitle = styled.h2`
color: ${(props) => props.doneHabitsQuantity !== 0 ? "#8FC549" : "#BABABA"};
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
`