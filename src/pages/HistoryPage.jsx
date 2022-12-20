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

    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", {
            headers:{
                'Authorization': `Bearer ${auth.token}`
            }
        })
        .then(
            (res) => {setHistoric(res.data)
            const doneHabits = res.data.filter(habit => habit.done);
            updateProgress(doneHabits.length, res.data.length);
            }
        )
    }, []);
    function completedAllHabits(habits) {
        return habits.filter(habit => habit.done).length !== 0;
      }
     
    if (historic === null) {
        return <h1>Carregando...</h1>
      }

    function getCorrectClassName({ date }) {
        const formattedDate = dayjs(date).format("DD/MM/YYYY");

        const successDays = historic.filter(day => completedAllHabits(day.habits));
    const failureDays = historic.filter(day => !successDays.includes(day));
    
        if (failureDays.find(x => x.day === formattedDate)) {
          return 'failure'
        }
    
        if (successDays.find(x => x.day === formattedDate)) {
          return 'success'
        }
      }

    return(
        <>
        <Header />
        <Main>
            <StyledH1>Histórico</StyledH1>
            <StyledCalendar 
                      onChange={setSelectedDate}
                      value={selectedDate}
                      tileClassName={getCorrectClassName}
                      locale="pt-BR"
                      formatDay={(_, date) => dayjs(date).format('DD')}
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