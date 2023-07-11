import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const {setType, name, setName, email, setEmail, token, setToken } = useContext(AuthContext);
  const [operations, setOperations] = useState([]);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {   
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    if(storedToken) {
      setToken(storedToken);
      setName(storedName);
      setEmail(storedEmail);
    }
    console.log(email);
    const url = `${import.meta.env.VITE_API_URL}/home`;
    axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
      params: { email }
    })
      .then(response => {
        console.log(response);
        const arrayOperations = response.data.operations;
        arrayOperations.reverse();
        console.log(arrayOperations);
        setOperations(arrayOperations);
      })
      .catch(e => alert(e.response.data));
  }, [])

  useEffect(() => {
    total();
  }, [operations, counter]); 

  
  function total() {

    let balance = 0;
    operations.forEach(item => {
      if (item.type === "saida") {
        balance -= parseFloat(item.value);
      } else if (item.type === "entrada") {
        balance += parseFloat(item.value);
      }
    });
    const balanceTotal = balance.toFixed(2);
    setCounter(balanceTotal);
  }

  function logout() {
    const url = `${import.meta.env.VITE_API_URL}/home`;
    axios.delete(url, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch(e => alert(e.response.data));
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
      
        <BiExit onClick={logout} data-test="logout"/>
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
                    <span color="#c6c6c6">{oper.dateNow} </span>
                    <strong data-test="registry-name" >{oper.description}</strong>
                    <Value color={oper.type} data-test="registry-amount">{parseFloat(oper.value).toFixed(2)}</Value>
                  </ListItemContainer>
                )
              })}

              <article>
                <strong>Saldo</strong>
                {counter > 0 && (
                  <Value color={"entrada"} data-test="total-amount">{counter}</Value>
                )}
                {counter < 0 && (
                  <Value color={"saida"} data-test="total-amount">{counter}</Value>
                )}
              </article>
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
  overflow-y: auto;
  position: relative;
  margin-top: 20px;
  article {
    width: calc(100vw - 80px);
    margin: 0 15px 10px;
    display: flex;
    justify-content: space-between; 
    position: fixed;
    bottom: 150px;
    left: 20px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  margin-bottom: 20px;
    div span {
      color: #c6c6c6;
      margin-right: 1px;
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