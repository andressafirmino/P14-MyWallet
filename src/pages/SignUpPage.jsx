import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export default function SignUpPage() {

  const { URL } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function signUp(e) {
    e.preventDefault();

    if(password !== confirmPassword) {
      return alert("As senhas são diferentes!");
    }

    const url = `${import.meta.env.VITE_API_URL}/cadastro`;
    const newSignUp = {name, email, password};
    const promise = axios.post(url, newSignUp);
    setDisabled(true);
    promise.then( () => navigate('/'));
    promise.catch(e => {
      alert(e.response.data.message);
      setDisabled(false);
    })
    
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" required value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} data-test="name"/>
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} data-test="email"/>
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} data-test="password"/>
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={disabled} data-test="conf-password"/>
        <button type='submit' disabled={disabled} data-test="sign-up-submit">
          {disabled ? (
            <ThreeDots width={32} height={21} border-radius={4.5} background-color="#A328D6" color="#FFFFFF" font-size={9} />
          ) : (
            <p>Cadastrar</p>
          )}
        </button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
