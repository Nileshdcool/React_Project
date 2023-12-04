import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const TabsWrapper = styled(AppBar)`
  &.MuiAppBar-root {
    z-index: 0;
  }
`;


export const NotesArea = styled.div`
  margin-top: 10px;
  width: 462px;
  height: 701px;
`;

export const StyledTypography = styled(Typography)`
 &.MuiTypography-h2 {
  text-align: left;
  text-transform: uppercase;
  font-weight: bold;
  color: #425a70;
 }
`;

export const SideBarWidgets = styled.div`
  display: flex;
  width: 516px;
  height: 878px;
  box-sizing: border-box;
  border: solid 1px #979797;
  background-color: #ffffff;
  padding: 22px 27px 0 22px;
`;

export const TabButton = styled(Tab)`
  &.MuiTab-textColorInherit.Mui-selected {
    opacity: 1;
    background-image: linear-gradient(to bottom, #12478f, #93c6f4);
  }
  &.MuiTab-textColorInherit {
    color: inherit;
    opacity: 0.7;
    background-image: linear-gradient(to bottom, #93c6f4, #064289);
  }
  &.MuiTab-labelIcon {
    min-height: 60px;
    padding-top: 9px;
  }
  &.MuiTab-root {
    min-width: 258px;
    height: 60px;
    .MuiTab-wrapper {
      width: 40%;
      flex-direction: row;
      justify-content: space-between;
    }
    .MuiTab-wrapper > *:first-child {
      margin-bottom: 0;
    }
  }
`;

export const TabsGroup = styled(Tabs)`
  &.MuiTabs-root {
    max-height: 60px;
  }
`;

export const Panel = styled.div`
  height: 800px;
  width: 500px;
`;

export const NotesContentWrapper = styled.p`
  display: flex;
  width: 400px;
  height: 650px;
  font-size: 20px;
  line-height: 1.2;
  text-align: left;
  color: #425a70;
  margin: 25px;
  white-space: pre-wrap;
  overflow-y: auto;
`;

export const NotesFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

export const AddNotesPopUpWrapper = styled.div`
  z-index: 1;
  width: 488px;
  height: 425px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  outline: 1px solid #707070;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AddNotesPopUpWrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 13px 12px 15px;
  background-color: #9d9d9d;
  cursor: grab;
`;
export const AddNotesPopUpFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 15px 30px 15px;
  margin-top: 5px;
  & .MuiButton-containedSecondary {
    border: solid 1px #707070;
    color: #707070;
  }
`;

export const StyledNotesTitle = styled(Typography)`
  &.MuiTypography-root{
  vertical-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.19;
    text-align: left;
    color: #ffffff;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }
  
`;

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  &.MuiSvgIcon-root{
    fill: #ffffff;
  }
  
`;

export const StyledTextArea = styled(TextField)`
   & .MuiOutlinedInput-notchedOutline {
    border-color: #707070;
    border-radius: 8px;
    border-width: 1px;
   }
   & .MuiOutlinedInput-root.Mui-focused {
    & .MuiOutlinedInput-notchedOutline {
    border-color: #707070;
    border-radius: 8px;
    border-width: 1px;
   }
  }
   &.MuiFormControl-root {
    display: flex;
    margin: 15px;
    height: 100%;
   }
   & .MuiOutlinedInput-multiline {
    height: 100%;
    display: flex;
   }
   textarea {
    height: 100%!important;
    color: #707070;
    font-size: 20px;
    overflow: auto!important;
    line-height: 1.2;
    text-align: left;
   }
`;

export const IconsWrapper = styled.div`
   display: flex;
`;

