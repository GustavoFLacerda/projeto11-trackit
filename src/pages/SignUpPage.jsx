import { Navigate, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../assets/Logo.jsx";
import { ThreeDots } from 'react-loader-spinner';

export default function SignUpPage(){
   
    const [cadastro, setCadastro] = useState({email: "", password: "", name: "", image:""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        console.log(cadastro)
    }, [cadastro])

    return(
        <>
        <Logo />
        <form onSubmit={cadastrar}>
            <input type="email" name="email" placeholder="email" onChange={alterardados}></input>
            <input type="password" name="password" placeholder="senha" onChange={alterardados}></input>
            <input type="text" name="name" placeholder="nome" onChange={alterardados}></input>
            <input type="text" name="image" placeholder="foto" onChange={alterardados}></input>
            <button type="submit" disabled={loading ? true : false}>
            {
            loading
              ? <ThreeDots color="#FFFFFF" height={50} width={50} />
              : "Cadastrar"
               }</button>
        </form>
        <Link to="/">
            Já tem uma conta? Faça login!
        </Link>
        </>
    )
}
