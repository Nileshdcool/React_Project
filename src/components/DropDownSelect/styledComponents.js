import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import { GLOBAL_COLORS } from '../../constants';

export const StyledSelect = styled.div`
  width: ${props => (props.width ? `${props.width}px` : '300px')};
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding-left: 25px;
  padding-right: 5px;
  background-color: ${props => (props.disabled ? '#edf0f2' : 'white')};
  visibility: ${props => (props.ishidden ? 'hidden' : 'visible')};
  border: 1px solid ${GLOBAL_COLORS.mainCardTitleColor};
  border-radius: 2px;
  margin-right: 35px;
  box-sizing: border-box;
  cursor: pointer;
`;
export const StyledJobStatusSelect = styled(StyledSelect)`
  margin-right: 0
`;

export const StyledMenuList = styled(MenuList)`
  width: 250px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  border: 1px solid #425a70;
  border-radius: 0;
  background-color: white;
  padding: 10px 0;
  &.MuiList-root {
    padding: 10px 0 25px 0;
  }
`;
export const SyledPopper = styled(Popper)`
  margin-top: -50px;
  z-index: 10;
`;

export const StyledPlaceholderTypography = styled(Typography)`
  &.MuiTypography-root{
    font-size: 16px;
    font-weight: bold;
    opacity: ${props => props.disabled ? 0.6 : 1};
    text-transform: uppercase;
    color: #707070;
    line-height: 1.19;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root{
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #425a70;
    padding: 6px 45px 4px 25px;
  }
  
  &.MuiMenuItem-root:hover {
    background-color: transparent;
    font-weight: bold;
    background-color: #daf1fd;
  }
  
  &.MuiMenuItem-root:first-child{
    font-size: 16px;
    font-weight: bold;
    line-height: 1.19;
    color: #707070;
    text-transform: uppercase;
    opacity: 1;
    padding: 3px 5px 4px 25px;
    margin: 0 0 5px 0;
    border-bottom: none;
    justify-content: space-between;
  }
  
  &.MuiListItem-root.Mui-selected, &.MuiListItem-root.Mui-selected:hover {
    font-weight: bold;
    background-color: #ffffff;
    color: #006ba6;
  }
  
  &.MuiMenu-list {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
    border: solid 1px #425a70;
  }
   
`;

export const DropDownIconWrapper = styled.div`
  visibility: ${props => (props.selected ? 'visible' : 'hidden')};
  display: flex;
  & svg {
    fill: #0969a6;
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;
