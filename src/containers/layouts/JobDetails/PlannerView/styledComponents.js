import { GLOBAL_COLORS as ICONS_COLORS } from '../../../../constants';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import styled from 'styled-components';

export const JobDetailsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const JobDetailsContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const JobWrapper = styled.div`
  display: flex;
  background-color: white;
  border: 1px  solid #707070;
`;
export const MainContentWrapper = styled(JobWrapper)`
   flex: 1 1 77.5%;
   width: 1300px;
   height: 878px;
   flex-direction: column;
   border-radius: 10px;
   flex: 4;
   margin-right: 16px;
   padding: 25px 30px 55px 30px;
   box-sizing: border-box;
`;
export const ActionsBlock = styled.div`
   display: flex;
   justify-content: space-between;
   margin-bottom: 30px;
`;
export const UnsavedChangesWarning = styled.div`
  display: flex;
  color: ${ICONS_COLORS.errorColor};
  p {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.71;
    text-align: left;
  }
`;
export const TextMessagesBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledWarningIcon = styled(WarningIcon)`
    &.MuiSvgIcon-root {
    transform: scale(0.7);
    fill: ${props => ICONS_COLORS[props.type]};
    margin-right: 5px;
  }
`;
export const WidgetsBlock = styled.div`
   display: flex;
   flex-direction: row;
   overflow: hidden;
   flex-wrap: wrap;
`;
export const FirstWidgetsLine = styled.div`
   display: flex;
   overflow: hidden;
`;
export const SecondWidgetsLine = styled.div`
   display: flex;
   overflow: hidden;
`;

export const ContentBlock = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
`;
export const Description = styled(Typography)`
  &.MuiTypography-root{
    display: flex;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.05px;
    text-align: left;
    color: #66788a;
    margin-left: 30px;
  }
`;

export const RevisionText = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  line-height: 1.19;
  text-align: left;
  color: #425a70;
`;

export const MainContentButtons = styled.div`
  display: flex;
  width: 170px;
  justify-content: space-between;
`
