import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const TasksPanelWrapper = styled.div`
  width: 350px;
  background-color: #edf0f2;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TaskTitle = styled(Typography)`
  &.MuiTypography-h4 {
    width: 125px;
    height: 39px;
    font-family: Roboto;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #425a70;
  }
`;

export const LogsWrapper = styled.div`
  margin: 10px 0;
  & > div{
    @media all and (max-height: 800px) {
      max-height: 340px;
    }
    @media all and (min-height: 800px) and (max-height: 1000px) {
      max-height: 500px;
    }
    @media all and (min-height: 1000px) and (max-height: 1200px) {
      max-height: 600px;
    }
    @media all and (min-height: 1200px) {
      max-height: 800px;
    }
  }
`;

export const ListItem = styled.div`
  line-height: 1.5;
  padding: 3px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  word-wrap: break-word;
`;

export const ListHeaderCell = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  line-height: 1.19;
  text-align: left;
  color: #425a70;
  width: ${props => props.width}px;
`;

export const ListItemCell = styled(ListHeaderCell)`
  font-size: 14px;
  font-weight: normal;
  line-height: 2.29;
  width: ${props => props.width}px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
