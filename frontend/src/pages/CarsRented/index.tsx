import React, { useState, useEffect } from 'react'
import { CarsRentedComponent, Card, CardBody, CardContainer, Specifications } from './styles'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


interface RentedCarsProps {
  ID: number,
  CreatedAt: string,
  UpdatedAt: string,
  DeletedAt: null,
  from: string,
  to: string,
  status: boolean,
  usersID: number,
  carsID: number
}
interface Car {
  ID: number,
  CreatedAt: string,
  UpdatedAt: string,
  DeletedAt: string,
  carModel: string,
  price: number,
  seats: number,
  transmission: string,
  airConditioning: boolean,
  doors: number,
  status: boolean,
  rent: null,
  images: {
    ID: 1,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: null,
    name: string,
    path: string,
    url: string,
    carsID: number
  }[]
}



const CarsRented = () => {
  const [rented, setRented] = useState<RentedCarsProps[]>()
  const [cars, setCars] = useState<Car[]>([])
  const [usersId, setUsersId] = useState<number>(0)


  const formater = (price: number, days: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(days * price);
  }

  const getCarById = async (carsId: number) => {
    const { data } = await axios.get<{ status: number, data: Car }>(
      `${process.env.REACT_APP_BACKEND_URL}/car/${carsId}`,
      {
        withCredentials: true
      }
    )

    return data.data
  }

  const getRentedCars = async (usersId: number) => {
    const { data: { data } } = await axios.get<{ data: RentedCarsProps[], status: number }>(
      `${process.env.REACT_APP_BACKEND_URL}/rent/user/${usersId}`,
      {
        withCredentials: true
      }
    )

    if (data) {
      const c: Car[] = []
      for (let r of data) {
        const car = await getCarById(r.carsID)
        c.push(car)
      }
      setRented(data)
      setCars(c)
    }
  }

  const getDays = (to: Date, from: Date) => {

    const differenceInTime = to.getTime() - from.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)

    return differenceInDays
  }

  const [cookies] = useCookies(['Authorization']);

  const navigate = useNavigate()

  const user = async () => {

    if (cookies.Authorization) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/authenticated`,
        {
          withCredentials: true
        }
      )

      if (data.status !== 200) {

      }

      setUsersId(data.data.ID)
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    getRentedCars(usersId)
    user()
  }, [usersId])

  return rented ? (
    <CarsRentedComponent>
      <h1>Carros alugados por você</h1>
      <CardContainer>
        {
          rented.map(({
            carsID, from, to
          }) => {
            const car = cars.find(({ ID }) => ID === carsID)
            return car && (
              <Card key={car.ID}>
                <h3>{`${car.carModel}`}</h3>
                <Specifications>

                  <p>{`Retirada: ${new Date(from).getDate()}/${new Date(from).getMonth()}/${new Date(from).getFullYear()}`}</p>

                  <p>{`Devolução: ${new Date(to).getDate()}/${new Date(to).getMonth()}/${new Date(to).getFullYear()}`}</p>
                </Specifications>
                <CardBody>
                  <img src={`http://${car.images[0].url}`} alt={car.carModel} />
                  <div>
                    {`${getDays(new Date(to), new Date(from))} dias`}
                    <h2>
                      {formater(car.price, getDays(new Date(to), new Date(from)))}
                    </h2>
                  </div>
                </CardBody>
              </Card>
            )

          })
        }
      </CardContainer>
    </CarsRentedComponent>
  ) : (
    <div></div>
  )
}

export default CarsRented