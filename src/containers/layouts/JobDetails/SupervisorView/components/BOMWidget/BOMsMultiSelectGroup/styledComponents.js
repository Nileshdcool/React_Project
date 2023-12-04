import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { StyledCollapse } from '../../styledComponents';

export const MultiSelectListsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px 0;
`;

export const StyledBOMsCollapse = styled(StyledCollapse)`
    padding: 0 7px 0 25px;
    & .MuiInputBase-root{
        margin: 5px 16px 10px 0;
    }
`;

export const BOMsBlockWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: auto;
  height: 150px;
  & .MuiMenuItem-root {
    display: flex;
    height: 30px;
    min-height: 30px;
  }
  margin-bottom: 20px;
  padding-right: 10px;
  box-sizing: border-box;
  & .MuiList-padding {
    padding: 0;
  }
 
`;

export const FilteredBoms = styled.div`
    ul {
        margin: 0;
        padding: 5px 0;
    }
    li {
        display: flex;
        list-style-type: none;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        margin-bottom: 5px;
        margin-left: -7px;
        margin-right: 5px;
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
    & .MuiTypography-body2{
        color: #707070;
        &:hover {
          color: #0969a6;
        }
    }
`;

export const StyledPlaceholderTypography = styled(Typography)`
  &.MuiTypography-root{
    font-size: 16px;
    font-weight: bold;
    opacity: ${props => (props.disabled ? 0.6 : 1)};
    text-transform: uppercase;
    color: #707070;
    line-height: 1.19;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root{
    left: 0;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;
    color: ${props => (props.isChecked ? '#c4c4c4' : '#425a70')};
    margin-bottom: 10px;
    &.MuiListItem-gutters{
      padding-left: 25px;
    }
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 40px 10px 40px 0;
`;
export const TextWrapper = styled.p`
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.29;
  text-align: center;
  color: #707070;
  width: 300px;
  margin: 20px auto 40px auto;
`;

export const ItemText = styled.p`
  margin: 0 0 0 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 235px;
`;
