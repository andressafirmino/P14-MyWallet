import { useContext, useState } from "react";
import styled from "styled-components"
import { AuthContext } from "../context/auth";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {

  const { type, user } = useContext(AuthContext);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function newTransaction(e) {
    e.preventDefault();

    let newValue = value.replace(/[^0-9.,]/g, '');

    if (/^[0-9.,]+$/.test(newValue)) {

      let numberFormat = parseFloat(newValue.replace(',', '.')).toFixed(2);
      setValue(numberFormat);
    } else {
      setValue('');
      return alert('O campo valor precisa ser um número. Por favor, insira um valor válido.');
    }

    if (description.trim() === '') {
      return alert('O campo não foi preenchido! Por favor, insira uma descrição para a transação.');
    }
    setDisabled(true);
    const url = `${import.meta.env.VITE_API_URL}/nova-transacao/${type}`;
    //const newTransaction = { value, description, user };
    const auth = {
      headers: { authorization: `Bearer ${user.token}` }
    }
    const body = { value, description, email: user.email }
    axios.post(url, body, auth)
      .then(() => {
        navigate('/home');
      })
      .catch(e => {
        console.log(e);
        alert(e.response);
        setDisabled(false);
      })
  }

  return (

    <TransactionsContainer>
      <h1>Nova {type}</h1>
      <form onSubmit={newTransaction}>
        <input placeholder="Valor" type="text" required value={value} onChange={(e) => setValue(e.target.value)} disabled={disabled} data-test="registry-amount-input" />
        <input placeholder="Descrição" type="text" required value={description} onChange={(e) => setDescription(e.target.value)} disabled={disabled} data-test="registry-name-input" />
        <button type="submit" disabled={disabled} data-test="registry-save">
          {disabled ? (
            <ThreeDots width={32} height={21} border-radius={4.5} background-color="#A328D6" color="#FFFFFF" font-size={9} />
          ) : (
            <p>Salvar {type}</p>
          )}
        </button>
        {/* <button>Salvar {type}</button> */}
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
