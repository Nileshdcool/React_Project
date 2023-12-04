import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

export const SideBarWrapper = styled.div`
  border: 1px  solid #707070;
  flex: 1 1 22.5%;
  display: flex;
  flex-direction: column;
  width: 516px;
  background-color: white;
  padding: 10px 20px 20px 20px;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  overflow: hidden;
  background-color: #ffffff;
`;

export const ListBody = styled(ListWrapper)`
  padding: 4px 20px;
  overflow-y: auto;
  background-color: #ffffff;
  box-sizing: border-box;
  width: 100%;
`;

export const ListItem = styled.div`
  line-height: 1.5;
  padding: 3px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  word-wrap: break-word;
`;

export const ListItemCell = styled.div`
  font-family: Roboto;
  font-style: normal;
  text-align: left;
  color: #425a70;
  font-size: 14px;
  font-weight: normal;
  line-height: 2.29;
  width: calc(100% - 47px);
  padding-left: 23px;
`;

export const AddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #93c6f4, #064289);
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

export const StyledAddIcon = styled(AddIcon)`
  &.MuiSvgIcon-root {
    fill: #ffffff;
  }
`;

export const RecentFilesFolderPathBlock = styled.div`
  display: flex;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 19px;
  letter-spacing: normal;
  text-align: left;
  color: #425a70;
  min-height: 47px;
`;
