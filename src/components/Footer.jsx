import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from "react";
import ProgressContext from "../contexts/ProgressContext";

export default function Footer(){

    const { progress } = useContext(ProgressContext);

    return(
        <footer>
            <Link to="/habitos">
                Hábitos
            </Link>
            <Link to="/hoje">
               <CircularProgressbar value={progress} 
               background
               backgroundPadding={6}
               styles={buildStyles({
                 backgroundColor: "#52B6FF",
                 textColor: "#fff",
                 pathColor: "#fff",
                 trailColor: "transparent"
               })}
               text="Hoje" />
            </Link>
            <Link to="/historico">
                Histórico
            </Link>
        </footer>
    )
}
