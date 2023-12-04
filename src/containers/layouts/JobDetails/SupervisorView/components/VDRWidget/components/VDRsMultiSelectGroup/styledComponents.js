import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const MultiSelectListsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px 0;
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
export const TextWrapper = styled.p`
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.29;
  text-align: center;
  color: #707070;
  width: 300px;
  margin: 20px auto 40px auto;
`;
