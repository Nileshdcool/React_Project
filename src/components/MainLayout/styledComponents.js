import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const MainLayoutWrapper = styled.div`
  width: 100%;
  background-color: #edf0f2;
  flex-direction: column;
  justify-content: center;
`;

export const MainLayoutHeaderPanel = styled.div`
  display: flex;
  position: relative;
  z-index: 100;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  padding: 15px 35px;
  background-color: #cecece;
  justify-content: space-between;
  min-height: 60px;
  box-sizing: border-box;
`;
export const RolesSwitcher = styled.div`
  display: flex;
  padding: 0 10px 0 2px;
  border-right: 1px dashed #c1c1c1;
  & .MuiSwitch-switchBase {
    color: #9d9d9d;
  }
`;
export const RolesSwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  & button {
    margin-left: 135px;
  }
`;
export const SwitcherWrapper = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
`;
export const RoleSwitcherText = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  color: ${props => (props.isChoosed ? '#919191' : '#425a70')};
`;
export const ChangeModeButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  & a {
  &:first-child {
    margin-left: 0px;
  }
    margin-left: 10px;
  }
`;

export const MainLayoutContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => (props.isOperator ? '0' : '0 35px 20px 35px')};
`;

export const MonitorDialog = styled(Dialog)`
  width: 500px;
  margin: auto;
  & .MuiDialogContent-root {
    text-align: center;
  }
  & button {
    width: 80px;
    margin: 20px auto;
  }
`;

export const Placeholder = styled(Typography)`
  font-size: 24px !important;
  font-weight: 500 !important;
  color: #425a70;
  text-transform: uppercase;
  @media all and (max-width: 1024px) {
    font-size: 18px !important;
  }
`;
