import Dialog from '@material-ui/core/Dialog/Dialog';
import styled from 'styled-components';
import {
  ActionsBlock, StationTileTitle, TimeBox, TimeBoxTitle,
} from '../styledComponents';

export const DetailsWrapper = styled(Dialog)`
  & .MuiDialog-paper {
    max-width: 610px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: solid 1px #425a70;
    background-color: #ffffff;
    border-radius: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

export const DetailsHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  box-sizing: border-box;
  background-color: ${props => props.bgcolor};
  & svg {
    fill: #ffffff;
    margin-right: 5px;
  }
`;

export const DetailsBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 25px 40px 25px;
  box-sizing: border-box;
  & .MuiTypography-subtitle1 {
    margin-top: 20px;
  }
  & .operator-name {
    margin-left: 10px;
  }
`;

export const DetailsTitle = styled(StationTileTitle)`
  margin: 5px 0 25px 0;
  & .MuiTypography-subtitle1 {
    color: #707070;
    text-transform: uppercase;
    color: ${props => (props.isGrayedOut ? '#707070' : '#425a70')};  
  }
`;

export const StationDetailsModalTimeBox = styled(TimeBox)`
  width: 160px;
`;

export const StationDetailsTimeBoxTitle = styled(TimeBoxTitle)`
  padding: 20px 0;
  & .MuiTypography-subtitle2 {
    margin-right: 0;
    color: ${props => (props.isWhiteHeader ? '#425a70' : '#ffffff')};
  }
  ${props => (props.isWhiteHeader && 'border-bottom: 1px solid #707070')};
`;
export const StationDetailsTimeBoxValue = styled(TimeBoxTitle)`
  padding: 15px 0;
  color: ${props => (props.isGrayedOut ? '#707070' : '#425a70')};  
`;

export const StationDetailsActionsBlock = styled(ActionsBlock)`
  justify-content: flex-end;
`;

export const TasksBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & .MuiTypography-body2 {
    font-weight: bold;
    text-transform: uppercase;
  }
`;
export const TasksBlockList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-inline-start: 0;
  & li {
    font-size: 14px;
    display: flex;
    color: #425a70;
    font-family: Roboto;
  }
`;

export const TaskNumber = styled.span`
  width: 10px;
  margin-right: 20px;
`;
export const TaskText = styled.span`
  display: flex;
  width: 420px;
  flex: 1;
  line-height: 1.43;
  margin-right: 40px;
`;
