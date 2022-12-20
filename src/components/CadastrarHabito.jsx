import { useEffect, useState } from "react";
import axios from "axios";
import HabitCard from "../components/HabitCard.jsx"
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import styled from "styled-components";


const CadastrarHabito = (props) => {

    const [days, setDays] = useState([]);
    const [dados, setDados] = useState({});
    const dias = ["D", "S", "T", "Q", "Q", "S", "S"];
    const { auth } = useContext(AuthContext);
 
    function selecionardia(index){
     if(days.includes(index)){
           let filtered = days.filter((d) => d === index);
           setDays([...filtered]);
     }
     else{
         let newdays = [...days, index];
         newdays.sort((d1, d2) => d1 > d2? -1 : 1);
         setDays([...newdays]);
     }
    }
 
    function cadastrarhabito(e){
       e.preventDefault();
       axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", dados, {
         headers:{
             'Authorization': `Bearer ${auth.token}`
         }})
       .then(
         (res) => {
             props.setHabitos([...props.habitos, res.data]);
             props.setCadastrando(false);
         }
       )
    }
    
 
     return(
         <form onSubmit={cadastrarhabito}>
             <input type="text" onChange={(e) => setDados({name: e.target.value, days})} name="name" placeholder="nome do hábito" />
             <div>
                  {
                     dias.map((d, index) => {
                         return(
                             <Dia onClick={selecionardia} selecionado={days.includes(dias[index])}>{dias[index]}</Dia>
                         )
                     })
                  }
             </div>
             <ButtonContainer>
                 <button onClick={() => props.setCadastrando(false)}>Cancelar</button>
                 <button type="submit">Salvar</button>
             </ButtonContainer>
         </form>
     )
 }

 const Dia = styled.div`
background: ${props => props.selecionado? "#CFCFCF" : "#D4D4D4" };
`

const ButtonContainer = styled.div`
display : flex;
flex-direction: column;
`


 export default CadastrarHabito;