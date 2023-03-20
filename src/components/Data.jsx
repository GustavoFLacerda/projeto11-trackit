import styled from 'styled-components';

export default function Data() {
    let data = new Date();
    let month = data.getMonth() + 1;
    let diasemana = data.getDay();
    let diames = data.getDate();
    let dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

  
    return (
      <Titulo>{dias[diasemana]}, {diames}/{"0" + month}</Titulo>
    )
}

const Titulo = styled.h1`
color: #126BA5;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
`