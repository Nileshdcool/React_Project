import { DRAWER_WIDTH_VALUE } from '../../../constants';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {withTheme} from "@material-ui/core";

export const OperatorViewWrapper = styled(Paper)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: white;
  transform: translateX(-0.85%);
  &.MuiPaper-root {
    box-shadow: none;
    background-color: transparent;
  }
  &.MuiPaper-rounded {
    border-radius: 0;
  }
`;
export const OperatorContentWrapper = withTheme(styled.div`
  width: calc(100% - ${props => (props.isOpenDrawer
    ? DRAWER_WIDTH_VALUE.expandedDrawer
    : DRAWER_WIDTH_VALUE.minimizedDrawer)
});
  transition: ${props =>
    props.theme.transitions.create('width', {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.enteringScreen,
    })
};
`);

export const PanelItemWrapper = styled.div`
  display: flex;
  padding: 20px 24px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  align-items: center;
  border: solid 1px #979797;
  background-image: ${props => (props.isActive ? 'linear-gradient(to top, #93c6f4, #064289)'
    : 'linear-gradient(to bottom, #93c6f4, #064289)')};
  ${props => (props.disabled && 'background-image: linear-gradient(to top, #979797, #979797)')};
  &:hover {
    background-image: ${props => (props.disabled ? 'linear-gradient(to top, #9d9d9d, #9d9d9d)'
    : 'linear-gradient(to top, #93c6f4, #064289)')};
  }
  & .MuiTypography-body2 {
    color: #ffffff;
    max-width: 145px;
    margin-left: 15px;
  }
`;

export const SwitcherWrapper = styled.div`
  width: 200px;
  display: flex;
  margin: 10px 20px;
  background-color: #edf0f2;
`;

export const CustomSwitcher = styled(Switch)`
  &.MuiSwitch-root {
    width: 70px;
    padding: 20px 10px;
    background-color: ${props => ((props.checked && !props.disabled) ? '#006ba6' : '#979797')};
    border-radius: 17px;
    & > .MuiSwitch-switchBase {
      & > .MuiIconButton-label {
        & > .MuiSwitch-thumb {
          width: 25px;
          height: 25px;
        }
      }
    }
    & > .MuiSwitch-switchBase.Mui-checked {
      transform: translateX(30px);
      & + .MuiSwitch-track {
        opacity: 0;
      }
    }
  }
  & > .MuiSwitch-track {
    opacity: 0;
  }
`;

export const SwitcherLabel = styled.p`
  text-align: left;
  border-right: 1px solid black;
  margin: 0;
  width: 101px;
  height: 34px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  padding: 5px 10px;
  letter-spacing: normal;
  text-align: left;
  color: #425a70;
`;

export const SwitcherStatus = styled(SwitcherLabel)`
  width: 50px;
  height: 26px;
  font-size: 24px;
  border-right: none;
`;

export const MaterialsList = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 5px 20px 20px;
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    display: flex;
    padding: 0;
    height: 30px;
    margin-top: 20px;
    border-bottom: 1px solid #dbdbdb;
    .MuiTypography-body2 {
      line-height: 1.71;
      font-weight: ${props => props.choosedItem && 'bold'};
      color: ${props => (props.choosedItem ? '#0969A6' : '#425a70')};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &.MuiMenuItem-root:hover {
    background-color: transparent;
  }
`;

export const StyledPopper = styled(Popper)`
  width: ${props => props.width}px;
  max-height: 250px;
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #707070;
  background-color: #ffffff;
`;

export const NoJobsLabel = styled(Typography)`
  &.MuiTypography-h4 {
    line-height: 25;
  }
`;

export const WarningIconWrapper = styled.div`
  margin: 0 5px;
`;
