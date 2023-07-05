import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {

  const { setToken, setName, URL } = useContext(AuthContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ disabled, setDisabled ] = useState(false);
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();

    const url = `${URL}`;
    const login = {email, password};

    const promise = axios.post(url, login);
    setDisabled(true);
    promise.then( response => {
      setToken(response.data.token);
      setName(response.data.name);
      navigate('/home');
    })
  }

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} />
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} />
        <button type="submit" disabled={disabled}>
          {disabled ? (
            <ThreeDots width={32} height={21} border-radius={4.5} background-color="#A328D6" color="#FFFFFF" font-size={9} />
          ) : (
            <p>Entrar</p>
          )}
        </button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
