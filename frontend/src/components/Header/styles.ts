import styled from 'styled-components'
import { User, Car, LogOut } from '@styled-icons/boxicons-solid'

export const HeaderComponent = styled.header`
  width: 100%;
  height: 60px;
  background-color:#fff;
  display: flex;
  flex-direction:row;
  position: fixed;
  z-index: 20;
`

export const Logo = styled(Car)`
  width: 100px;
  height: 60px;
  color:#000;
`

export const Nav = styled.nav`
  width: 100%;
  height:60px;
  display: flex;
  flex-direction:row;
  justify-content:end;
  align-items: center;
  position: relative;
`


export const Credentials = styled.div<{ isActive: boolean }>`
  width: 17%;
  height: 60px;
  display: flex;
  flex-direction:row;
  justify-content:center;
  align-items: center;
  font-size:1rem;
  padding: 6px;
  transition:.2s;
  cursor: pointer;
  background-color:${(props) => {
    if (props.isActive) {
      return '#FEBB02'
    }
  }};


  p{
    font-size: 1rem;;
    color:${(props) => {
    if (props.isActive) {
      return '#fff'
    }
  }};
  }

  &:hover{
    background-color:#FEBB02;

    p{
      color:#fff;
    }
    

    svg{
      color:#fff;
    }
  }

  @media (max-width: 724px) {
   width: 45%;
  }
`

export const UserIcon = styled(User)`
   color:#000;
   width: 20px;
  height: 20px;
`

export const LogOutIcon = styled(LogOut)`
   color:#000;
   width: 20px;
  height: 20px;
`

export const LogOutContainer = styled.div`
   width: 100%;
  height: 100px;
  display: flex;
  flex-direction:row;
  justify-content:center;
  align-items: center;
`

export const Account = styled.div`
   width: 100%;
  height: 60px;
  display: flex;
  flex-direction:row;
  justify-content:space-between;
  align-items: center;
  font-size:1rem;
  padding: 10px;
  transition:.2s;
  cursor: pointer;
  align-self:baseline;

  p{
    font-size: 1rem;
  }

  &:hover{
    background-color:#FEBB02;

    p{
      color:#fff;
    }
    

    svg{
      color:#fff;
    }
  }
`