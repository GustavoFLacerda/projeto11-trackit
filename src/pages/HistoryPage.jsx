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

export default function HistoryPage(){

    const [historic, setHistoric] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { auth } = useContext(AuthContext);
    const { updateProgress } = useContext(ProgressContext);
    const [donehabits, setDoneHabits] = useState([]);

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
            <StyledH1>Histórico</StyledH1>
            <StyledCalendar 
                      locale="pt-BR"
                      formatDay={(_, date) => dayjs(date).format('DD')}
                      tileClassName={({ date } ) => donehabits.includes(dayjs(date).format('DD')) ? 'done' : 'notdone'}
            />
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