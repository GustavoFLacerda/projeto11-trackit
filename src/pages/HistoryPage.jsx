import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import ProgressContext from "../contexts/ProgressContext";
import styled from "styled-components";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Main from "../assets/Main.jsx";
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';

export default function HistoryPage(){

    const [historic, setHistoric] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { auth } = useContext(AuthContext);
    const { updateProgress } = useContext(ProgressContext);
    const [donedays, setDoneDays] = useState([]);
    const historicofeito = false;

    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", {
            headers:{
                'Authorization': `Bearer ${auth.token}`
            }
        })
        .then(
            (res) => {setHistoric(res.data);
                const newar = res.data.filter(day => day.habits.done === true);
                //é array mais é necessario
            }
        )
    }, []);

    return(
        <>
        <Header />
        <Main>
        <HistoryContainer>
            <StyledH1>Histórico</StyledH1>
            {
                !historicofeito ? <Subtitle>Em breve você poderá ver o histórico dos seus hábitos aqui!</Subtitle> : 
            <StyledCalendar 
                      locale="pt-BR"
                      tileClassName={
                        ({ activeStartDate, date, view } ) => 
                        view === 'month' && donedays.includes(dayjs(date).format('DD')) ? 'done' : 'notdone'
                    }
                      onClickDay={(value) => alert('Clicked day: ' +  value)}
            />
            }
        </HistoryContainer>
        </Main>
        <Footer />
        </>
    )
}

const StyledH1 = styled.h1`
color: #126BA5;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
margin-top: 28px;
margin-bottom: 11px;
align-self: flex-start;

`

const StyledCalendar = styled(Calendar)`
margin-top: 12px;
border: none;
border-radius: 10px;
width: 90%;
margin-bottom: 30px;
background: white;
padding: 10px;

button{
    background: ${props => props.tileClassName === 'sucess' ? "green" : (props.tileClassName === "failure" ? "red" : "white")}
}
`

const Subtitle = styled.h1`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;

`

const HistoryContainer = styled.div`
width: 90%;
display: flex;
flex-direction: column;
gap: 10px;

`