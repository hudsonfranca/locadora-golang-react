import styled from "styled-components";

export const DashboardComponent = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top:20px;
  background-color: #f7f7f7;
`

export const CardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding:60px;
  display: flex;
 flex-direction: row;
  justify-content:space-around;
  flex-wrap:wrap;
  align-items: center;
  margin-top: 20px;


   
  a, a:visited, a:hover, a:active {
   color: inherit;
   text-decoration:none;
   display: flex;
   flex-direction:column;
   justify-content:center;
   align-items: center;
  }
`

export const Card = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  align-items: center;
   border: 1px solid #ccc;
  border-radius:5px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0px 0px 14px -5px #000000;
  padding: 15px;
  margin-bottom:30px;
  
  p{
    color: #565959;
    font-size:1rem;
  }

  &:hover{
  background-color: #fff;
  }

`