import React, { useState } from 'react'
import { CarComponent, FildContainer, FormContainer } from './styles'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NumberFormat, { NumberFormatValues, } from 'react-number-format';
import Button from '../../components/Button';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const AccountSchema = Yup.object().shape({
  carModel: Yup.string().required('modelo é um campo obrigatório'),
  price: Yup.string().required('preço é um campo obrigatório').min(1, "o preço não pode ser 0"),
  seats: Yup.number().required('assento é um campo obrigatório').min(1, "digite a quantidade de assentos"),
  transmission: Yup.string().required('câmbio é um campo obrigatório'),
  airConditioning: Yup.string().required('ar-condicionado é um campo obrigatório'),
  doors: Yup.number().required('portas é um campo obrigatório').min(1, "digite a quantidade de portas"),
  image: Yup.mixed().required('selecione uma imagem'),
});

const Car = () => {

  const [price, setPrice] = useState<number>()
  const [image, setImage] = useState<File | null>(null)

  function currencyFormatter(value: any): string {
    if (!Number(value)) return "R$ 0,00";

    const amount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) / 100);

    return `${amount}`;
  }

  return (
    <CarComponent>
      <FormContainer>
        <h1>Cadastrar Carro</h1>
        <Formik
          validationSchema={AccountSchema}
          initialValues={{
            carModel: "",
            price: 0,
            seats: 0,
            transmission: "",
            airConditioning: "false",
            doors: 0,
            image: ""
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/car`, {
                carModel: values.carModel,
                price: price,
                seats: values.seats,
                transmission: values.transmission,
                airConditioning: values.airConditioning === "true",
                doors: values.doors,
                status: true
              },
                {
                  withCredentials: true
                }
              )

              if (data.data) {
                const formData = new FormData()
                if (image) {
                  formData.append("upload[]", image);
                  const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/image/car/${data.data.ID}`, formData, {
                    withCredentials: true
                  });

                  if (res.data.data) {
                    resetForm()
                  }
                }

              }
            } catch (error: any) {
              toast.error(error.response.data.error);
              return
            }

          }}
        >
          {({ isSubmitting, errors, touched }: FormikProps<any>) => (
            <Form>
              <FildContainer valid={errors.carModel && touched.carModel ? false : true}>
                <label htmlFor='carModel'><span>*</span> Modelo</label>
                <Field name="carModel" id='carModel' placeholder="Modelo" />
                {errors.carModel && touched.carModel ? (
                  <small>
                    {String(errors.carModel)}
                  </small>
                ) : <small></small>}
              </FildContainer>

              <FildContainer valid={errors.price && touched.price ? false : true}>
                <label htmlFor='price'><span>*</span> Diária</label>
                <Field name="price" id="price" placeholder="Preço" >
                  {({ field, form, meta }: FieldProps) => (
                    <NumberFormat
                      displayType="input"
                      type="text"
                      allowNegative={false}
                      format={currencyFormatter}
                      onValueChange={(values: NumberFormatValues) => {
                        const price = values.floatValue && values.floatValue / 100;
                        setPrice(price)
                      }}
                      {...field}
                      {...form}
                      {...meta}
                    />
                  )}
                </Field>
                {errors.price && touched.price ? (
                  <small>
                    {String(errors.price)}
                  </small>
                ) : <small></small>}
              </FildContainer>

              <FildContainer valid={errors.seats && touched.seats ? false : true}>
                <label htmlFor='seats'><span>*</span> Assentos</label>
                <Field type="number" name="seats" id="seats" placeholder="Assentos" />
                {errors.seats && touched.seats ? (
                  <small>
                    {String(errors.seats)}
                  </small>
                ) : <small></small>}
              </FildContainer>

              <FildContainer valid={errors.transmission && touched.transmission ? false : true}>
                <label htmlFor='transmission'><span>*</span> Câmbio</label>
                <Field name="transmission" as="select" id="transmission" placeholder="Câmbio" >
                  <option selected value="manual">Manual</option>
                  <option value="automatico">Automatico</option>
                </Field>
                {errors.transmission && touched.transmission ? (
                  <small>
                    {String(errors.transmission)}
                  </small>
                ) : <small></small>}
              </FildContainer>

              <FildContainer valid={errors.airConditioning && touched.airConditioning ? false : true}>
                <label htmlFor='airConditioning'><span>*</span> Ar-Condicionado</label>
                <Field name="airConditioning" as="select" id="airConditioning" placeholder="Ar-Condicionado" >
                  <option selected value="true">Sim</option>
                  <option value="false">Não</option>
                </Field>
                {errors.airConditioning && touched.airConditioning ? (
                  <small>
                    {String(errors.airConditioning)}
                  </small>
                ) : <small></small>}
              </FildContainer>

              <FildContainer valid={errors.doors && touched.doors ? false : true}>
                <label htmlFor='doors'><span>*</span> Portas</label>
                <Field type="number" name="doors" id="doors" placeholder="Portas" />
                {errors.doors && touched.doors ? (
                  <small>
                    {String(errors.doors)}
                  </small>
                ) : <small></small>}
              </FildContainer>

              <FildContainer valid={errors.image ? false : true}>
                <label htmlFor='image'><span>*</span> Imagem</label>
                <Field type="file" name="image" id="image" placeholder="Imagem" >
                  {({ field: { onChange, ...props } }: FieldProps) => (
                    <input type="file"
                      onChange={(e) => {
                        if (e.target.files) {
                          setImage(e.target.files[0])
                        }
                        onChange(e)
                      }}
                      {...props}
                    />
                  )}
                </Field>
                {errors.image && touched.image ? (
                  <small>
                    {String(errors.image)}
                  </small>
                ) : <small></small>}
              </FildContainer>
              {
                isSubmitting ? (
                  <Button disabled={true} type="button" color='#FEBB01' width={"100%"} height={"35px"}>
                    <TailSpin color="#Fff" height={30} width={30} />
                  </Button>

                ) : (
                  <Button disabled={false} type="submit" color='#44870e' width={"100%"} height={"40px"}>Cadastrar</Button>
                )
              }
            </Form>

          )}
        </Formik>
      </FormContainer>
    </CarComponent>
  )
}

export default Car