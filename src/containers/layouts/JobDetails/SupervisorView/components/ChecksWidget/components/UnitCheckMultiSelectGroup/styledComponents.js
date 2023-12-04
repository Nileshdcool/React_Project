import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { StyledTextArea } from '../../../TasksWidget/styledComponents';

export const MultiSelectListsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px 0;
`;

export const UnitChecksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 330px;
  overflow-y: auto;
  & .MuiTypography-body2{
  padding-bottom: 5px;
  border-bottom: 1px solid #707070;
  margin-bottom: 10px;
  text-align: left;
  }
  ul {
    margin: 0;
    padding: 5px 0;
  }
  li {
    display: flex;
    list-style-type: none;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    margin-bottom: 5px;
    margin-left: -7px;
    & .MuiTypography-body2{
      padding-bottom: 0;
      border-bottom: none;
      margin-bottom: 0;
      text-align: left;
    }
  }
`;

export const UnitChecksBlockWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
  margin-bottom: 15px;
  & .MuiMenuItem-root {
    display: flex;
    min-height: 40px;
    height: 40px;
  }
`;

export const StyledPlaceholderTypography = styled(Typography)`
  &.MuiTypography-root{
    font-size: 16px;
    font-weight: bold;
    opacity: ${props => (props.disabled ? 0.6 : 1)};
    text-transform: uppercase;
    color: #707070;
    line-height: 1.19;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0px 10px 40px 0;
`;
export const ModalDialogButtonWrapper = styled.div`
  display: flex;
  width: 180px;
  justify-content: space-between;
  margin: 0px auto;
`;
export const TextWrapper = styled.p`
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.29;
  text-align: center;
  color: #707070;
  width: 300px;
  margin: 20px auto 40px auto;
`;

export const NoteIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-image: linear-gradient(to bottom, #93c6f4, #064289);
`;

export const UnitChecksStyledTextArea = styled(StyledTextArea)`
   &.MuiFormControl-root {
    display: flex;
    width: 100%;
    height: 100px;
   }
`;
