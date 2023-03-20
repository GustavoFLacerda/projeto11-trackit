import { Navigate, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Logo from "../assets/Logo.jsx";
import { ThreeDots } from 'react-loader-spinner';
import AuthContext from "../contexts/AuthContext.jsx";

export default function SignUpPage(){
   
    const [cadastro, setCadastro] = useState({email: "", password: "", name: "", image:""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext)

    function cadastrar(e){
        e.preventDefault();
        setLoading(true);
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", cadastro)
        .then(
            (res) => {
                navigate("/")
            }
        )
        .catch(
            (err) => {
                setLoading(false);
                alert("Ocorreu um erro, tente novamente.")
            }
        )
        //Bad request 422
    }

    function alterardados(e){
        let newobj = {}
        for(const i in cadastro){
            if(i === e.target.name){
                newobj[i] = e.target.value;
            }
            else{
                newobj[i] = cadastro[i];
            }
        }
        setCadastro({...newobj});

    }

    useEffect(() => {
        if (auth && auth.token) {
          navigate("/hoje");
        }
      }, []); 

    return(
        <>
        <Logo />
        <form onSubmit={cadastrar}>
            <input type="email" disabled={loading} data-test="email-input" name="email" placeholder="email" onChange={alterardados}></input>
            <input type="password" disabled={loading} data-test="password-input" name="password" placeholder="senha" onChange={alterardados}></input>
            <input type="text" disabled={loading} data-test="user-name-input" name="name" placeholder="nome" onChange={alterardados}></input>
            <input type="text" disabled={loading} name="image" data-test="user-image-input" placeholder="foto" onChange={alterardados}></input>
            <button type="submit" data-test="signup-btn" disabled={loading ? true : false}>
            {
            loading
              ? <ThreeDots color="#FFFFFF" height={50} width={50} />
              : "Cadastrar"
               }</button>
        </form>
        <Link to="/" data-test="login-link">
            Já tem uma conta? Faça login!
        </Link>
        </>
    )
}
