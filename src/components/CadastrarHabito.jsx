import { useEffect, useState } from "react";
import axios from "axios";
import HabitCard from "../components/HabitCard.jsx"
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import styled from "styled-components";
import Dia from "../assets/Dia.jsx"
import ProgressContext from "../contexts/ProgressContext.jsx";
import { ThreeDots } from 'react-loader-spinner';


const CadastrarHabito = (props) => {

    const [days, setDays] = useState([]);
    const [dados, setDados] = useState({});
    const dias = ["D", "S", "T", "Q", "Q", "S", "S"];
    const { auth } = useContext(AuthContext);
    const { progress, updateProgress } = useContext(ProgressContext);
    const [loading, setLoading] = useState(false);
 
    function selecionardia(index){
     if(days.includes(index)){
           let filtered = days.filter((d) => d !== index);
           setDays([...filtered]);
           setDados({...dados, days: filtered});
     }
     else{
         let newdays = [...days, index];
         newdays.sort((d1, d2) => d1 > d2? 1 : -1);
         setDays([...newdays]);
         setDados({...dados, days: newdays})
     }
    }

    useEffect(() => {
        console.log(days)
    }, [days])
 
    function cadastrarhabito(e){
       e.preventDefault();
       setLoading(true);
       axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", dados, {
         headers:{
             'Authorization': `Bearer ${auth.token}`
         }})
       .then(
         (res) => {
             props.setHabitos([...props.habitos, res.data]);
             props.setCadastrando(false);
             setLoading(false);
             console.log(dados);
             axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`,{
                headers:{
                  'Authorization': `Bearer ${auth.token}`
                 }})
                .then(
                    (res) => {
                        const filtrado = res.data;
                        const doneHabits = filtrado.filter(habit => habit.done);
                        updateProgress(doneHabits.length, filtrado.length);
                        console.log(progress);
                    }
                )
                .catch(
                    (err) => {
                        setLoading(false);
                        alert("Ocorreu um erro");
                    }
                )

         }
       )
    }
    
 
     return(
         <ContainerForm onSubmit={cadastrarhabito} data-test="habit-create-container">
             <input disabled={loading} data-test="habit-name-input" type="text" onChange={(e) => {setDados({name: e.target.value, days}); console.log({name: e.target.value, days})}} name="name" placeholder="nome do hábito" />
             <div>
                  {
                     dias.map((d, index) => {
                         return(
                             <DiaCadastroCard name={dias[index]} id={index} selecionardia={selecionardia} selecionado={days.includes(index)}></DiaCadastroCard>
                         )
                     })
                  }
             </div>
             <ButtonContainer>
                 <div data-test="habit-create-cancel-btn" onClick={() => props.setCadastrando(false)} disabled={loading}>Cancelar</div>
                 <button data-test="habit-create-save-btn" type="submit" disabled={loading}>
                 {
                   loading
                   ? <ThreeDots color="#FFFFFF" height={50} width={50} />
                   : "Salvar"
               }
                 </button>
             </ButtonContainer>
         </ContainerForm>
     )
 }


const DiaCadastroCard = (props) => {
    return(
        <Dia disabled={loading} data-test="habit-day" onClick={() => props.selecionardia(props.id)} selecionado={props.selecionado}>{props.name}</Dia>
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