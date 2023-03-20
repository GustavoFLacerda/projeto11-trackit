import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  let persistencia = localStorage.getItem("auth");
  persistencia = JSON.parse(persistencia);
  const [auth, setAuth] = useState(persistencia);

  function login(dados) {
    setAuth(dados);
    localStorage.setItem("auth", JSON.stringify(dados));
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;