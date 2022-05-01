import React from 'react'
import { SignupComponent, FormContainer, FildContainer } from './styles'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik';
import Button from '../../components/Button';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom'
import InputMask from '../../components/InputMask'
import * as Yup from 'yup';
import { toast } from 'react-toastify';


const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required('nome é um campo obrigatório'),
  lastName: Yup.string()
    .required('sobrenome é um campo obrigatório'),
  email: Yup.string().email('Email inválido').required('email é um campo obrigatório'),
  cpf: Yup.string().required('cpf é um campo obrigatório'),
  streetAddress: Yup.string().required('rua é um campo obrigatório'),
  zipCode: Yup.string().required('cep é um campo obrigatório'),
  number: Yup.number().required('número é um campo obrigatório'),
  city: Yup.string().required('cidade é um campo obrigatório'),
  state: Yup.string().required('estado é um campo obrigatório'),
  district: Yup.string().required('bairro é um campo obrigatório'),
  password: Yup.string().required('senha é um campo obrigatório'),
  phoneNumber: Yup.string().required('telefone é um campo obrigatório'),
});


const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <SignupComponent>
      <FormContainer>
        <h1>Crie sua Conta</h1>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{
            name: '',
            lastName: '',
            cpf: '',
            streetAddress: '',
            zipCode: '',
            number: '',
            city: '',
            district: '',
            state: '',
            email: '',
            password: '',
            phoneNumber: ''
          }}
          onSubmit={async (values, actions) => {
            try {
              const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                name: values.name,
                lastName: values.lastName,
                cpf: values.cpf.replace(/\W/g, ''),
                password: values.password,
                email: values.email,
                phoneNumber: values.phoneNumber.replace(/\W/g, ''),
                role: "user",
                address: {
                  streetAddress: values.streetAddress,
                  zipCode: values.zipCode.replace(/\W/g, ''),
                  number: parseInt(values.number),
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
                  id: data.data.ID,
                  email: data.data.email,
                  name: data.data.name,
                  role: data.data.role,
                  isAuthenticated: true,
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
            <>
              <Form>
                <FildContainer valid={errors.name && touched.name ? false : true}>
                  <label htmlFor='name'><span>*</span> Nome</label>
                  <Field name="name" id="name" placeholder="Nome" />
                  {errors.name && touched.name ? (
                    <small>
                      {String(errors.name)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.lastName && touched.lastName ? false : true}>
                  <label htmlFor='lastName'><span>*</span> Sobrenome</label>
                  <Field name="lastName" id="lastName" placeholder="Sobrenome" />
                  {errors.lastName && touched.lastName ? (
                    <small>
                      {String(errors.lastName)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.cpf && touched.cpf ? false : true}>
                  <label htmlFor='cpf'><span>*</span> CPF</label>
                  <Field name="cpf" id="cpf" placeholder="CPF" >
                    {(fieldProps: FieldProps) => (
                      <InputMask
                        placeholder="CPF"
                        fieldProps={fieldProps}
                        mask={'999.999.999-99'}
                      />
                    )}
                  </Field>
                  {errors.cpf && touched.cpf ? (
                    <small>
                      {String(errors.cpf)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.cpf && touched.cpf ? false : true}>
                  <label htmlFor='phoneNumber'><span>*</span> Telefone</label>
                  <Field name="phoneNumber" id="phoneNumber" placeholder="Telefone" >
                    {(fieldProps: FieldProps) => (
                      <InputMask
                        placeholder="Telefone"
                        fieldProps={fieldProps}
                        mask={'(99) 99999-9999'}
                      />
                    )}
                  </Field>
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <small>
                      {String(errors.phoneNumber)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.streetAddress && touched.streetAddress ? false : true}>
                  <label htmlFor='streetAddress'><span>*</span> Rua</label>
                  <Field name="streetAddress" id="streetAddress" placeholder="Rua" />
                  {errors.streetAddress && touched.streetAddress ? (
                    <small>
                      {String(errors.streetAddress)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.zipCode && touched.zipCode ? false : true}>
                  <label htmlFor='zipCode'><span>*</span> CEP</label>
                  <Field name="zipCode" id="zipCode" placeholder="CEP" >
                    {(fieldProps: FieldProps) => (
                      <InputMask
                        placeholder="CEP"
                        fieldProps={fieldProps}
                        mask={'99.999-999'}
                      />
                    )}
                  </Field>
                  {errors.zipCode && touched.zipCode ? (
                    <small>
                      {String(errors.zipCode)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.number && touched.number ? false : true}>
                  <label htmlFor='number'><span>*</span> Número</label>
                  <Field name="number" id="number" placeholder="Número" />
                  {errors.number && touched.number ? (
                    <small>
                      {String(errors.number)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.city && touched.city ? false : true}>
                  <label htmlFor='city'><span>*</span> Cidade</label>
                  <Field name="city" id="city" placeholder="Cidade" />
                  {errors.city && touched.city ? (
                    <small>
                      {String(errors.city)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.district && touched.district ? false : true}>
                  <label htmlFor='district'><span>*</span> Bairro</label>
                  <Field name="district" id="district" placeholder="Bairro" />
                  {errors.district && touched.district ? (
                    <small>
                      {String(errors.district)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.state && touched.state ? false : true}>
                  <label htmlFor='state'><span>*</span> UF</label>
                  <Field name="state" id="state" placeholder="UF" />
                  {errors.state && touched.state ? (
                    <small>
                      {String(errors.state)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.password && touched.password ? false : true}>
                  <label htmlFor='password'><span>*</span> Senha</label>
                  <Field name="password" id="password" type="password" placeholder="Senha" />
                  {errors.password && touched.password ? (
                    <small>
                      {String(errors.password)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                <FildContainer valid={errors.email && touched.email ? false : true}>
                  <label htmlFor='email'><span>*</span> Email</label>
                  <Field name="email" id="email" type="email" placeholder="Email" />
                  {errors.email && touched.email ? (
                    <small>
                      {String(errors.email)}
                    </small>
                  ) : <small></small>}
                </FildContainer>

                {
                  isSubmitting ? (
                    <Button disabled={true} type="button" color='#FEBB01' width={"100%"} height={"35px"}>
                      <TailSpin color="#Fff" height={30} width={30} />
                    </Button>

                  ) : (
                    <Button disabled={false} type="submit" color='#44870e' width={"100%"} height={"40px"}>Criar Conta</Button>
                  )
                }

              </Form>
            </>
          )}

        </Formik>
      </FormContainer>
    </SignupComponent>
  )
}

export default Signup

