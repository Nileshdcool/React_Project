import styled from 'styled-components';
import { OPERATOR_SIGNAL_BLOCKS_HEADER_COLOR } from '../../../../../../../constants';

export const SignalsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  //height: 100%;
  &>button {
    margin: 20px auto;
  }
`;

export const SignalBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  //height: 100%;
  border: solid 1px ${props => (props.color ? OPERATOR_SIGNAL_BLOCKS_HEADER_COLOR[props.color] : '#425a70')};
  background-color: #ffffff;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

export const SignalsBlockHeader = styled.div`
  display: flex;
  height: 40px;
  background-color: ${props => (props.color ? OPERATOR_SIGNAL_BLOCKS_HEADER_COLOR[props.color] : '#006ba6')};
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  & .MuiTypography-subtitle1{
  &:first-child {
    font-weight: bold;
  }
    font-weight: normal;
    color: #ffffff;
    line-height: 1.19;
  }
`;

export const SignalsBlockContent = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px 70px;
`;
