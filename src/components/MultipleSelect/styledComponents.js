import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

export const StyledCollapse = styled(Collapse)`
    width: 462px;
    background-color: #ffffff;
    box-sizing: border-box;
    border: solid 1px #707070;
    border-radius: 0 0 2px 2px;
    border-top: none;
    position: absolute;
    top: 50px;
    z-index: 100;
    padding-bottom: 10px;
`;

export const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
  & .MuiMenuItem-root {
    display: flex;
    min-height: 40px;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root{
    left: 25px;
    right: 16px;
    width: 410px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: left;
    color: ${props => props.isChecked ? '#0969a6' : '#707070'};
  }

  &.MuiListItem-button:hover {
    text-decoration: none;
    background-color: ${props => props.isEmpty ? 'transparent' : '#daf1fd'};
  }

  &.MuiListItem-root.Mui-selected, &.MuiListItem-root.Mui-selected:hover {
    background-color: transparent;
    font-weight: bold;
  }

  &.MuiMenu-list {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
    border: solid 1px #425a70;
  }
  &.MuiListItem-gutters {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const ItemText = styled.p`
  margin: 0 0 0 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 340px;
`;

export const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
`;
