import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const MultiSelectListsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const TasksBlockWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
  margin-bottom: 15px;
  & .MuiMenuItem-root {
    display: flex;
    height: 30px;
    min-height: 30px;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    cursor: ${props => (props.isChecked ? 'default' : 'pointer')};
    margin: 0 16px 10px 25px;
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0px 10px 40px 0;
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

export const ItemText = styled.div`
  margin: 0 0 0 15px;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  width: 200px;
`;
export const TaskType = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  width: 50px;
`;
export const TaskDuration = styled.p`
  text-align: center;
  margin: 0;
  width: 50px;
`;

export const TaskNoteWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-image: linear-gradient(to bottom, #93c6f4, #064289);
`;
