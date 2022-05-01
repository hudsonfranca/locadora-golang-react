import styled from "styled-components";

export const CarsRentedComponent = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  background-color: #f7f7f7;
  padding-top:80px;
  padding-bottom:30px;

  h3{
    margin-bottom:20px;
  }
`


export const CardContainer = styled.div`
  width: 60%;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction:column;
  background-color: #fff;
  padding: 30px;
`

export const Card = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  padding: 30px;
  border: 1px solid black;
  border-radius:5px;
  border-top:10px solid #FEBB01;
  box-shadow: 0px 0px 14px -5px #000000;
  margin-bottom:20px;

  @media (max-width:721px) {
    h3{
      margin-bottom:20px;
    }
  }
`

export const CardBody = styled.div`
  width: 100%;
  min-height: 100%;
  display:grid;
  grid-template-columns:1fr 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  img{
    width: 100%;
    height: 100%;
  }

  div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-evenly;
    align-items: center;
  }

  @media (max-width:721px) {
    display: flex;
    flex-direction:column;
    justify-content: space-evenly;
    align-items: center;

    img{
      margin:20px;
    }
  }
`

export const Specifications = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    align-items: center;

    @media (max-width:721px) {
      flex-direction:column;
      justify-content: space-between;
    }
`