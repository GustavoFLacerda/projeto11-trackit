import { useEffect, useState } from "react";
import axios from "axios";
import HabitCard from "../components/HabitCard.jsx"
import CadastrarHabito from "../components/CadastrarHabito.jsx"
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import styled from "styled-components";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Main from "../assets/Main.jsx";

export default function HabitsPage(){

    const [cadastrando, setCadastrando] = useState(false);
    const [habitos, setHabitos] = useState(undefined);
    const { auth } = useContext(AuthContext);



    useEffect(
        () => {
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                headers:{
                    'Authorization': `Bearer ${auth.token}`
                }
            })
            .then(
                (res) => {
                    setHabitos(res.data);
                }
            )
        }
    , [])

    if(!habitos){
        return(
            <h1>Carregando...</h1>
        )
    }

    function liberarcadastro(){
        if(cadastrando){
            setCadastrando(false)
        }
        else{
            setCadastrando(true);
            console.log(!habitos);
        }
    }

    function deletarhabito(id){
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,{
            headers:{
                'Authorization': `Bearer ${auth.token}`
            }})
    }

    return(
        <>
        <Header/>
        <Main>
        <Container1>
            <h1>Meus hábitos</h1>
            <button onClick={liberarcadastro}>+</button>
        </Container1>
        <HabitsContainer>
            {
                cadastrando? 
                    <CadastrarHabito setHabitos={setHabitos} habitos={habitos} setCadastrando={setCadastrando} ></CadastrarHabito>

                 : 
                
                ((!cadastrando && habitos.length === 0 ? 
                    <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1>
                    :
                    <>
                    {habitos.map(
                        (h) => {
                            return(
                                <HabitCard name={h.name} days={h.days} id={h.id} token={auth.token}/>
                            )
                        }
                    )}
                    </>
                    ))
            }
            
        </HabitsContainer>
        </Main>
        <Footer />
        </>
    )
}

const HabitsContainer = styled.div`
width: 90%;
display: flex;
flex-direction: column;
gap: 10px;

h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
}
`;

const Container1 = styled.div`
display: flex;
justify-content: space-between;
width: 90%;
height: 35px;
align-items: center;
margin-top: 21px;
margin-bottom: 28px;

h1{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
}

button{
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 26.976px;
    line-height: 34px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
}
`


