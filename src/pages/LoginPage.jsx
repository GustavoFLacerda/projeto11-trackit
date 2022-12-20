import { Navigate, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Logo from "../assets/Logo.jsx";


export default function LoginPage(){
    const [loading, setLoading] = useState("notloading");
    const [dados, setDados] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const { auth, login } = useContext(AuthContext);
    

    function fazerlogin(e){
        e.preventDefault();
        setLoading("loading");
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", dados)
        .then(
            (res) => {
                login(res.data);
                navigate("/hoje");
            }
        )
    }

    useEffect(() => {
        if (auth && auth.token) {
          navigate("/hoje");
        }
      }, []);

    useEffect(() => {
        console.log(auth)
    }, [auth]);

    function alterardados(e){
        let newobj = {}
        for(const i in dados){
            if(i === e.target.name){
                newobj[i] = e.target.value;
            }
            else{
                newobj[i] = dados[i];
            }
        }
        setDados({...newobj});

    }

    useEffect(() => {
        console.log(dados);
    }, [dados])

    return(
        <>
        <Logo />
        <form onSubmit={fazerlogin}>
            <input type="text" name="email" placeholder="email" onChange={alterardados}></input>
            <input type="password" name="password" placeholder="senha" onChange={alterardados}></input>
            <button type="submit">Entrar</button>
        </form>
        <Link to="cadastro">
            Não tem uma conta? Cadastre-se!
        </Link>
        </>
    )
}


