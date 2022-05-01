import styled from "styled-components";

export const CarComponent = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  padding-top:80px;
  padding-bottom:30px;

  h3{
    margin-bottom:20px;
  }
`

export const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius:5px;
  padding: 20px;
  background-color: #fff;


  h1{
    margin-bottom:20px;
  }
  
  form{
  width: 100%; 
  height: 100%; 
  display: grid;
  grid-template-columns:1fr 1fr;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  border-radius:5px;
 }

 @media (max-width:742px) {
   width: 80%;
  }

  @media (max-width:458px) {
    form{
      display: flex;
      flex-direction: column;
    }
  }
`

export const FildContainer = styled.div<{ valid: boolean }>`
width:100%;
height: auto;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:flex-start;

label{
  margin:3px 0 3px 0;
  font-size:0.8rem;

  span{
    color: tomato;
  }
}

input,select{
    width: 100%;
    height: 40px;
    border:${(props) => props.valid ? '1px solid #ccc' : '1px solid tomato'};
    border-radius:5px;
    padding: 5px;

    &:focus{
      outline: none;
      border-width:2px;
    }
  }

small{
  height: 10px;
  width: 100%;
  margin:3px 0 3px 0;
  color: tomato;
  font-size:0.7rem
}
`

export const FileContainer = styled.div<{ valid: boolean }>`
width:100%;
height: auto;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:flex-start;

label{
  width:100%;
height: 40px;
border-radius:5px;
border: 1px solid #ccc;
  margin:3px 0 3px 0;
  /* padding: 5px; */
  font-size:0.8rem;

  span{
    color: tomato;
  }
}

input{
  display: none;
    width: 100%;
    height: 40px;
    border:${(props) => props.valid ? '1px solid #ccc' : '1px solid tomato'};
    border-radius:5px;
    padding: 5px;

    &:focus{
      outline: none;
      border-width:2px;
    }
  }

small{
  height: 10px;
  width: 100%;
  margin:3px 0 3px 0;
  color: tomato;
  font-size:0.7rem
}
`