import { BrowserRouter, Routes , Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HabitsPage from "./pages/HabitsPage.jsx";
import TodayPage from "./pages/TodayPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyle from "./assets/GlobalStyle.jsx"

export default function App(){

    return(
        <>
        <GlobalStyle />
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/habitos" element={<HabitsPage />} />
                <Route path="/cadastro" element={<SignUpPage />} />
                <Route path="/hoje" element={<TodayPage />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
        </>
    )
}

/*                 <Route path="/hoje" element={<TodayPage />} />
                <Route path="/historico" element={<HistoryPage />} />
                 <Route path="/cadastro" element={<SignUpPage />} />
                
                */