import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import styled from 'styled-components';

import { FileListItem } from '../styledComponents';

export const AddBOM = styled(AddIcon)`
  &.MuiSvgIcon-root {
    color: #425a70;
    width: 20px;
    height: 20px;
    margin: 0px;
    cursor: pointer;
  }
`;

export const BOMsWidgetContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BOMList = styled(List)`
  &.MuiList-padding {
    margin-left: 5px;
    height: 230px;
    overflow-y: auto;
    margin-top: 10px;
  }
`;

export const MainCollapseListItem = styled(ListItem)`
  &.MuiListItem-gutters {
    padding-left: 0;
    height: 25px;
    &:hover {
      background-color: #ffffff;
    }
    &:active {
      background-color: #ffffff;
    }
    & .MuiListItemText-root {
      padding-left: ${props => (props.withoutChildItem ? '13px' : 0)};
    }
  }
`;

export const SecondaryCollapseListItem = styled(ListItem)`
  &.MuiListItem-gutters {
    padding-left: ${props => (props.margin ? `${props.margin}px` : '15px')};
    height: 25px;
    &:hover {
      background-color: #ffffff;
    }
  }
`;

export const BOMNoteWrapper = styled.div`
  margin: 6px 0;
  width: 24px;
  height: 20px;
  display: flex;
  justify-content: center;
  border-radius: 2px;
  background-image: ${props => props.backgroundColor && 'linear-gradient(to bottom, #93c6f4, #064289)'};
  background-color: ${props => !props.backgroundColor && '#979797'};
`;

export const AnnotatedBOMNoteWrapper = styled(BOMNoteWrapper)`
  background-image: linear-gradient(to bottom, #93f493, #068933);
`;

export const FileItemWrapperWithIcon = styled(FileListItem)`
  width: 230px;
`;
export const BOMItemWrapperWithIcon = styled(FileItemWrapperWithIcon)`
  width: 270px;
`;

export const CloseCollapseIcon = styled(RemoveIcon)`
  &.MuiSvgIcon-root{
    width: 11px;
    height: 11px;
    border-radius: 2px;
    border: solid 0.5px #707070;
    background-image: linear-gradient(to bottom, #ffffff, #d3d3d3); 
  }
`;

const initialWidth = 256;

export const ItemText = styled(ListItemText)`
  &.MuiListItemText-root {
    flex: 1 1 auto;
    min-width: 0;
    width: ${props => (props.widthDecrement
    ? `${initialWidth - props.widthDecrement}px`
    : `${initialWidth}px`)};
    margin: 4px 8px 4px;
    max-width: 170px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;
    color: ${props => props.fontColor};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const OpenCollapseIcon = styled(AddIcon)`
  &.MuiSvgIcon-root{
    width: 11px;
    height: 11px;
    border-radius: 2px;
    border: solid 0.5px #707070;
    background-image: linear-gradient(to bottom, #ffffff, #d3d3d3); 
  }
`;

export const CloseImg = styled(CloseIcon)`
&.MuiSvgIcon-root {
  color: #979797;
  margin: 5px;
  width: 10px;
  height: 10px;
  &:hover {
    cursor: pointer;
  }
}
`;

export const RemoveItem = styled(CloseImg)`
  &.MuiSvgIcon-root {
    color: #425a70;
    width: 20px;
    height: 20px;
    margin: 0px;
  }
`;

export const BaseListItem = styled(ListItem)`
  &.MuiListItem-gutters {
    padding-left: ${props => (props.margin ? `${props.margin}px` : '35px')};
    height: 25px;
    justify-content: space-between;
    &:hover {
      background-color: #ffffff;
    }
  }
`;
