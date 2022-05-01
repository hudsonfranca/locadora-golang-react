import styled from "styled-components";

export const ButtonComponent = styled.button<{ backgroundColor: string, width: string, height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  color: #fff;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius:5px;
  border: none;
  cursor: pointer;
  transition:0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    filter: brightness(0.9);
  }
`