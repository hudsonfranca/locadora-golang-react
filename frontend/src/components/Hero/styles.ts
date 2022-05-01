import styled from 'styled-components'
import img from '../../assets/banner.png'

export const HeroContainer = styled.div`
 width: 100%;
  height: 100vh;
`

export const Banner = styled.div`
  width: 100%;
  height: 100vh;
  background-image:url(${img});
  background-position:center;
  background-repeat:no-repeat;
  background-size:cover;
  object-fit: cover;
  position:relative;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  /* z-index:0; */

 &::after{
  content: "";
  width: 100%;
  height: 100vh;
  background:linear-gradient(rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.1));
  position:absolute;
  z-index:1;
 }

 h1{
  position:absolute;
  z-index:6;
  top: 25%;
  color:#ffff;
  font-size:3rem;
 }


 @media (max-width: 378px) {
   h1{
      font-size: 2.5rem;
    }
  }

  
 @media (max-width: 315px) {
   h1{
      font-size: 2rem;
    }
  }
`

export const FormContainer = styled.div`
  width: 80%;
  min-height: 17%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  border-radius:5px;
  padding: 20px;
  background-color: #FEBB02;
  position:absolute;
  z-index:5;


  form{
  width: 100%; 
  height: 100%; 
  display: grid;
  grid-template-columns:1fr 1fr auto;
  gap:20px;
  justify-content: center;
  align-items: center;
  border-radius:5px;

  button{
    align-self:flex-end;
  }
 }

 @media (max-width: 609px) {

  form{
    display: flex;
    flex-direction: column;
  }
   top: 40%;
  }
`

export const FildContainer = styled.div<{ valid: boolean }>`
width:100%;
height: auto;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:flex-start;

label{
  margin:3px 0 3px 0;
  padding: 5px;
  font-size:1rem;
}

input{
    width: 100%;
    height: 40px;
    border:${(props) => props.valid ? '1px solid #ccc' : '1px solid tomato'};
    border-radius:5px;
    padding: 5px;

    &:focus{
      outline: none;
      border-width:2px;
    }
  }
`