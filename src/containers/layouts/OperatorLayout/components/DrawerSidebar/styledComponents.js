import styled, { css } from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  StationTimeBoxTitle,
  StationTimeBoxValue,
} from '../../../MonitorLayout/components/styledComponents';
import { PanelItem } from '../MaterialsPanelItem';
import { DRAWER_WIDTH_VALUE } from '../../../../../constants';

const drawerOpenStyles = css`
  width: ${DRAWER_WIDTH_VALUE.expandedDrawer};
  overflow-x: hidden;
  transition: ${props =>
    props.theme.transitions.create('width', {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.enteringScreen,
    })};
`;

const drawerCloseStyles = css`
  width: ${DRAWER_WIDTH_VALUE.minimizedDrawer};
  transition: ${props =>
    props.theme.transitions.create('width', {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.leavingScreen,
    })};
  overflow-x: hidden;
`;

const svgOpenStyles = css`
  transform: rotate(0deg);
  padding-left: 0px;
  transition: ${props =>
    props.theme.transitions.create('transform', {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.leavingScreen,
    })};
`;
const svgCloseStyles = css`
  transform: rotate(180deg);
  transition: ${props =>
    props.theme.transitions.create('transform', {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.leavingScreen,
    })};
`;

export const StyledDrawer = withTheme(styled(Drawer)`
  flex-shrink: 0;
  white-space: nowrap;
  position: fixed;
  z-index: 20;
  & .MuiDrawer-paper {
    margin-top: 60px;
    height: calc(100% - 60px);
    box-shadow: -2px 3px 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #edf0f2;
    z-index: 20;
    overflow: hidden;
    ${props => (props.open ? drawerOpenStyles : drawerCloseStyles)}
    & .MuiIconButton-root {
      padding-right: 15px;
      ${props => (props.open ? svgOpenStyles : svgCloseStyles)}
    }
  }
`);

export const SideBarHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  & .MuiTypography-h4 {
    margin: 0 auto;
  }
`;

export const SideBarContent = styled.div`
  display: flex;
  margin-left: ${props => (props.open ? '0' : '90px')};
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  overflow-y: ${props => (props.open ? 'auto' : 'hidden')};
  width: 350px;
  margin-bottom: 60px;
  height: 100%;
`;

export const StationUnitsInformation = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 20px;
  flex-shrink: 0;
`


export const SummaryBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border: solid 1px #707070;
  background-color: #ffffff;
  padding: 15px 25px;
  height: 100%;
  box-sizing: border-box;
`;

export const SummaryContentRow = styled.div`
  display: flex;
  overflow: hidden;
  margin-bottom: 10px;
  &:last-child {
   margin-bottom: 0;
  }
`;

export const ContentBlock = styled.div`
  display: flex;
  margin-right: 40px;
`;

export const SummaryValue = styled(Typography)`
  &.MuiTypography-subtitle1 {
    font-weight: normal;
  }
  padding-left: 15px;
`;

export const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: content;
  width: 108px;
  border-radius: 2px;
  border: solid 1px #707070;
  background-color: #ffffff;
  & .MuiTypography-subtitle1 {
    font-weight: bold;
  }
`;
export const TimeBoxTitle = styled(StationTimeBoxTitle)`
  & .MuiTypography-body2 {
    color: ${props => (props.isWhiteHeader ? '#425a70' : '#ffffff')};
    font-weight: bold;
  }
`;

export const SidebarTabsPanel = styled.div`
  display: flex;
  flex-direction: ${props => (props.open ? 'row' : 'column')};
  width: 100%;
  & .MuiTypography-body2{
    display: ${props => (props.open ? 'flex' : 'none')};
  }
  position: absolute;
  bottom: 0;
`;

export const SideBarItem = styled(PanelItem)`
  flex: 1;
  justify-content: center;
`;

export const StationTitle = styled(Typography)`
  &.MuiTypography-h4 {
    display: ${props => (props.open ? 'flex' : 'none')};
    font-family: Roboto;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: center;
    color: #425a70;
  }
`;
