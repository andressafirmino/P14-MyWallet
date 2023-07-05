import styled from "styled-components"
import { ThreeDots } from "react-loader-spinner";

export default function ThreeDotsStyle() {
    return <StyleLoading><ThreeDots background-color="#52B6FF" color="#FFFFFF" /></StyleLoading>
}

const StyleLoading = styled.div`
    width: 303px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4.5x;
    opacity: 70%;
`   