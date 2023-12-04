import Collapse from '@material-ui/core/Collapse/Collapse';
import DragIndicator from '@material-ui/icons/DragIndicator';
import ErrorIcon from '@material-ui/icons/Error';
import { GLOBAL_COLORS as ICONS_COLORS } from '../../../../../constants';
import Input from '@material-ui/core/Input/Input';
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {StyledTextArea} from "./TasksWidget/styledComponents";

export const SupervisorWidgetsWrapper = styled.div`
  display: flex;
  width: 235px;
  min-height: 155px;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 2px;
  border: solid 1px #707070;
  background-color: #ffffff;
  padding: 10px 10px 10px 20px;
  margin-right: 17px;
  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 1600px) {
    min-height: 89px;
  }
`;

export const SupervisorBOMWidgetWrapper = styled(SupervisorWidgetsWrapper)`
  display: flex;
  width: 485px;
  height: 100%;
`;
export const SupervisorBOMWidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const HeaderButtonsWrapper = styled.div`
  display: flex;
  width: 190px;
  justify-content: space-between;
`;

export const SupervisorFullHeightWidgetsWrapper = styled.div`
  display: flex;
  width: 235px;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 2px;
  border: solid 1px #707070;
  background-color: #ffffff;
  padding: 10px 20px 20px 20px;
  margin-left: 17px;
`;

export const StyledTypography = styled(Typography)`
 &.MuiTypography-subtitle1 {
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 10px;
 }
`;

export const NoteWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  cursor: pointer;
  background-image: ${props => props.isAnnotated
    ? 'linear-gradient(to bottom, #93f493, #068933)'
    : 'linear-gradient(to bottom, #93c6f4, #064289)'};
`;

export const LeftBlock = styled.div`
  display: flex;
  max-width: 160px;
  align-items: center;
  height: 22px;
  & .MuiTypography-body2 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 140px;
    text-align: left;
    color: ${props => (props.isChecked ? '#707070' : ' #0969a6')};

  }
  h6 {
    margin-top: 4px;
  }
`;

export const HandDragWrapper = styled.div`
  display: flex;
  cursor: grab;
`;

export const DragIndicatorIcon = styled(DragIndicator)`
  &.MuiSvgIcon-root {
    display: flex;
    justify-content: flex-start ;
    transform: scale(0.8);
    fill: #cccccc;
  }
  
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #ffffff;
  align-items: center;
  overflow-y: auto;
`;

export const AttachedFilesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 110px;
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
  }
  a {
    text-decoration: none;
  }
`;

export const ErrorBlock = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`;
export const StyledErrorIcon = styled(ErrorIcon)`
  &.MuiSvgIcon-root {
    fill: ${ICONS_COLORS.errorColor};
    transform: scale(0.74);
  }
`;
export const LeftBorder = styled.div`
  width: 3px;
  margin-right: 15px;
  background-color: #ec4c47;
`;
export const Description = styled(Typography)`
  &.MuiTypography-root{
    display: flex;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.05px;
    text-align: left;
    color: #66788a;
    margin-left: 30px;
  }
`;
export const CustomErrorText = styled(Typography)`
  &.MuiTypography-root {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.43;
    letter-spacing: -0.05px;
    color: #234361;
    margin-left: 5px;
  }
`;

export const ContentBlock = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
`;
export const CloseBlock = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const AlertWrapper = styled.div`
  display: flex;
  position: relative;
  width: 357px;
  z-index: 10;
  box-shadow: 0 0 1px 0 rgba(67, 90, 111, 0.47);
  background-color: #ffffff;
  box-sizing: border-box;
`;

export const TextCutter = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 140px;
`;

export const StyledSearchInput = styled(Input)`
  display: flex;
 &.MuiInputBase-root {
  display: flex;
  padding: 0 10px;
  background-color: #f4f4f4;
  margin: 5px 0 10px 0;
  height: 36px;
 }
 &.MuiInput-underline.Mui-disabled:before {
    border-bottom-style: none;
}
 & .MuiInputAdornment-positionStart {
  & svg {
    fill: #707070;
  }
 }
  &.MuiInput-underline:after, 
  &.MuiInput-underline:before,
  &.MuiInput-underline.Mui-focused:after,
  &.MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }
`;

export const StyledTemplateSearchInput = styled(StyledSearchInput)`
 &.MuiInputBase-root {
  margin: 0;
`;


export const WidgetTypeSunbtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 15px;
  flex: 1;
  & .MuiTypography-body2{
  padding-bottom: 5px;
  border-bottom: 1px solid #707070;
  margin-bottom: 10px;
  text-align: left;
  }
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
    & .MuiTypography-body2{
      padding-bottom: 0;
      border-bottom: none;
      margin-bottom: 0;
      text-align: left;
    }
  }
`;

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
`;


export const ITPVDRWidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ITPVDRWidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  overflow-y: auto;
  margin-left: 0;
  & .MuiTooltip-tooltip {
    margin-bottom: -20px;
    font-size: 16px;
  }
  & .MuiTypography-body2{
  padding-bottom: 5px;
  border-bottom: 1px solid #707070;
  margin-bottom: 10px;
  text-align: left;
  }
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
    margin-left: ${props => props.withoutDragIcon ? '0' : '-7px'};
    & .MuiTypography-body2{
      padding-bottom: 0;
      border-bottom: none;
      margin-bottom: 0;
      text-align: left;
    }
    & a {
      text-decoration: none;
    }
  }
`;

export const VDRsITPsBlockWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
  margin-bottom: 15px;
  & .MuiMenuItem-root {
    display: flex;
    min-height: 40px;
    height: 40px;
  }
`;

export const StyledListItem = styled(ListItem)`
  &.MuiListItem-button {
    width: 462px;
    height: 52px;
    border-radius: ${props => (props.isOpen ? '2px 2px 0 0' : '2px')};
    border: solid 1px #707070;
    background-color: #ffffff;
    ${props => props.isOpen && 'border-bottom: none'};
    ${props => props.isDataLoading && 'opacity: 0.6'};
    ${props => props.isDataLoading && 'cursor: default'};
    padding: 10px 10px 10px 25px;
  & svg {
    width: 24px;
    height: 24px;
    fill: #707070;
  }
  & button {
    margin-right: 10px;
  }
  & .MuiTypography-body1 {
    font-weight: 600;
    color: #707070;
  }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root{
    display: flex;
    flex-direction: row;
    left: 0;
    font-family: Roboto;
    font-size: 14px;
    line-height: 1.14;
    text-align: left;
    color: ${props => (props.isChecked ? '#c4c4c4' : '#425a70')};
    cursor: ${props => (props.isChecked ? 'default' : 'pointer')};
    margin: 0 16px 0px 25px;
    padding: 0;
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
  &.MuiListItem-button:hover {
    background-color: #daf1fd;
  }
`;

export const VDRsITPsStyledMenuItem = styled(StyledMenuItem)`
  &.MuiMenuItem-root{
    color: ${props => (props.isChecked ? '#0969A6' : '#707070')};
    cursor: ${props => (props.isChecked ? 'default' : 'pointer')};
    padding: 0;
    &.MuiListItem-gutters{
      padding-left: 0;
    }
  }
`;

export const DropDownItemText = styled.div`
  margin: 0 0 0 15px;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  width: 340px;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const TemplateNameStyledTextArea = styled(StyledTextArea)`
   &.MuiFormControl-root {
    display: flex;
    width: 100%;
    height: 50px;
   }
   & .MuiOutlinedInput-multiline {
    height: auto;
   }
`;

export const JobDetailsActionsBlockWrapper = styled.div`
  display: flex;
  width: 100%;
`;
