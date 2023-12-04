import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const MonitorTileWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.contentHeightBlock ? 'min-content' : '226px'};
  &:last-child {
    margin-right: 0;
  }
  box-sizing: border-box;
  padding: 0;
`;

export const TimeBoxTitle = styled.div`
  display: flex;
  background-color: ${props => props.bgcolor};
  justify-content: center;
  padding: 2px 0;
  & .MuiTypography-h5 {
    color: white;
  }
`;

export const TimeBoxValue = styled.div`
  display: flex;
  justify-content: center;
  padding: 3px 0;
`;

export const TimeBoxesWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const KPIsAndGoalsContent = styled.div`
  text-align: left;
  padding: 10px 0px;
`;

export const LineAveragesTimeBoxTitle = styled(TimeBoxTitle)`
  padding: 4px 0;
  border-bottom: 1px #707070 solid;
`;

export const LineAveragesTimeBoxValue = styled(TimeBoxValue)`
  padding: 10px 0 3px 0;
  height: 72px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
`;

export const LineAveragesTimeBoxesWrapper = styled(TimeBoxesWrapper)`
  margin: 5px 0;
`;

export const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: content;
  width: 108px;
  border-radius: 2px;
  border: solid 1px #707070;
  background-color: #ffffff;
  & .MuiTypography-h5, .MuiTypography-subtitle1 {
    font-weight: bold;
  }
`;

export const TimeBlockTitle = styled(Typography)`
  &.MuiTypography-h5 {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.71;
    text-align: center;
    color: ${props => props.titleColor};
  }
`;

export const TimeBlockNumber = styled(TimeBlockTitle)`
  &.MuiTypography-h2 {
    font-size: 36px;
    line-height: 0.67;
    color: #425a70;
  }
`;

export const TimeBlockMinutes = styled(TimeBlockTitle)`
  &.MuiTypography-h5 {
    font-size: 12px;
    font-weight: normal;
    line-height: 2;
    color: #425a70;
  }
`;
