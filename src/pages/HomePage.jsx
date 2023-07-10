import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const { name, userEmail, setType, token } = useContext(AuthContext);
  const [operations, setOperations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/home`;
    const body = {user: userEmail}
    console.log(typeof body)
    axios.get(url, body)
      .then(response => {
        const arrayOperations = response.data.operations;
        setCounter(arrayOperations.lengh);
        arrayOperations.reverse();
        console.log(arrayOperations);
        setOperations(arrayOperations);
      })
      .catch(e => alert(e.response.data));
  }, [])
  console.log(token)
  console.log(typeof token)
  function logout() {
    const url = `${import.meta.env.VITE_API_URL}/home`;
    console.log(token)
    const token = {token: token}
    axios.delete(url, token)
    .then(() => {
      navigate("/");
    })
    .catch(e => console.log(e.response));
  }
  function cashOutflow() {
    setType("entrada");
    navigate("/nova-transacao/entrada");
  }

  function cashIncome() {
    setType("saida");
    navigate("/nova-transacao/saida");
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {operations.length === 0 && (
            <NoItem>
              <div>
                <p>Não há registros de</p>
                <p> entrada ou saída</p>
              </div>
            </NoItem>
          )}

          {operations.length > 0 && (
            <>
              {operations.map((oper) => {
                return (
                  <ListItemContainer key={oper._id}>
                    <div>
                      <div>
                        <span>{oper.dateNow} </span>
                        <p><strong data-test="registry-name">{oper.description}</strong></p>
                      </div>
                      <Value color={oper.type} data-test="registry-amount">{oper.value}</Value>
                    </div>
                  </ListItemContainer>
                )
              })}

              {/*  <div>
                 <span>15/11</span>
                 <strong>Salário</strong>
               </div>
               <Value color={"positivo"}>3000,00</Value> 
                <article>
                 <strong>Saldo</strong>
                 <Value color={"positivo"}>2880,00</Value>
               </article>  */}
            </>
          )}


        </ul>

      </TransactionsContainer>

      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle onClick={cashOutflow} data-test="new-income" />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle onClick={cashIncome} data-test="new-expense" />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  width: 171px;
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  width: calc(100vw);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  div {
    width: calc(100vw);
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: calc(100vw - 80px);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
      color: #c6c6c6;
      margin-right: 10px;
    }
    } 
    
  }
`
const NoItem = styled.li`
  height: calc(100vw);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin: auto;
    align-items: center;
    p {
      color: #c6c6c6;
    }
  }
`