import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Footer(){
    return(
        <footer>
            <Link to="/habitos">
                Hábitos
            </Link>
            <Link to="/hoje">
                <button>Hoje</button>
            </Link>
            <Link to="/historico">
                Histórico
            </Link>
        </footer>
    )
}
