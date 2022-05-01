import React from 'react'
import { Banner, FormContainer, FildContainer } from './styles'
import { Field, Form, Formik, FormikProps } from 'formik';
import { TailSpin } from 'react-loader-spinner'
import Button from '../Button'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const Schema = Yup.object().shape({
  to: Yup.date().required(),
  from: Yup.date().required(),
});


const Hero = () => {
  const navigate = useNavigate()
  return (
    <Banner >
      <h1>Aluguel de carros</h1>
      <FormContainer>
        <Formik
          validationSchema={Schema}
          initialValues={{ to: "", from: "" }}
          onSubmit={async ({ from, to }) => {
            navigate(`/search-car?from=${from}&to=${to}`)
          }}
        >
          {({ isSubmitting, errors, touched }: FormikProps<any>) => (
            <Form>
              <FildContainer valid={errors.state && touched.state ? false : true}>
                <label htmlFor='from'>Data de retirada:</label>
                <Field name="from" id="from" type="date" />
              </FildContainer>

              <FildContainer valid={errors.password && touched.password ? false : true}>
                <label htmlFor='to'>Data de devolução:</label>
                <Field name="to" id="to" type="date" />
              </FildContainer>
              {
                isSubmitting ? (
                  <Button disabled={true} type="button" color='#44870e' width={"120px"} height={"35px"}>
                    <TailSpin color="#Fff" height={30} width={30} />
                  </Button>

                ) : (
                  <Button disabled={false} type="submit" color='#44870e' width={"109px"} height={"35px"}>Pesquisar</Button>
                )
              }
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Banner>

  )
}

export default Hero;
