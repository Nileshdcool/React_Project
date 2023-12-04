import SquareFootIcon from '@material-ui/icons/SquareFoot';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  overflow: hidden;
  border: solid 1px #425a70;
  background-color: #ffffff;
`;

export const ListHeaderTitle = styled(Typography)`
  &.MuiTypography-h5{
    font-family: Roboto;
    font-size: 16px;
    font-weight: bold;
    line-height: 2.5;
    text-align: left;
    color: #ffffff;
    padding-left: 20px;
  }
`;

export const ListBody = styled(ListWrapper)` 
  padding: 4px 20px;
  overflow-y: auto;
  background-color: #ffffff;
  box-sizing: border-box;
`;

export const ListItem = styled.div`
  line-height: 1.5;
  padding: 3px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  word-wrap: break-word;
`;

export const TaskNumber = styled(ListHeaderTitle)`
  display: flex;
  font-weight: normal;
  line-height: 1.5;
  color: #425a70;
  text-align: left;
  width: 20px;
  padding-right: 20px;
`;

export const TaskName = styled(TaskNumber)`
  min-width: 250px;
  white-space: pre-wrap;
`;

export const UnitCheckName = styled.div`
  width: 30%;
  max-width: 150px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  & .MuiTypography-body2{
    font-size: 14px;
    color: #707070;
  }
`;

export const UnitCheckListItem = styled(ListItem)`
  padding: 10px 0;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const UnitChecksListBody = styled(ListBody)`
  padding: 0 20px;
`;

export const UnitChecksActionsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${props => props.isFirstArticle ? 'row-reverse' : 'row' };
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 70px;
  justify-content: center;
`;

export const FirstActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
`;

export const UnitCheckIconWrapper = styled.div`
  width: 18px;
  height: 18px;
  background-color: #006ba6;
  transition: background-color 0.6s;
  & .MuiSvgIcon-root {
    width: 18px;
    height: 18px;
    fill: #ffffff;
  }
  &:hover {
    background-color: #0091DE;
  }
`;

export const FixtureIcon = styled(SquareFootIcon)`
  color: #064289;
  cursor: pointer;
`;

export const NoTasks = styled.p`
  margin: 0;
  line-height: 2;
`;
