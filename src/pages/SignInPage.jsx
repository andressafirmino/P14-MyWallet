import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {

  const { setName, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/`;
    const login = { email, password };
    const promise = axios.post(url, login);
    setDisabled(true);
    promise.then(response => {
      setName(response.data.name);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", email);
      /* localStorage.setItem("user", JSON.stringify({
        token: response.data.token,
        name: response.data.name,
        email: response.data.email
      })); */
      navigate('/home');
    })
    promise.catch(e => {
      console.log(e);
      alert(e.response.data.message);
      setDisabled(false);
    })
  }

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} data-test="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} data-test="password" />
        <button type="submit" disabled={disabled} data-test="sign-in-submit">
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
