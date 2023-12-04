import DragIndicator from '@material-ui/icons/DragIndicator';
import ErrorIcon from '@material-ui/icons/Error';
import { GLOBAL_COLORS as ICONS_COLORS } from '../../../../../constants';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragActive) {
    return '#525252';
  }
  return '#707070';
};
const getBGColor = (props) => {
  if (props.isDragAccept) {
    return '#ffffff';
  }
  if (props.isDragActive) {
    return '#edf0f2';
  }
  return '#ffffff';
};

export const WidgetsWrapper = styled.div`
  display: flex;
  width: 400px;
  min-width: 250px;
  height: 347px;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 2px;
  border: solid 1px #707070;
  background-color: #ffffff;
  padding: 10px 20px 20px 20px;
  margin-right: 17px;
  &:last-child {
    margin-right: 0;
  }
  &:nth-child(n) {
    margin-bottom: 20px;
  }
`;

export const StyledTypography = styled(Typography)`
 &.MuiTypography-subtitle1 {
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
 }
`;

export const StyledTypographySubtitle = styled(Typography)`
 &.MuiTypography-root {
  font-size: 10px;
  line-height: 1.1;
  text-align: left;
  color: #425a70;
 }
`;

export const StyledPaper = styled(Paper)`
   width: 100%;
   padding: 0;
   top: 15px;
`;


export const StyledDropZone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 50px;
  border-width: 1px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  background-color: ${props => getBGColor(props)};;
  border-style: dashed;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  min-height: 60px;
  margin-top: 30px;
  &.active {
    border-color: lime;
  }
  p {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    text-align: left;
    color: #425a70;
    padding-left: 30px;
    margin: auto 0;
    span {
      font-weight: bold;
    }
  }
`;

export const NoteWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  cursor: pointer;
  background-image: ${props => props.isAnnotated
    ? 'linear-gradient(to bottom, #93f493, #068933)'
    : 'linear-gradient(to bottom, #93c6f4, #064289)'};
`;


export const LeftBlock = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  height: 22px;
  & .MuiTypography-body2 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 200px;
    text-align: left;
  }
  h6 {
    margin-top: 4px;
  }
`;

export const DragIndicatorIcon = styled(DragIndicator)`
  &.MuiSvgIcon-root {
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
  padding-top: 15px;
  max-height: 360px;
  overflow-y: auto;
  & .MuiButton-root {
    text-transform: none;

  & .MuiIcon-root{
    transform: rotate(-90deg);
    margin-right: 20px;
  }
  }
`;

export const AttachedFilesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 200px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 30px;
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
    margin-bottom: 10px;
  }
  a {
    text-decoration: none;
  }
`;

export const AttachedITPsVDRsWrapper = styled(AttachedFilesWrapper)`
  margin-top: 0px;
  margin-bottom: 10px;
  flex-grow: 1;
    a {
      text-decoration: none;    
      text-overflow: ellipsis;
      white-space: nowrap;
      & .MuiTypography-body2 {
        width: 300px;
      }
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
