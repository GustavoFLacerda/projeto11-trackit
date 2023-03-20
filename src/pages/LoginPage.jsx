import { Navigate, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Logo from "../assets/Logo.jsx";
import { ThreeDots } from 'react-loader-spinner';


export default function LoginPage(){
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const { auth, login } = useContext(AuthContext);
    

    function fazerlogin(e){
        e.preventDefault();
        setLoading(true);
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", dados)
        .then(
            (res) => {
                login(res.data);
                navigate("/hoje");
            }
        )
        .catch(
            (err) => {
                setLoading(false);
                alert("Ocorreu um erro, tente novamente.")
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
            <input type="text" disabled={loading} name="email" data-test="email-input" placeholder="email" onChange={alterardados}></input>
            <input type="password" disabled={loading} data-test="password-input" name="password" placeholder="senha" onChange={alterardados}></input>
            <button type="submit" data-test="login-btn" disabled={loading}>
               {
            loading
              ? <ThreeDots color="#FFFFFF" height={50} width={50} />
              : "Entrar"
               }
            </button>
        </form>
        <Link to="cadastro" data-test="signup-link">
            Não tem uma conta? Cadastre-se!
        </Link>
        </>
    )
}


