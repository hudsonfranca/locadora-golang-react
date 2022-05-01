import React, { FC } from 'react'
import { Card, ArrowUp, LoginForm, CreateAccount, UserPlusIcon } from './styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import Button from '../Button'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../features/authSlice';
import { TailSpin } from 'react-loader-spinner'
import * as Yup from 'yup';
import { toast } from 'react-toastify';


interface Props {
  isActive: boolean,
  setScative: React.Dispatch<React.SetStateAction<boolean>>
}

const Schema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required(),
  password: Yup.string().required(),
});

const CredentialsComponent: FC<Props> = ({ isActive, setScative }) => {
  const dispatch = useDispatch()

  return (
    <Card isActive={isActive} onClick={(e) => e.stopPropagation()}>
      <ArrowUp />
      <LoginForm>
        <h3>Faça seu Login</h3>
        <Formik
          validationSchema={Schema}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, actions) => {

            try {
              const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/signin`,
                { ...values },
                {
                  withCredentials: true
                }
              )

              if (data) {

                dispatch(authenticateUser({
                  email: data.data.email,
                  name: data.data.name,
                  role: data.data.role,
                  isAuthenticated: true,
                  id: data.data.ID
                }))
                window.location.reload();
              }
            } catch (error: any) {
              toast.error(error.response.data.error);
              return
            }

          }}
        >
          {({ isSubmitting }: FormikProps<any>) => (
            <Form>
              <Field name="email" placeholder="Email" />
              <Field name="password" type="password" placeholder="Senha" />
              {
                isSubmitting ? (
                  <Button disabled={true} type="button" color='#FEBB01' width={"109px"} height={"35px"}>
                    <TailSpin color="#Fff" height={30} width={30} />
                  </Button>

                ) : (
                  <Button disabled={false} type="submit" color='#FEBB02' width={"109px"} height={"35px"}>Entrar</Button>
                )
              }

            </Form>
          )}
        </Formik>
      </LoginForm>
      <CreateAccount>
        <h3>Ainda não é cadastrado?</h3>
        <NavLink to={'/signup'}>
          <Button onClick={() => setScative(false)} disabled={false} type="submit" color='#44870e' width={"100%"} height={"35px"}>
            <UserPlusIcon />
            Criar Nova Conta
          </Button>
        </NavLink>
      </CreateAccount>
    </Card >
  )
}

export default CredentialsComponent
