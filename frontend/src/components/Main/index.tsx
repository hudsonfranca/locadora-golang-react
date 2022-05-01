import React, { FC } from 'react'
import { MainComponent } from './styles'

interface Props {
  children: React.ReactNode
}

const Main: FC<Props> = ({ children }) => {
  return (
    <MainComponent>
      {children}
    </MainComponent>
  )
}

export default Main