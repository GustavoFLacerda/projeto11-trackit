import styled from "styled-components";
import axios from "axios";

export default function HabitCard(props){

    const dias = ["D", "S", "T", "Q", "Q", "S", "S"];

    function deletarhabito(){
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.id}`,{
            headers:{
                'Authorization': `Bearer ${props.token}`
            }})
        .then(console.log);
        //pegar da api de novo;
    }

    return(
       <Habito>
        <DeleteButton onClick={deletarhabito}>Deletar</DeleteButton>
        <h1>{props.name}</h1>
        <div>
            {
                dias.map(
                    (d, index) => {
                        return(
                            <Dia selecionado={props.days.includes(dias[index])}>{dias[index]}</Dia>
                        )
                    })
            }
        </div>
       </Habito>
    )
}

const Dia = styled.button`
background: ${props => props.selecionado? "#CFCFCF" : "#D4D4D4" };
`

const DeleteButton = styled.button``;

const Habito = styled.div``;

