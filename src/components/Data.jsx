import dayjs from 'dayjs';
import ptBr from "dayjs/locale/pt-br";
import styled from 'styled-components';

export default function Data() {
    let date = dayjs().date();
    let month = dayjs().month() + 1;
    let weekDay = dayjs().day();
    let weekDayExtended = dayjs(weekDay).locale(ptBr).format('dddd').replace("-feira", "");
  
    if (date < 10) {
      date = 0 + date.toString();
    }
  
    if (month < 10) {
      month = 0 + month.toString();
    }
  
    return (
      <Paragraph>{weekDayExtended}, {date}/{month}</Paragraph>
    )
}

const Paragraph = styled.h1`
color: #126BA5;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
`