import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button'
import { SearchCarComponent, CardContainer, Card, CardBody, Specifications } from './styles'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { toast } from 'react-toastify';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchCar = () => {
  const { id: usersId, isAuthenticated } = useSelector(({ auth }: RootState) => auth)

  let query = useQuery();

  const [cars, setCars] = useState<any>()
  const [days, setDays] = useState<number>(0)

  const to = new Date(query.get("to")!);
  const from = new Date(query.get("from")!);

  const getDays = (to: Date, from: Date) => {

    const differenceInTime = to.getTime() - from.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)

    setDays(differenceInDays)
  }

  const getCars = async () => {
    const { data } = await axios.get<any>(
      `${process.env.REACT_APP_BACKEND_URL}/car`,
      {
        withCredentials: true
      }
    )

    if (data) {
      setCars(data.data)
    }
  }


  const formater = (price: number, days: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(days * price);
  }

  const rentCar = async (carsId: string, to: Date, from: Date) => {

    if (!isAuthenticated) {
      toast.error("Crie uma conta o faça o login");
      return
    }
    const { data } = await axios.post<any>(
      `${process.env.REACT_APP_BACKEND_URL}/rent`,
      {
        from,
        to,
        status: true,
        usersID: usersId,
        carsId
      },
      {
        withCredentials: true
      }
    )

    if (data.status === 200) {
      toast.success("Carro reservado");
      const { data } = await axios.patch<any>(
        `${process.env.REACT_APP_BACKEND_URL}/car/${carsId}`,
        {
          status: false,
        },
        {
          withCredentials: true
        }
      )
      if (data.status === 200) {
        const c = cars.filter((car: any) => car.ID !== carsId)
        setCars(c)
      }
    } else {
      toast.error("Não foi possível reservar o carro, tente novamente");
    }

  }

  useEffect(() => {
    getCars()
    getDays(to, from)
  }, [])

  return (
    <SearchCarComponent>
      <CardContainer>
        {
          cars && cars.map(({
            ID,
            carModel,
            doors,
            price,
            seats,
            transmission,
            airConditioning,
            images
          }: any) => (
            <Card key={ID}>
              <h3>{`${carModel}`}</h3>
              <Specifications>
                <p>{`${seats} Passageiros`}</p>

                {
                  airConditioning && (
                    <p>Ar Condicionado</p>
                  )
                }

                <p>{`${transmission}`}</p>

                <p>{`${doors} Portas`}</p>
              </Specifications>
              <CardBody>
                <img src={`http://${images[0].url}`} alt={carModel} />
                <div>
                  {`${days} dias`}
                  <h2>
                    {formater(price, days)}
                  </h2>
                  <Button
                    onClick={async () => {
                      await rentCar(ID, to, from)
                    }}
                    disabled={false}
                    type="submit"
                    color='#44870e'
                    width={"80%"}
                    height={"40px"}
                  >
                    Reservar
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))
        }
      </CardContainer>
    </SearchCarComponent>
  )
}

export default SearchCar