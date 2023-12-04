import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ContainedButton from './../../../components/Buttons/ContainedButton'
import styled from 'styled-components';
import world_background from '../../../img/world_background.svg'
import logo from '../../../img/logo.svg'

export const OperatorLoginWrapper = styled(Paper)`
  height: 100vh;
  background-image: url(${world_background});
  background-size: cover;
  display: flex;
  flex: 1;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;
export const LogoContainer = styled.div`
  width: 213px;
  height: 276px;
  background-image: url(${logo});
`;
export const StyledTextField = styled(TextField)`
  &.MuiTextField-root {
    width: 335px;
    height: 40px;
    margin-top: 152px;
    border-radius: 12px;
    background-color: #ffffff;
  }

  & .MuiOutlinedInput-root {
   &:hover fieldset {
    border-radius: 12px;
    border: ${props => props.borderError ? 'solid 2px #e60303' : 'none'};
  }
  &.Mui-focused fieldset {
    border-radius: 12px;
    border: ${props => props.borderError ? 'solid 2px #e60303' : 'none'};
  }
  & fieldset {
    border-radius: 12px;
    border: ${props => props.borderError ? 'solid 2px #e60303' : 'none'};
  }
  }
`;

export const LoginButton = styled(ContainedButton)`
  &.MuiButton-contained {
    display: block;
    margin: 27px auto;
  }
`;
