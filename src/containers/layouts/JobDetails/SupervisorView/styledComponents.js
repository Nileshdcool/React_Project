import WarningIcon from '@material-ui/icons/Warning';
import styled from 'styled-components';
import { GLOBAL_COLORS as ICONS_COLORS } from '../../../../constants';

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

export const TemplateSelector = styled.div`
  width: 516px;
  height: 70px;
  margin-bottom: 25px;
  margin-right: 16px;
`;
export const MainActionsWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;
export const LeftButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  & button {
    margin-right: 20px;
  }
`;
export const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainContentWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-shrink: 1;
  box-sizing: border-box;
  flex-direction: column;
  margin-left: 16px;

  .supervisor-fade-block {
    overflow-x: auto;
  }
`;
export const StationWidgets = styled.div`
   display: flex;
   width: 1300px;
   height: 495px;
   box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
   border: solid 1px #425a70;
   background-color: #ffffff;
   flex-direction: column;
   border-radius: 10px;
   flex: 4;
   padding: 10px 30px 35px 30px;
   box-sizing: border-box;
`;
export const ActionsBlock = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
`;
export const LeftSubBlock = styled.div`
   display: flex;
   align-items: center;
`;
export const DropDownWIthTooltip = styled.div`
   display: flex;
   flex-direction: column;
   margin-top: 5px;
   & .MuiTypography-body2{
    margin-top: 5px;
    text-align: left;
    color: #ec4c47;
   }
`;
export const ButtonsWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   width: 100%;

   & button {
    margin-left: 20px;
   }
   & .MuiTypography-subtitle1 {
    font-weight: bold;
   }
`;

export const StationInnerMinutes = styled.div`
  width: 120px;
  height: 50px;
  border-right: 1px solid;
  border-left: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
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
export const StyledWarningIcon = styled(WarningIcon)`
    &.MuiSvgIcon-root {
    transform: scale(0.7);
    fill: ${ICONS_COLORS.errorColor};
    margin-right: 5px;
  }
`;
export const WidgetsBlock = styled.div`
   display: flex;
   flex-direction: row;
   overflow: hidden;
`;
export const GroupWidgetsBlock = styled.div`
   display: flex;
   flex-direction: column;
   overflow: hidden;
   justify-content: space-between;
`;
export const FirstWidgetsLine = styled.div`
   display: flex;
   overflow: hidden;
   margin-bottom: 30px;
`;
export const SecondWidgetsLine = styled.div`
   display: flex;
   overflow: hidden;
`;
