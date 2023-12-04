import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import styled from 'styled-components';

export const AddBOM = styled(AddIcon)`
  &.MuiSvgIcon-root {
    color: #425a70;
    width: 20px;
    height: 20px;
    margin: 0px;
    cursor: pointer;
  }
`;

export const BOMList = styled(List)`

`;

export const MainCollapseListItem = styled(ListItem)`
  &.MuiListItem-gutters {
    padding-left: 0;
    height: 30px;
    &:hover {
      background-color: #daf1fd;
    }
    &:active {
      background-color: #ffffff;
    }
    & .MuiListItemText-root {
      padding-left: ${props => (props.withoutChildItem ? '18px' : 0)};
    }
    & svg {
      margin-right: 5px;
    }
  }
`;

export const SecondaryCollapseListItem = styled(ListItem)`
  &.MuiListItem-gutters {
    padding-left: ${props => (props.margin ? `${props.margin}px` : '15px')};
    height: 25px;
    &:hover {
      background-color: #daf1fd;
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

export const FileListItem = styled.div`
  width: 331.8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const initialWidth = 340;

export const ItemText = styled(ListItemText)`
  &.MuiListItemText-root {
    flex: 1 1 auto;
    min-width: 0;
        width: ${props => (props.widthDecrement
    ? `${initialWidth - props.widthDecrement}px`
    : `${initialWidth}px`)};
    margin: 4px 4px 4px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: ${props => (props.isChecked ? '#707070' : '#0969a6')};
    cursor: pointer;
    &:hover{
      color: #0969a6;
    }
  }
  & .MuiTypography-body1 {
    font-size: 14px;
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
      background-color: #daf1fd;
    }
  }
`;
