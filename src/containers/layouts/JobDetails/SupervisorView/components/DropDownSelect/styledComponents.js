import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import { GLOBAL_COLORS } from '../../../../../../constants';

export const DropDownWrapper = styled.div`
  display: flex;
  position: relative;
  margin-right: 30px;
  width: 190px;
  &:after {
    content: '*';
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    top: -4px;
    right: -15px;
    color: red;
  }
`;

export const TemplatesSelectDropDownWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
    &:after {
    content: '';
  }
`;

export const StyledSelect = styled.div`
  width: 187px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding-left: 7px;
  padding-right: 5px;
  background-color: ${props => (props.disabled ? '#edf0f2' : 'white')};
  visibility: ${props => (props.ishidden ? 'hidden' : 'visible')};
  border: 1px solid ${GLOBAL_COLORS.mainCardTitleColor};
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;
  & svg {
    width: 24px;
    height: 24px;
  }
`;

export const StyledTemplatesSelect = styled(StyledSelect)`
  width: 100%;
  height: 52px;
  border-radius: 2px;
  border: solid 1px #707070;
  background-color: #ffffff;
  padding: 10px 10px 10px 25px;
  & .MuiTypography-root.MuiTypography-body1 {
    color: #707070;
  }
`;

export const StyledMenuListWrapper = styled.div`
  width: ${props => props.isTemplate ? '516px' : '187px' };
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  border: 1px solid #425a70;
  border-radius: 0;
  background-color: white;
  padding: 0;
  &.MuiList-root {
    padding: 0px 0 25px 0;
  }
`;
export const StyledMenuList = styled(MenuList)`
  width: 187px;
  border-radius: 0;
  background-color: white;
  padding: 10px 0;
  &.MuiList-root {
    padding: 0px 0 25px 0;
  }
`;
export const StyledTemplatesMenuList = styled(StyledMenuList)`
  width: 100%;
`;

export const NoStationsPlaceholder = styled(Typography)`
  color: #707070 !important;
  font-size: 16px !important;
  font-weight: 400;
  &.MuiTypography-body1 {
  margin-top: 40px;
  }
`;

export const SyledPopper = styled(Popper)`
  margin-top: -52px;
  z-index: 10;
`;

export const StyledPlaceholderTypography = styled(Typography)`
  &.MuiTypography-root{
    font-size: 16px;
    font-weight: bold;
    opacity: ${props => (props.disabled ? 0.6 : 1)};
    text-transform: uppercase;
    color: #425a70;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 140px;
  }
`;
export const StyledTemplatesSelectPlaceholderTypography = styled(StyledPlaceholderTypography)`
  &.MuiTypography-root{
    width: 300px;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root{
    font-size: 16px;
    font-weight: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
    margin: 0 15px 12px 35px;
    padding: 0;
    & svg {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }
  
  &.MuiMenuItem-root:hover {
    background-color: transparent;
    font-weight: bold;
  }
  
  &.MuiListItem-root.Mui-selected, &.MuiListItem-root.Mui-selected:hover {
    background-color: transparent;
    font-weight: bold;
  }
  
  &.MuiMenu-list {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
    border: solid 1px #425a70;
  }
   
`;
export const StyledTemplateListMenuItem = styled(StyledMenuItem)`
  &.MuiMenuItem-root{
    margin: 12px 15px 12px 35px;
  }
   
`;
export const StyledTitleItem = styled(MenuItem)`
  &.MuiMenuItem-root{
    font-size: 16px;
    font-weight: bold;
    line-height: 1.19;
    color: #425a70;
    text-transform: uppercase;
    opacity: 1;
    padding: 4px 5px 6px 9px;
    margin: 0 0 5px 0;
    border-bottom: none;
    justify-content: space-between;
    & svg {
      width: 22px;
      height: 22px;
      margin-right: 5px;
      cursor: pointer;
    }
    &.Mui-disabled {
      opacity: 1;
    }
  }
   
`;
export const StyledTemplateListTitleItem = styled(StyledTitleItem)`
  &.MuiMenuItem-root{
    padding: 12px 10px 8px 25px;
    color: #707070;
    margin: 0;
  }
   
`;

export const StationsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 235px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const TemplatesListWrapper = styled(StationsListWrapper)`
  height: 250px;
`;
