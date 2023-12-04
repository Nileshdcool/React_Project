import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const StationCollapseWrapper = styled(ExpansionPanel)`
  margin-bottom: 17px;
  &.MuiExpansionPanel-root {
      background-color: #edf0f2;
  }
  &.MuiExpansionPanel-root.Mui-expanded {
      box-shadow: none;
  }
  &.MuiExpansionPanelDetails-root {
  box-shadow: none;
  }
`;

export const StationExpansionPanelSummary = styled(ExpansionPanelSummary)`
  &.MuiExpansionPanelSummary-root {
    display: ${props => (props.hide ? 'flex' : 'none')};
    background: #ffffff;
    height: 90px;
    border: solid 1px #425a70};
    background-color: #ffffff;
  }
  &.MuiExpansionPanelSummary-root .MuiExpansionPanelSummary-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StationExpansionPanelDetails = styled(ExpansionPanelDetails)`
  &.MuiExpansionPanelDetails-root {
    padding: 8px 0px 0px;
  }
`;

export const StationText = styled(Typography)`
  min-width: 150px;
  max-width: 10%;
  height: 60px;
  border-right: 1px solid;
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #425a70;
  &.MuiTypography-body1 {
    line-height: 3.5;
    font-weight: bold;
  }
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 5px 0 15px;
  box-sizing: border-box;
`;

export const CheckBoxGroup = styled.div`
  width: 850px;
  height: 60px;
  display: flex;
  flex-direction: row;
`;

export const StationMinutes = styled.div`
  width: 150px;
  height: 60px;
  border-right: 1px solid;
  border-left: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StationButton = styled.div`
  width: 150px;
  height: 60px;
  line-height: 3.5;
`;

export const CheckBoxGroupItem = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 3.5;
  height: 60px;
  align-items: center;
  &:first-child p {
    margin: 0 10px 0 15px;
  }
`;

export const ItemText = styled.p`
  margin: 0 10px 0 30px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #425a70;
`;

export const IconWrapper = styled.div`
  line-height: 1;
  width: 25px;
  height: 25px;
  border: 1px solid;
  background-color: ${props => (props.transparent ? 'transparent' : '#006ba6')};
  color: #ffffff;
`;
