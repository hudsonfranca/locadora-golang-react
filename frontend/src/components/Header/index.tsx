import React, { useState } from 'react'
import { HeaderComponent, Nav, Credentials, Logo, UserIcon, LogOutIcon, LogOutContainer, Account } from './styles'
import CredentialsComponent from '../Credentials'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useCookies } from 'react-cookie'


const Header = () => {
  const [isActive, setScative] = useState(false)
  const isAuthenticated = useSelector(({ auth: { isAuthenticated } }: RootState) => isAuthenticated)
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);

  const handleLogOut = () => {
    removeCookie('Authorization')
    window.location.reload();
  }

  return (
    <HeaderComponent>
      <NavLink to={'/'}>
        <Logo />
      </NavLink>
      <Nav>

        {
          isAuthenticated && (
            <NavLink to={'/dashboard'}>
              <Account>
                <UserIcon />
                <p>Sua Conta</p>
              </Account>
            </NavLink>
          )
        }
        <Credentials isActive={isActive} onClick={() => { setScative(!isActive) }}>
          {
            isAuthenticated ? (
              <LogOutContainer onClick={handleLogOut}>
                <LogOutIcon />
                <p>Logout</p>
              </LogOutContainer>
            ) : (
              <>
                <p>Acesse | Crie sua Conta</p>
                <CredentialsComponent setScative={setScative} isActive={isActive} />
              </>
            )
          }

        </Credentials>
      </Nav>
    </HeaderComponent >
  )
}

export default Header