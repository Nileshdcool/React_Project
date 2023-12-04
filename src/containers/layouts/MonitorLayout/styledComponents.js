import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

export const MonitorViewWrapper = styled(Paper)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  &.MuiPaper-root {
    box-shadow: none;
    background-color: transparent;
  }
  &.MuiPaper-rounded {
    border-radius: 0;
  }
`;

const MonitorDataRows = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const LineJobsDataWrapper = styled(MonitorDataRows)`
  padding-bottom: 60px;
`;

export const LineJobsStationsDataWrapper = styled(MonitorDataRows)`
  flex-wrap: wrap;
  width:calc(100% + 20px);
`;

export const ActiveLineJobsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1050px;
  margin-right: 16px;
`;

export const KPIsAndGoalsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 16px;
  width: 516px;
`;

export const MonitorTileWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 250px;
  height: ${props => props.contentHeightBlock ? 'min-content' : '226px'};
  margin-right:16px;
  &:last-child {
    margin-right: 0;
  }
  border: 1px solid #425a70;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0;

`;
export const StationMonitorTileWrapper = styled(MonitorTileWrapper)`
  height: 230px;
  margin-bottom: 60px;
  border-top: ${props => `6px solid ${props.borderColor}`};
`;
