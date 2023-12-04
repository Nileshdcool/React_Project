import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background-color: #ffffff;
`;

export const ListHeader = styled.div`
  display: flex;
  width: 350px;
  height: 40px;
  background-color: #006ba6;
  border: none;
`;

export const ListHeaderTitle = styled(Typography)`
  &.MuiTypography-h5{
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    line-height: 2.5;
    text-align: left;
    color: #ffffff;
    padding-left: 20px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  margin: 6px;
`;
