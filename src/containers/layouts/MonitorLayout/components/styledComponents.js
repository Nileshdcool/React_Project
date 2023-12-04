import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const ActiveJobTileTitle = styled.div`
  display: flex;
  background-color: ${props => props.bgcolor};
  justify-content: center;
  padding: 19px 0 16px 0;
  width: 100%;
  & .MuiTypography-subtitle2 {
    margin-right: 0;
    color: white;
  }
`;
export const KPIsAndGoalsTitle = styled.div`
  display: flex;
  background-color: white;
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: solid 1px #707070;
  & .MuiTypography-subtitle1 {
    margin-right: 0;
    font-weight: bold;
  }
`;

export const ActiveJobTileContent = styled.div`
  text-align: left;
  padding: 10px 10px 20px 10px;
`;

export const KPIsAndGoalsContent = styled.div`
  text-align: left;
  padding: 3px 10px;
`;

export const ActiveJobTileContentRow = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: baseline;
  & .MuiTypography-subtitle1 {
    width: 90px;
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
  }
`;
export const KPIsAndGoalsContentRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3px;
  & .MuiTypography-h5{
    & span{
      font-weight: bold;
    }
  }
`;

export const StationTileContentRowWrapper = styled.div`
  display: flex;
  margin-bottom: 3px;
  flex-direction: column;
  & .MuiTypography-subtitle1{
  margin-top: 10px;
  font-weight: normal;
  display: flex;
    & span{
      font-weight: bold;
      width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 10px;
      justify-content: start;
      white-space: nowrap;
    }
  }
`;

export const TimeBoxesWrapper = styled.div`
  display: flex;
  width: 100%;
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

export const TimeBoxTitle = styled.div`
  display: flex;
  background-color: ${props => props.bgcolor};
  justify-content: center;
  padding: 2px 0;
  & .MuiTypography-h5 {
    color: white;
  }
`;
export const StationTimeBoxTitle = styled(TimeBoxTitle)`
  & .MuiTypography-h5 {
    color: ${props => (props.isWhiteHeader ? '#425a70' : '#ffffff')};
  }
  padding: 10px 0;
  ${props => (props.isWhiteHeader && 'border-bottom: 1px solid #707070')};
`;
export const TimeBoxValue = styled.div`
  display: flex;
  justify-content: center;
  padding: 3px 0;
  position: ${props => props.position};
`;
export const StationTimeBoxValue = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0;
  height: 35px;
  & .MuiTypography-h2{
    color: #425a70;
    overflow: hidden;
  }
`;
export const LineAveragesTimeBoxTitle = styled(TimeBoxTitle)`
  padding: 8px 0;
    & .MuiTypography-h5 {
    color: ${props => (props.isWhiteHeader ? '#425a70' : '#ffffff')};
  }
  ${props => (props.isWhiteHeader && 'border-bottom: 1px solid #707070')};
`;
export const LineAveragesTimeBoxValue = styled(TimeBoxValue)`
  padding: 5px 0;
  height: 40px;
`;

export const StyledValue = styled(Typography)`
  font-family: Roboto;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.19;
  text-align: left;
  color: #425a70;
  &.MuiTypography-body1 {
    margin-left: 7px;
    max-height: 48px;
    overflow: hidden;
  }
`;

export const StationTileTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0 10px 0;
  margin: 0 10px;
  height: 50px;
  border-bottom: solid 1px #707070;
  align-items: flex-end;
  box-sizing: border-box;
  & .MuiTypography-subtitle1 {
    margin-right: 0;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const StationTileTitleLeftBlock = styled.div`
  display: flex;
  & .MuiTypography-subtitle1 {
    margin-right: 5px;
  }
  & > svg {
    margin: 0 5px;
  }
`

export const TitleUnitBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  & .MuiTypography-body1{
    font-size: 8px;
    line-height: 1.13;
    margin-bottom: 2px;
    color: #425a70;
    text-transform: uppercase;
  }
`;

export const StationTileContent = styled.div`
  text-align: left;
  padding: 15px 10px 0 10px;
`;

export const StationTimeBox = styled(TimeBox)`
  width: 70px;
`;

export const ActionsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  & .MuiTypography-subtitle1 {
    margin-right: 0;
    font-weight: bold;
    color: #006ba6;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const DetailsViewTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DetailsViewTitleIconWrapper = styled.div`
  margin-top: 20px;
  margin-left: 10px;
`;
