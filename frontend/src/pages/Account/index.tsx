import React, { useState, useEffect } from 'react'
import { AccountComponent, FormContainer, FildContainer } from './styles'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import Button from '../../components/Button';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { authenticateUser, Response } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom'
import InputMask from '../../components/InputMask'
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const AccountSchema = Yup.object().shape({
  name: Yup.string(),
  lastName: Yup.string(),
  streetAddress: Yup.string(),
  zipCode: Yup.string(),
  number: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  district: Yup.string(),
  password: Yup.string(),
  phoneNumber: Yup.string(),
});

const Account = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState<Response>()
  const [cookies] = useCookies(['Authorization']);

  const getAuthenticatedUserUser = async () => {
    if (cookies.Authorization) {
      const { data } = await axios.get<Response>(
        `${process.env.REACT_APP_BACKEND_URL}/auth/authenticated`,
        {
          withCredentials: true
        }
      )

      if (data.status === 200) {
        setUser(data)
      } else {
        navigate("/")
      }
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    getAuthenticatedUserUser()
  }, [])

  return user?.data ? (
    <AccountComponent>
      <FormContainer>
        <h1>Atualize seus dados</h1>
        <Formik
          validationSchema={AccountSchema}
          initialValues={{
            name: user?.data.name,
            lastName: user?.data.lastName,
            streetAddress: user?.data.address.streetAddress,
            zipCode: user?.data.address.zipCode.replace(/\W/g, ''),
            number: user?.data.address.number,
            city: user?.data.address.city,
            district: user?.data.address.district,
            state: user?.data.address.state,
            password: user?.data.password,
            phoneNumber: user?.data.phoneNumber.replace(/\W/g, '')
          }}
          onSubmit={async (values, actions) => {
            try {
              const { data } = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/user/${user.data.ID}`, {
                name: values.name,
                lastName: values.lastName,
                password: values.password,
                role: "user",
                phoneNumber: values.phoneNumber.replace("(", "").replace(")", "").replace("-", ""),
                address: {
                  streetAddress: values.streetAddress,
                  zipCode: values.zipCode.replace(".", "").replace("-", ""),
                  number: values.number,
                  city: values.city,
                  district: values.district,
                  state: values.state,
                }
              },
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
                navigate("/")
              }
            } catch (error: any) {
              toast.error(error.response.data.error);
              return
            }
          }}
        >
          {({ isSubmitting, errors, touched }: FormikProps<any>) => (
            <Form>
              <FildContainer valid={errors.name && touched.name ? false : true}>
                <label htmlFor='name'><span>*</span> Nome</label>
                <Field name="name" placeholder="Nome" />
              </FildContainer>

              <FildContainer valid={errors.lastName && touched.lastName ? false : true}>
                <label htmlFor='lastName'><span>*</span> Sobrenome</label>
                <Field name="lastName" placeholder="Sobrenome" />
              </FildContainer>

              <FildContainer valid={errors.cpf && touched.cpf ? false : true}>
                <label htmlFor='phoneNumber'><span>*</span> Telefone</label>
                <Field name="phoneNumber" placeholder="Telefone" >
                  {(fieldProps: FieldProps) => (
                    <InputMask
                      placeholder="Telefone"
                      fieldProps={fieldProps}
                      mask={'(99) 99999-9999'}
                    />
                  )}
                </Field>
              </FildContainer>

              <FildContainer valid={errors.streetAddress && touched.streetAddress ? false : true}>
                <label htmlFor='streetAddress'><span>*</span> Rua</label>
                <Field name="streetAddress" placeholder="Rua" />
              </FildContainer>

              <FildContainer valid={errors.zipCode && touched.zipCode ? false : true}>
                <label htmlFor='zipCode'><span>*</span> CEP</label>
                <Field name="zipCode" placeholder="CEP" >
                  {(fieldProps: FieldProps) => (
                    <InputMask
                      placeholder="CEP"
                      fieldProps={fieldProps}
                      mask={'99.999-999'}
                    />
                  )}
                </Field>
              </FildContainer>

              <FildContainer valid={errors.number && touched.number ? false : true}>
                <label htmlFor='number'><span>*</span> Número</label>
                <Field name="number" placeholder="Número" />
              </FildContainer>

              <FildContainer valid={errors.city && touched.city ? false : true}>
                <label htmlFor='city'><span>*</span> Cidade</label>
                <Field name="city" placeholder="Cidade" />
              </FildContainer>

              <FildContainer valid={errors.district && touched.district ? false : true}>
                <label htmlFor='district'><span>*</span> Bairro</label>
                <Field name="district" placeholder="Bairro" />
              </FildContainer>

              <FildContainer valid={errors.state && touched.state ? false : true}>
                <label htmlFor='state'><span>*</span> UF</label>
                <Field name="state" placeholder="UF" />
              </FildContainer>

              <FildContainer valid>

              </FildContainer>

              {
                isSubmitting ? (
                  <Button disabled={true} type="button" color='#FEBB01' width={"109px"} height={"35px"}>
                    <TailSpin color="#Fff" height={30} width={30} />
                  </Button>

                ) : (
                  <Button disabled={false} type="submit" color='#44870e' width={"100%"} height={"40px"}>Atualizar dados</Button>
                )
              }

            </Form>
          )}
        </Formik>
      </FormContainer>
    </AccountComponent>
  ) : (
    <AccountComponent></AccountComponent>
  )
}

export default Account

