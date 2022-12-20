import { useEffect, useState } from "react";
import axios from "axios";
import HabitCard from "../components/HabitCard.jsx"
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import styled from "styled-components";
import Dia from "../assets/Dia.jsx"


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
         <ContainerForm onSubmit={cadastrarhabito}>
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
                 <div onClick={() => props.setCadastrando(false)}>Cancelar</div>
                 <button type="submit">Salvar</button>
             </ButtonContainer>
         </ContainerForm>
     )
 }




const ContainerForm = styled.form`
height: 180px;
width: 100%;
display: flex;
flex-direction: column;
background: white;
box-sizing: border-box;
padding-left: 19px;
justify-content: center;
border-radius: 5px;
padding-top: 18px;
padding-bottom: 15px;

div{
    display: flex;
    gap: 4px;
    margin-top: 8px;
}

input{
    width: 90%;
    height: 45px;
}
`

const ButtonContainer = styled.article`
display : flex;
gap: 23px;
width: 100%;
justify-content: flex-end;
padding-right: 16px;
box-sizing: border-box;
margin-top: 29px;

div{
    color: #52B6FF;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
}

button{
    border: 0;
    width: 84px;
    height: 35px;
    font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
}
`

 export default CadastrarHabito;