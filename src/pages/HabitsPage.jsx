import { useEffect, useState } from "react";
import axios from "axios";
import HabitCard from "../components/HabitCard.jsx"
import CadastrarHabito from "../components/CadastrarHabito.jsx"
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import styled from "styled-components";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

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
        <h1>Meus hábitos</h1>
        <button onClick={liberarcadastro}>+</button>
        <HabitsContainer>
            {
                cadastrando? 
                    <CadastrarHabito setHabitos={setHabitos} habitos={habitos} setCadastrando={setCadastrando} ></CadastrarHabito>

                 : 
                
                ((!cadastrando && habitos.length === 0 ? 
                    <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear</h1>
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
        <Footer />
        </>
    )
}

const HabitsContainer = styled.div``;


