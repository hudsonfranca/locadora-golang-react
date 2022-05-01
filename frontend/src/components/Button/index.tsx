import React, { FC } from 'react'
import { ButtonComponent } from './styles'

interface Props {
  children: React.ReactNode,
  type: "button" | "submit" | "reset" | undefined,
  color: string,
  width: string,
  height: string
  disabled: boolean
  onClick?: () => void
}


const Button: FC<Props> = ({ children, type, color, height, width, disabled, onClick }) => {
  return (
    <ButtonComponent
      type={type}
      backgroundColor={color}
      height={height}
      width={width}
      disabled={disabled}
      onClick={onClick}
    >{children}</ButtonComponent>
  )
}

export default Button