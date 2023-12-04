import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import DragIndicator from '@material-ui/icons/DragIndicator';
import ErrorIcon from '@material-ui/icons/Error';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveIcon from '@material-ui/icons/Remove';
import styled from 'styled-components';

export const DetailsCard = styled(Card)`
  width: 400px;
  height: 347px;
  margin: 0px 0px 40px 0px;
  border-radius: 2px;
  border: solid 1px #707070;
  background-color: #ffffff;
  &.MuiPaper-elevation1 {
    box-shadow: none;
  }
  &.MuiPaper-rounded {
    border-radius: 2px;
  }
`;

export const CustomCardContent = styled(CardContent)`
  &.MuiCardContent-root {
    top: 0;
    padding: 0 10px;
  }
`;

export const DrawingTitle = styled.p`
  margin: 5px 5px 0px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #425a70;
`;

export const FileFormatsTitle = styled(DrawingTitle)`
  margin: 0px 5px;
  font-size: 10px;
  font-weight: normal;
  line-height: 1.1;
  text-align: left;
  color: #425a70;
`;

export const FileZoneContainer = styled.div`
  height: 100%;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
`;

export const FileList = styled.div`
  height: 80px;
  overflow-y: auto;
  margin-bottom: 30px;
`;

export const FileListItem = styled.div`
  width: 331.8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FileZone = styled.div`
  width: 331.8px;
  height: 59px;
  border: dashed 1px #707070;
  background-color: #ffffff;
`;

export const FileZonePlaceholder = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: #425a70;
  justify-content: center;
  display: flex;
`;

export const UploadIcon = styled.img`
  margin-right: 15px;
`;

export const ErrorBlockArea = styled(Card)`
  width: 362px;
  height: 63px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin: 15px 0;
  border-left: 3px solid #ec4c47;
  background-color: #ffffff;
  box-shadow: 0 0 1px 0 rgba(67, 90, 111, 0.47);
  &.MuiPaper-rounded {
    border-radius: 0;
  }
`;

export const ErrorContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ErrorTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const ErrorImg = styled(ErrorIcon)`
  padding: 7px 0 0 10px;
  color: #ec4c47;
  width: 14px;
  height: 14px;
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

export const ErrorBlockTitle = styled(DrawingTitle)`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  letter-spacing: -0.05px;
  color: #234361;
  margin: 0;
`;

export const ErrorBlockText = styled(ErrorBlockTitle)`
  font-weight: normal;
  line-height: 1.5;
  color: #66788a;
  margin: 5px 0 0;
`;

export const FileItemWrapper = styled(FileListItem)`
  justify-content: left;
`;

export const FileItemWrapperWithIcon = styled(FileListItem)`
  width: 230px;
`;

export const FileItemText = styled.p`
  margin: 0;
  line-height: 1.75;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #425970;
`;

export const FileItemIcon = styled(DragIndicator)`
  opacity: 0.2;
`;

export const RemoveItem = styled(CloseImg)`
  &.MuiSvgIcon-root {
    color: #425a70;
    width: 20px;
    height: 20px;
    margin: 0px;
  }
`;

export const AddBOM = styled(AddIcon)`
  &.MuiSvgIcon-root {
    color: #425a70;
    width: 20px;
    height: 20px;
    margin: 0px;
    cursor: pointer;
  }
`;

export const NoteWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 35px;
  height: 20px;
  border-radius: 2px;
  background-image: linear-gradient(to bottom, #93c6f4, #064289);
`;

export const BOMList = styled(List)`
  &.MuiList-padding {
    margin-left: 5px;
    height: 290px;
    overflow-y: auto;
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

export const OpenCollapseIcon = styled(AddIcon)`
  &.MuiSvgIcon-root{
    width: 11px;
    height: 11px;
    border-radius: 2px;
    border: solid 0.5px #707070;
    background-image: linear-gradient(to bottom, #ffffff, #d3d3d3); 
  }
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

export const ItemText = styled(ListItemText)`
  &.MuiListItemText-root {
    flex: 1 1 auto;
    min-width: 0;
    margin: 4px 4px 4px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;
    color: ${props => props.fontColor};
  }
`;

export const BOMItemWrapperWithIcon = styled(FileItemWrapperWithIcon)`
  width: 270px;
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
