import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { NavLink, useNavigate } from 'react-router-dom'
import { DashboardComponent, CardContainer, Card } from './styles'

const Dashboard = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['Authorization']);
  const getAuthenticatedUserUser = async () => {
    if (cookies.Authorization) {
      const { data } = await axios.get<Response>(
        `${process.env.REACT_APP_BACKEND_URL}/auth/authenticated`,
        {
          withCredentials: true
        }
      )

      if (data.status !== 200) {
        navigate("/")
      }

    } else {
      navigate("/")
    }
  }
  useEffect(() => {
    getAuthenticatedUserUser()
  }, [])
  return (
    <DashboardComponent>
      <h1>Sua conta</h1>
      <CardContainer>
        <NavLink to={'/cars-rented'}>
          <Card>
            <h2>
              Meus Carros
            </h2>
            <p>Carros alugados por você</p>
          </Card>
        </NavLink>

        <NavLink to={'/account'}>
          <Card>
            <h3>
              Meus Dados
            </h3>
            <p>Alterar seus dados pessoais</p>
          </Card>
        </NavLink>

        <NavLink to={'/car'}>
          <Card>
            <h3>
              Carros
            </h3>
            <p>Cadastre novos carros</p>
          </Card>
        </NavLink>
      </CardContainer>
    </DashboardComponent>
  )
}

export default Dashboard