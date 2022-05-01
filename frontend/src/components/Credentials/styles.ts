import styled, { css } from 'styled-components'
import { UserPlus } from '@styled-icons/boxicons-solid'


export const Card = styled.div<{ isActive: boolean }>`
  ${(props) => {
    if (props.isActive) {
      return css`
      width:558px;
      height: 200px;
      border-radius:5px;
      background-color:#ffff;
      position: absolute;
      top: 65px;
      right: 0%;
      z-index: 2;
      display: grid;
      grid-template-columns:1fr 1fr;
      padding: 20px;
      gap: 20px;
      box-shadow: 0px 0px 14px -5px #000000;

      @media (max-width:557px) {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: column;
    }

  @media (max-width:346px) {
   form{
    height: 460px;
   }
  }

      `
    } else {
      return css`
      display: none;
      `
    }
  }}


`;

export const ArrowUp = styled.div`
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #ffff;
  position: absolute;
  left: 85%;
  top:-2%;
`

export const LoginForm = styled.div`
border-radius:5px;
h3{
  z-index: 3;
  text-align:center;
}
 form{
  width: 100%; 
  height: 100%; 
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  align-items: center;
  border-radius:5px;

  input{
    width: 100%;
    height: 40px;
    border:1px solid #ccc;
    border-radius:5px;
    padding: 5px;

    &:focus{
      outline: none;
      border-width:2px;
    }
  }
 }

 @media (max-width:557px) {
   form{
     margin-bottom:40px;
   }
  }


`

export const CreateAccount = styled.div`
  width: 100%; 
  height: 100%; 

  a{
    text-decoration: none;
  }

  h3{
    margin-bottom:12px;
    text-align:center;
  }
`

export const UserPlusIcon = styled(UserPlus)`
  width: 19px; 
  height: 19px; 
  color:#fff;
  margin-right:5px;
`



